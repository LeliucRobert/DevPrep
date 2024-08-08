from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, LessonSerializer, UserLessonScoreSerializer, TopicSerializer, QuizSerializer, QuestionSerializer, AnswerSerializer, UserTopicStatusSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Lesson, UserLessonScore, Topic, Quiz, Question, Answer, UserTopicStatus
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from django.contrib import admin


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['POST'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def get_lesson_details(request, pk):
    try:
        lesson = Lesson.objects.get(pk=pk)
        serializer = LessonSerializer(lesson)
        return Response(serializer.data)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_topic(request):
    serializer = TopicSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_topics(request, lesson_id):
    try:
        topics = Topic.objects.filter(lesson=lesson_id)
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data)
    except Lesson.DoesNotExist:
        return Response({'error': 'Lesson not found'}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_quiz(request):
    serializer = QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_quiz(request, topic_id):
    try:
        quiz = Quiz.objects.filter(topic=topic_id)
        serializer = QuizSerializer(quiz, many=True)
        return Response(serializer.data)
    except Topic.DoesNotExist:
        return Response({'error': 'Topic not found'}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_question(request):
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_question(request, quiz_id):
    try:
        questions = Question.objects.filter(quiz=quiz_id)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
    except Quiz.DoesNotExist:
        return Response({'error': 'Quiz not found'}, status=404)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_answer(request):
    serializer = AnswerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_answer(request, question_id):
    try:
        answers = Answer.objects.filter(question=question_id)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)
    except Question.DoesNotExist:
        return Response({'error': 'Question not found'}, status=404)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_scores(request):
    user = request.user  # Get the authenticated user
    scores = UserLessonScore.objects.filter(user=user)  # Filter scores for this user
    serializer = UserLessonScoreSerializer(scores, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def get_user_topic_status(request, topic_id):
    try:
        user = request.user
        user_topic_status = UserTopicStatus.objects.filter(user=user, topic=topic_id)
        serializer = UserTopicStatusSerializer(user_topic_status, many=True)
        return Response(serializer.data)
    except Topic.DoesNotExist:
        return Response({'error': 'Topic not found'}, status=404)