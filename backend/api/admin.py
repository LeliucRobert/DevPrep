from django.contrib import admin
from .models import User, Lesson, UserLessonScore, Topic, Quiz, Question, Answer, UserTopicStatus, Problem, ProblemTest, Submission, SubmissionTest, UserProblemScore, UserRatingProblem
from django_summernote.widgets import SummernoteWidget 
from django.db import models
class TopicAdmin(admin.ModelAdmin):
    formfield_overrides = { 
            models.TextField: {'widget': SummernoteWidget}, 
     }

class ProblemAdmin(admin.ModelAdmin):
    formfield_overrides = { 
            models.TextField: {'widget': SummernoteWidget}, 
     }

class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('weight',)  
    list_display = ('id', 'quiz', 'question', 'weight', 'correct_answers') 
    fields = ('quiz', 'question', 'correct_answers', 'weight') 

# class ProblemAdmin(admin.ModelAdmin):
#     def save_model(self, request, obj, form, change):
#         super().save_model(request, obj, form, change)
        
#         if not change:
#             for user in User.objects.all():
#                 UserRatingProblem.objects.get_or_create(user=user, problem=obj, defaults={'rating': 0})

admin.site.register(Lesson)
admin.site.register(UserLessonScore)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Quiz)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(UserTopicStatus)
admin.site.register(Problem, ProblemAdmin)
admin.site.register(ProblemTest)
admin.site.register(Submission)
admin.site.register(SubmissionTest)
admin.site.register(UserProblemScore)
admin.site.register(UserRatingProblem)