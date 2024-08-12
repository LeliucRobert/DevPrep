from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
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

class Topic(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    completed_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    def __str__(self):
        return f'Id: {self.id} | Title: {self.title}'

class Quiz(models.Model):
    topic = models.OneToOneField(Topic, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)

    def __str__(self):
        return  f'Id: {self.id} | Title: {self.title}'

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    correct_answers = models.PositiveIntegerField(default=1)
    weight = models.FloatField(default=0)

    def __str__(self):
        return f'Id: {self.id} | Question: {self.question}'

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_weights()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.update_weights()

    def update_weights(self):
        questions = Question.objects.filter(quiz=self.quiz)
        total_questions = questions.count()

        if total_questions > 0:
            new_weight = 1 / total_questions
            for question in questions:
                questions.update(weight=new_weight)

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self): 
        return f'Id: {self.id} | Answer: {self.answer} | for question {self.question.question} | is correct: {self.is_correct}'

    def save(self, *args, **kwargs):
        if self.is_correct:
            correct_answer_count = Answer.objects.filter(question=self.question, is_correct=True).count()
            if correct_answer_count > self.question.correct_answers:
                raise ValidationError(f"This question already has {self.question.correct_answers} correct answers.")
        super().save(*args, **kwargs)

class UserTopicStatus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    quizScore = models.PositiveIntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'topic')

    def __str__(self):
        return f"{self.user.username} scored {self.quizScore} on {self.topic.title}"

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