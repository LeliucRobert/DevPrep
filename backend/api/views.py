from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, NoteSerializer, LessonSerializer, UserLessonScoreSerializer, TopicSerializer, QuizSerializer, QuestionSerializer, AnswerSerializer, UserTopicStatusSerializer, ProblemSerializer, ProblemTestSerializer, SubmissionSerializer, UserRatingProblemSerializer, UserProblemScoreSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Lesson, UserLessonScore, Topic, Quiz, Question, Answer, UserTopicStatus, Problem, ProblemTest, Submission, SubmissionTest, UserRatingProblem, UserProblemScore
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from django.contrib import admin
from .judge.judge_service import test_code
import time

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_lesson(request):
    serializer = LessonSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_lessons(request):
    lessons = Lesson.objects.all()
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lesson_details(request, pk):
    try:
        lesson = Lesson.objects.get(pk=pk)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_topic(request):
    serializer = TopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_topics(request, lesson_id):
    try:
        topics = Topic.objects.filter(lesson=lesson_id)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=404)

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_topics_status_for_lesson(request, lesson_id):
    user = request.user
    topics = Topic.objects.filter(lesson=lesson_id)
    user_topics_status = UserTopicStatus.objects.filter(user=user , topic__in=topics)
    serializer = UserTopicStatusSerializer(user_topics_status, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_quiz(request):
    serializer = QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_quiz(request, topic_id):
    try:
        quiz = Quiz.objects.filter(topic=topic_id)
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)
    except Topic.DoesNotExist:
        return Response({'error': 'Topic not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_question(request):
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_question(request, quiz_id):
    try:
        questions = Question.objects.filter(quiz=quiz_id)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=404)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_answer(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_answer(request, question_id):
    try:
        answers = Answer.objects.filter(question=question_id)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_scores(request):
    user = request.user  # Get the authenticated user
    scores = UserLessonScore.objects.filter(user=user)  # Filter scores for this user
    serializer = UserLessonScoreSerializer(scores, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        user_data = {
            'id': user.id,
            'username': user.username,
            'password': user.password,
        }
        return JsonResponse(user_data)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_topic_status(request, topic_id):
    try:
        user = request.user
        user_topic_status = UserTopicStatus.objects.filter(user=user, topic=topic_id)
        serializer = UserTopicStatusSerializer(user_topic_status, many=True)
        return Response(serializer.data)
    except Topic.DoesNotExist:
        return Response({'error': 'Topic not found'}, status=404)

        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_user_topic_status(request, topic_id):

    user = request.user
    if user.is_anonymous:
        return Response({"detail": "Authentication required."}, status=status.HTTP_401_UNAUTHORIZED)

    quiz_score = request.data['quiz_score'] * 100 
    if quiz_score is None:
        return Response({"detail": "Quiz score is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        topic = Topic.objects.get(id=topic_id)

        
        print(f"Attempting to save: user={user}, topic={topic}, quiz_score={quiz_score}")

        user_topic_status, created = UserTopicStatus.objects.update_or_create(
            user=user,
            topic=topic,
            defaults={'quizScore': quiz_score}
        )

        
        print(f"UserTopicStatus {'created' if created else 'updated'}: {user_topic_status}")

        serializer = UserTopicStatusSerializer(user_topic_status)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    except Topic.DoesNotExist:
        return Response({"detail": "Topic not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_topic_status(request, topic_id):
    user = request.user
    try:
        topic = Topic.objects.get(id=topic_id)
        user_topic_status = UserTopicStatus.objects.get(user=user, topic=topic)
        user_topic_status.delete()
        return Response({"detail": "User topic status deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    except Topic.DoesNotExist:
        return Response({"detail": "Topic not found."}, status=status.HTTP_404_NOT_FOUND)
    except UserTopicStatus.DoesNotExist:
        return Response({"detail": "User topic status not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_problems(request):
    problems = Problem.objects.all()
    serializer = ProblemSerializer(problems, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_submission(request, problem_id):
    
    user = request.user
    user_code = request.data['user_code']
    language = request.data['language']
    
    problem = Problem.objects.get(id=problem_id)

    submission = Submission.objects.create(
        user=user,
        problem=problem,
        user_code=user_code,
        language=language,
        status='Pending'
    )

    tests = ProblemTest.objects.filter(problem=problem_id)    
    testSerializer = ProblemTestSerializer(tests, many=True)


    task = test_code.delay(user_code , language,  testSerializer.data, submission.id)

    return Response ({'task_id': task.id , 'submission_id': submission.id}, status=202)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_submission_results(request, submission_id):
    try:
        submission = Submission.objects.get(id=submission_id, user=request.user)

        if submission.status == 'Completed':
            submission_tests = SubmissionTest.objects.filter(submission=submission)

            results = [
                {
                    'test_id': st.problem_test.id,
                    'status': st.status,
                    'score': st.score,
                }
                for st in submission_tests
            ]

            return Response({
                'status': 'Completed',
                'results': results,
                'total_score': submission.total_score,
            }, status=200)
        elif submission.status in ['Pending']:
            return Response({'status': 'Pending'}, status=200)
        else:
            return Response({'status': submission.status}, status=200)

    except Submission.DoesNotExist:
        return Response({'error': 'Submission not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tests(request , problem_id):
    tests = ProblemTest.objects.filter(problem=problem_id)
    serializer = ProblemTestSerializer(tests, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_rating(request, problem_id):
    user = request.user
    problem = Problem.objects.get(id=problem_id)
    rating = request.data['rating']
    if rating is None:
        rating = 0
    elif rating < 0 or rating > 5:
        return Response({'error': 'Rating must be between 0 and 5'} , status=400)
    user_rating, created = UserRatingProblem.objects.update_or_create(user=user, problem=problem, defaults={'rating': rating})
    serializer = UserRatingProblemSerializer(user_rating)
    return Response(serializer.data, status=201 if created else 200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rating(request, problem_id):
    try:
        user = request.user
        problem = Problem.objects.get(id=problem_id)
        user_rating = UserRatingProblem.objects.get(user=user, problem=problem)
        serializer = UserRatingProblemSerializer(user_rating)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_problem_score(request, problem_id):
    try:
        user = request.user
        problem = Problem.objects.get(id=problem_id)
        user_problem_score = UserProblemScore.objects.get(user=user, problem=problem)
        serializer = UserProblemScoreSerializer(user_problem_score)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_submissions_on_problem(request , problem_id):
    try:
        user = request.user
        problem = Problem.objects.get(id=problem_id)
        submissions = Submission.objects.filter(user=user, problem=problem)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)