from .judge_api import get_language_id, create_submission, get_submission, get_statuses
import base64
from celery import shared_task
import time

import logging
from django.conf import settings
settings.CELERY_ALWAYS_EAGER = True


@shared_task
def test_code(code , language , tests):
    results = []
    for test in tests:
        test_input = test['test_input']
        test_output = test['test_output']
        test_input_base64 = encode_base64(test_input)
       
        code_base64, language_id , test_input_base64, test_output_base64 = encode_data_base64(code , language , test_input, test_output)
        
        token = run_code(code_base64 , language_id , test_input_base64, test_output_base64)
    

        result = get_result_by_token(token['token'])
        while result['status']['description'] not in ['Accepted', 'Compilation Error', 'Runtime Error', 'Wrong Answer']:
            time.sleep(5)
            result = get_result_by_token(token['token'])
        results.append(result)
    
    print(results)
    return results
  

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

