from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Lesson, UserLessonScore

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
        fields = ["id" , "title" , "description" , "content" , "created_at", "difficulty"]

class UserLessonScoreSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    lesson = serializers.StringRelatedField()

    class Meta:
        model = UserLessonScore
        fields = ["id" , "user" , "lesson" , "score" , "completed_at"]