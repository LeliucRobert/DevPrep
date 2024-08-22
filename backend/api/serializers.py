from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Lesson, UserLessonScore, Quiz, Question, Answer, Topic, UserTopicStatus, Problem, ProblemTest, Submission, UserRatingProblem, UserProblemScore

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id" , "title" , "content" , "created_at" , "author"]
        extra_kwargs = {"author": {"read_only": True}}

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ["id" , "title" , "description"  , "created_at", "difficulty"]

class UserLessonScoreSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    lesson = serializers.StringRelatedField()

    class Meta:
        model = UserLessonScore
        fields = ["id" , "user" , "lesson" , "score" , "completed_at"]

class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ["id" , "lesson" , "title"  , "completed_at" , "content"]

class QuizSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Quiz
        fields = ["id" , "topic" , "title"]

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id" , "quiz" , "question" , "correct_answers" , "weight"]

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id" , "question" , "answer" , "is_correct"]

class UserTopicStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTopicStatus
        fields = ["id" , "user" , "topic", "quizScore", "completed_at"]

class ProblemSerializer(serializers.ModelSerializer):
    created_by  = UserSerializer(read_only=True)
    class Meta:
        model = Problem
        fields = "__all__"

class ProblemTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProblemTest
        fields = "__all__"

class SubmissionSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    problem = ProblemSerializer(read_only=True)
    class Meta:
        model = Submission
        fields = "__all__"

class UserRatingProblemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRatingProblem
        fields = "__all__"

class UserProblemScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProblemScore
        fields = "__all__"

    