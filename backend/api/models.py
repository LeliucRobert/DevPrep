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
    created_at = models.DateTimeField(auto_now_add=True)
    difficulty = models.CharField(max_length=10, choices=[
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard')])
    def __str__(self):
        return self.title

class Topic(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    completed_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField(null=True, blank=True)


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

class Problem(models.Model):
    title = models.CharField(max_length=100)
    card_description = models.TextField()
    description = models.TextField()
    input_description = models.TextField()
    output_description = models.TextField()
    restrictions = models.TextField()
    sample_input = models.TextField()
    sample_output = models.TextField()
    difficulty = models.CharField(max_length=10, choices=[
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard')])
    category = models.CharField(
    max_length=10,
    choices=[
        ("dp", "Dynamic Programming"),
        ("greedy", "Greedy"),
        ("graph", "Graph"),
        ("math", "Math"),
        ("string", "String"),
        ("tree", "Tree"),
        ("other", "Other")
    ]
    )
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ProblemTest(models.Model):
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    test_input = models.TextField()
    test_output = models.TextField()


    def __str__(self):
        return f'Id: {self.id} | Problem: {self.problem.title}'

class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    user_code = models.TextField()
    language = models.CharField(max_length=10, choices=[
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
        ('javascript', 'JavaScript')])
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('Failed', 'Failed'),
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Time Limit Exceeded', 'Time Limit Exceeded'),
        ('Runtime Error', 'Runtime Error'),
        ('Compilation Error', 'Compilation Error')])
    total_score = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])

    def __str__(self):
        return f'Id: {self.id} | Problem: {self.problem.title} | Status: {self.status}'


class SubmissionTest(models.Model):
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    problem_test = models.ForeignKey(ProblemTest, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[
        ('Accepted', 'Accepted'),
        ('Wrong Answer', 'Wrong Answer'),
        ('Time Limit Exceeded', 'Time Limit Exceeded'),
        ('Runtime Error', 'Runtime Error'),
        ('Compilation Error', 'Compilation Error')])
    score = models.PositiveIntegerField(default=0 , validators=[MinValueValidator(0), MaxValueValidator(100)])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Id: {self.id} | Submission: {self.submission.id} | Test: {self.problem_test.id} | Status: {self.status}'

class UserProblemScore (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    score = models.PositiveIntegerField(default=0 , validators=[MinValueValidator(0), MaxValueValidator(100)])

    class Meta:
        unique_together = ('user', 'problem')

    def __str__(self):
        return f'Id: {self.id} | User: {self.user.username} | Problem: {self.problem.title} | Score: {self.score}'


class UserRatingProblem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    problem = models.ForeignKey(Problem, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    class Meta:
        unique_together = ('user', 'problem')

    def __str__(self):
        return f'Id: {self.id} | User: {self.user.username} | Rating: {self.rating}'