# Generated by Django 4.2.14 on 2024-08-22 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_lesson_content'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
