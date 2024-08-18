from .judge_api import get_language_id, create_submission, get_submission, get_statuses
import base64
from celery import shared_task
import time
import logging
from django.conf import settings
settings.CELERY_ALWAYS_EAGER = True


@shared_task
def test_code(code , language , tests, submission_id):
    from api.models import Submission, SubmissionTest, UserProblemScore
    from django.db import transaction
    print(language)
    results = []
    total_score = 0
    max_retries = 10 
    retry_delay = 5

    submission = Submission.objects.get(id=submission_id)
    user = submission.user
    problem = submission.problem
    try:
        with transaction.atomic():
            for test in tests:
                score = 0
                test_input = test['test_input']
                test_output = test['test_output']
                test_input_base64 = encode_base64(test_input)
            
                code_base64, language_id , test_input_base64, test_output_base64 = encode_data_base64(code , language , test_input, test_output)
                
                token = run_code(code_base64 , language_id , test_input_base64, test_output_base64)
            

                result = get_result_by_token(token['token'])
                retries = 0
                while result['status']['description'] not in ['Accepted', 'Compilation Error', 'Runtime Error', 'Wrong Answer', 'Time Limit Exceeded']:
                    if retries >= max_retries:
                        result['status']['description'] = 'Timeout'
                        break
                    time.sleep(retry_delay)
                    result = get_result_by_token(token['token'])
                    retries += 1

                if result['status']['description'] == 'Accepted':
                    score = 100 // len(tests)
                elif result['status']['description'] == 'Compilation Error':
                    submission.status = 'Compilation Error'
                    submission.save()
                    return [{'test_id': test['id'], 'status': 'Compilation Error', 'score': 0}]
                elif result['status']['description'] == 'Runtime Error':
                    submission.status = 'Runtime Error'
                    submission.save()
                    return [{'test_id': test['id'], 'status': 'Runtime Error', 'score': 0}]
                results.append({'test_id': test['id'], 'status': result['status']['description'], 'score': score})

                SubmissionTest.objects.create(submission_id=submission_id, problem_test_id=test['id'], status=result['status']['description'], score=score)

                total_score += score
            submission.total_score = total_score
            submission.status = 'Completed'
            submission.save()

            try:
                user_problem_score = UserProblemScore.objects.get(user=user, problem=problem)

                if user_problem_score.score < total_score:
                    user_problem_score.score = total_score
                    user_problem_score.save()
            except UserProblemScore.DoesNotExist:
                UserProblemScore.objects.create(user=user, problem=problem, score=total_score)


        print(results)
        return results
    except Exception as e:
        submission.status = 'Failed'
        submission.save()
        print(f"Error during submission processing: {e}")
        return [{'error': str(e)}]
  

def encode_base64(string):
    if isinstance(string, bytes):
        string_bytes = string
    else:
        string_bytes = string.encode('utf-8')
    base64_bytes = base64.b64encode(string_bytes)
    base64_string = base64_bytes.decode('utf-8')
    return base64_string

def decode_base64(base64_string):
    if isinstance(base64_string, bytes):
        base64_bytes = base64_string
    else:
        base64_bytes = base64_string.encode('utf-8')
    string_bytes = base64.b64decode(base64_bytes)
    string = string_bytes.decode('utf-8')
    return string

def run_code(code_base64 , language_id , test_input_base64, test_output_base64):
    token = create_submission(code_base64 , language_id , test_input_base64, test_output_base64)
    return token

def encode_data_base64(code , language , test_input, test_output):
    language_id = get_language_id(language)
    code_base64 = encode_base64(code)
    test_input_base64 = encode_base64(test_input)
    test_output_base64 = encode_base64(test_output)
    return code_base64 , language_id , test_input_base64, test_output_base64

def get_result_by_token(token):
    response = get_submission(token)
    return response

