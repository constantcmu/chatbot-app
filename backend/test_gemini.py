import requests
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

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

if __name__ == "__main__":
    while True:
        test_message = input("Enter message (or 'exit' to quit): ")
        if test_message.lower() == 'exit':
            break
        result = send_message_to_gemini(test_message)
        # แสดงเฉพาะค่า response
        if "response" in result:
            print(f"Result: {result['response']}\n")
        else:
            print(f"Error: {result.get('error', 'Unknown error')}\n")
