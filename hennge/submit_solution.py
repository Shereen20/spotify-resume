import time
import hmac
import base64
import struct
import hashlib
import json
import requests

def generate_totp(secret, time_step=30, digits=10, T0=0):
    now = int(time.time())
    T = (now - T0) // time_step
    msg = struct.pack('>Q', T)
    secret_bytes = secret.encode('utf-8')
    h = hmac.new(secret_bytes, msg, hashlib.sha512).digest()
    offset = h[-1] & 0xf
    binary = struct.unpack('>I', h[offset:offset + 4])[0] & 0x7fffffff
    totp = str(binary)[-digits:]
    return totp.zfill(digits)

def send_solution(email, github_url):
    payload = {
        "github_url": github_url,
        "contact_email": email,
        "solution_language": "python"
    }

    secret = email + "HENNGECHALLENGE003"
    password = generate_totp(secret)

    auth = (email, password)
    url = "https://api.challenge.hennge.com/challenges/003"
    headers = {"Content-Type": "application/json"}
    
    response = requests.post(
        url,
        json=payload,
        headers=headers,
        auth=auth
    )
    
    return response.status_code, response.text

email = "anandshereen9@gmail.com"
github_url = "https://gist.github.com/Shereen20/eba39934b57ea31bc1b3d84da756a8d1"

status, response = send_solution(email, github_url)
print(f"Status Code: {status}")
print(f"Response: {response}")