from django.contrib import admin
from .models import Lesson, UserLessonScore, Topic, Quiz, Question, Answer, UserTopicStatus, Problem, ProblemTest, Submission, SubmissionTest, UserProblemScore, UserRatingProblem
# Register your models here.

class QuestionAdmin(admin.ModelAdmin):
    readonly_fields = ('weight',)  
    list_display = ('id', 'quiz', 'question', 'weight', 'correct_answers') 
    fields = ('quiz', 'question', 'correct_answers', 'weight') 

class ProblemAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        
        if not change:
            for user in User.objects.all():
                UserRatingProblem.objects.get_or_create(user=user, problem=obj, defaults={'rating': 0})

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
admin.site.register(UserProblemScore)
admin.site.register(UserRatingProblem)