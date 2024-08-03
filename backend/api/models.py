from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notes')

    def __str__(self):
        return self.title


class Lesson(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    difficulty = models.CharField(max_length=10, choices=[
        ('Easy', 'Easy'),
        ('Eedium', 'Medium'),
        ('Hard', 'Hard')])
    def __str__(self):
        return self.title

class UserLessonScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        return f"{self.user.username} scored {self.score} on {self.lesson.title}"