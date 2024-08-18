from django.contrib import admin
from .models import Lesson, UserLessonScore, Topic, Quiz, Question, Answer, UserTopicStatus, Problem, ProblemTest, Submission, SubmissionTest
# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('weight',)  
    list_display = ('id', 'quiz', 'question', 'weight', 'correct_answers') 
    fields = ('quiz', 'question', 'correct_answers', 'weight') 

admin.site.register(Lesson)
admin.site.register(UserLessonScore)
admin.site.register(Topic)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(UserTopicStatus)
admin.site.register(Problem)
admin.site.register(ProblemTest)
admin.site.register(Submission)
admin.site.register(SubmissionTest)