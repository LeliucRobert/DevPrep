from django.contrib import admin
from .models import Lesson, UserLessonScore
# Register your models here.

admin.site.register(Lesson)
admin.site.register(UserLessonScore)