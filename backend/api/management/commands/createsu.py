import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create a superuser if none exists'

    def handle(self, *args, **kwargs):
        # Get the superuser credentials from environment variables
        username = os.getenv('SUPERUSER_USERNAME')
        email = os.getenv('SUPERUSER_EMAIL')
        password = os.getenv('SUPERUSER_PASSWORD')

        # Ensure that all necessary environment variables are set
        if not username or not email or not password:
            raise ValueError('SUPERUSER_USERNAME, SUPERUSER_EMAIL, and SUPERUSER_PASSWORD environment variables must be set.')

        # Check if a superuser with this username already exists
        if not User.objects.filter(username=username).exists():
            # Create a new superuser with the credentials
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            self.stdout.write(self.style.SUCCESS(f'Superuser {username} created successfully.'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser {username} already exists.'))
