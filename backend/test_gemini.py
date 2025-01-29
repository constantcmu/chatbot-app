import requests
import os
import sys
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model
class ChatMessage(BaseModel):
    message: str

# API endpoint
@app.post("/api/chat")
async def chat_endpoint(chat_message: ChatMessage):
    return send_message_to_gemini(chat_message.message)

def send_message_to_gemini(message):
    try:
        print(f"Sending message: {message}")  # Debug log
        
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        data = {
            "contents": [{
                "parts":[{"text": message}]
            }]
        }
        
        response = requests.post(url, headers=headers, json=data)
        response_json = response.json()
        
        # print(f"Raw response: {response_json}")  # Debug log
        
        return {
            "response": response_json.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "No response")
        }
        
    except Exception as e:
        print(f"Error in send_message_to_gemini: {str(e)}")
        return {"error": str(e)}

# Modify main block to run FastAPI
if __name__ == "__main__":
    if len(sys.argv) > 1:
        # รับข้อความจาก command line argument
        message = " ".join(sys.argv[1:])
        result = send_message_to_gemini(message)
        print(result['response'])  # พิมพ์เฉพาะ response
    else:
        print("Please provide a message as command line argument")