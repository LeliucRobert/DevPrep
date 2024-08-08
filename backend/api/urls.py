from django.urls import path
from .views import create_lesson, get_all_lessons, get_user_scores, get_lesson_details, create_topic, get_topics, create_quiz, get_quiz, create_question, get_question, create_answer, get_answer
from .views import get_user_topic_status
from . import views

urlpatterns =[
    path("lessons/create", create_lesson , name="lessons-list-create"),
    path("lessons/" , get_all_lessons , name="lessons-list"),
    path("lessons/<int:pk>/" , get_lesson_details , name="lesson-detail"),
    path("lessons/<int:pk>/topics/create" , create_topic , name="topics-list-create"),
    path("lessons/<int:lesson_id>/topics/" , get_topics , name="topics-list"),
    path("quiz/create" , create_quiz , name="quiz-list-create"),
    path("topics/<int:topic_id>/quiz/" , get_quiz , name="quiz-list"),
    path("questions/create" , create_question , name="questions-list-create"),
    path("quiz/<int:quiz_id>/questions/" , get_question , name="questions-list"),
    path("answers/create" , create_answer , name="answers-list-create"),
    path("questions/<int:question_id>/answers/" , get_answer , name="answers-list"),
    path("topics/<int:topic_id>/userScores/", get_user_topic_status, name="user-topic-status"),
    path("scores/" , get_user_scores , name="scores-list"),
]