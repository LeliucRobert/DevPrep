from django.urls import path
from .views import create_lesson, get_all_lessons, get_user_scores
from . import views

urlpatterns =[
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="note-delete"),
    path("lessons/create", create_lesson , name="lessons-list-create"),
    path("lessons/" , get_all_lessons , name="lessons-list"),
    path("scores/" , get_user_scores , name="scores-list"),
]