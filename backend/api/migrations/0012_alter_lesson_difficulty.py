# Generated by Django 4.2.14 on 2024-08-22 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_topic_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='difficulty',
            field=models.CharField(choices=[('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard')], max_length=10),
        ),
    ]
