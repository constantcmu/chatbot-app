from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from test_gemini import send_message_to_gemini  # Import function
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-pro')

async def chatbot_endpoint(request):
    try:
        data = await request.json()
        user_message = data.get("message")
        
        if not user_message:
            return JSONResponse({"error": "No message provided"}, status_code=400)

        # ใช้ฟังก์ชันจาก test_gemini.py
        response_data = send_message_to_gemini(user_message)
        
        # ส่ง response กลับในรูปแบบเดียวกับ API
        return JSONResponse(response_data)

    except Exception as e:
        print(f"Server Error: {str(e)}")
        return JSONResponse({"error": str(e)}, status_code=500)

# Define middleware
middleware = [
    Middleware(CORSMiddleware,
        allow_origins=['*'],
        allow_methods=['*'],
        allow_headers=['*'])
]

# Define API routes
routes = [
    Route("/api/chat", chatbot_endpoint, methods=["POST"]),
]

# Create the Starlette application
app = Starlette(debug=True, routes=routes, middleware=middleware)

# Add this line at the end
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)