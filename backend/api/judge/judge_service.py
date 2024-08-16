from .judge_api import get_language_id, create_submission, get_submission, get_statuses
import base64

def encode_base64(string):
    if isinstance(string, bytes):
        string_bytes = string
    else:
        string_bytes = string.encode('utf-8')
    base64_bytes = base64.b64encode(string_bytes)
    base64_string = base64_bytes.decode('utf-8')
    return base64_string

def decode_base64(base64_string):
    if isinstance(base64_string, bytes):
        base64_bytes = base64_string
    else:
        base64_bytes = base64_string.encode('utf-8')
    string_bytes = base64.b64decode(base64_bytes)
    string = string_bytes.decode('utf-8')
    return string

def run_code(code_base64 , language_id , test_input_base64):
    token = create_submission(code_base64 , language_id , test_input_base64)
    return token

def encode_data_base64(code , language , test_input):
    language_id = get_language_id(language)
    code_base64 = encode_base64(code)
    test_input_base64 = encode_base64(test_input)
    return code_base64 , language_id , test_input_base64

def get_result_by_token(token):
    response = get_submission('351f4fea-125a-4fdb-a293-a9abe925fdbc')
    return response

def test_code(code , language , tests):

    
    test_input = tests[0]['test_input']
    test_output = tests[0]['test_output']
    # test_input_base64 = encode_base64(test_input)
  
    # code_base64, language_id , test_input_base64 = encode_data_base64(code , language , test_input)
    # token = run_code(code_base64 , language_id , test_input_base64)
    
    # print(token)

    # result = get_result_by_token(token['token'])
    # print(result)
    # get_statuses()