from django.contrib import admin
from .models import Lesson, UserLessonScore, Topic, Quiz, Question, Answer
# Register your models here.

admin.site.register(Lesson)
admin.site.register(UserLessonScore)
admin.site.register(Topic)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Answer)