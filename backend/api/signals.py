from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserTopicStatus, Topic

@receiver(post_save, sender=Topic)
def create_user_topic_scores(sender, instance, created, **kwargs):
    if created:
        users = User.objects.all()
        UserTopicStatus.objects.bulk_create([
            UserTopicStatus(user=user, topic=instance, quizScore=0)
            for user in users
        ])
