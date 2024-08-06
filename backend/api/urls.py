from django.urls import path
from .views import create_lesson, get_all_lessons, get_user_scores, get_lesson_details, create_topic, get_topics, create_quiz, get_quiz
from . import views

urlpatterns =[
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("lessons/create", create_lesson , name="lessons-list-create"),
    path("lessons/" , get_all_lessons , name="lessons-list"),
    path("lessons/<int:pk>/" , get_lesson_details , name="lesson-detail"),
    path("lessons/<int:pk>/topics/create" , create_topic , name="topics-list-create"),
    path("lessons/<int:lesson_id>/topics/" , get_topics , name="topics-list"),
    path("quiz/create" , create_quiz , name="quiz-list-create"),
    path("topics/<int:topic_id>/quiz/" , get_quiz , name="quiz-list"),


    path("scores/" , get_user_scores , name="scores-list"),
]