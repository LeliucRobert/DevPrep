import requests
from dotenv import load_dotenv
import os

load_dotenv()
JUDGE0_API_KEY = os.getenv('JUDGE0_API_KEY')

def get_language_id(language):
    languages = {
        "C":50,
        "cpp":54,
        "C#":51,
        "java":91,
        "javascript":93,
        "python":92,
    }
    return languages[language]

def create_submission(source_code, language_id, stdin):
    url = "https://judge0-ce.p.rapidapi.com/submissions"

    querystring = {"base64_encoded":"true","wait":"false","fields":"*"}

    payload = {
        "language_id": language_id,
        "source_code": source_code,
        "stdin": stdin
    }
    headers = {
        "x-rapidapi-key": JUDGE0_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers, params=querystring)
    return response.json()

def get_submission(token):
    url = f'https://judge0-ce.p.rapidapi.com/submissions/{token}'

    querystring = {"base64_encoded":"true","fields":"*"}

    headers = {
        "x-rapidapi-key": JUDGE0_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    return response.json()

def get_statuses():
    url = 'https://judge0-ce.p.rapidapi.com/statuses'

    headers = {
        "x-rapidapi-key": JUDGE0_API_KEY,
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)

    print(response.json())
