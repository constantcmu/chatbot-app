# README.md

# Chatbot Application

This project is a web application that consists of a backend server built with Python using Starlette and a frontend developed with HTML, CSS, and JavaScript. The application serves as a chatbot interface that connects to the OpenAI API.

## Project Structure

```
chatbot-app
├── backend
│   ├── app.py                # Main entry point for the backend application
│   ├── requirements.txt      # Lists dependencies for the backend
│   └── .env                  # Contains environment variables (API keys)
├── frontend
│   ├── index.html            # Main HTML file for the frontend
│   ├── css
│   │   ├── style.css         # Main styles for the frontend
│   │   └── responsive.css     # Responsive styles for different screen sizes
│   ├── js
│   │   ├── app.js            # Main JavaScript logic for the frontend
│   │   ├── chat.js           # Manages chatbot functionality
│   │   └── sidebar.js        # Handles sidebar functionality
│   └── assets
│       └── icons             # Directory for icon files
├── README.md                 # Documentation for the project
└── .gitignore                # Specifies files to be ignored by Git
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd chatbot-app
   ```

2. Set up the backend:
   - Navigate to the `backend` directory.
   - Install the required dependencies:
     ```
     pip install -r requirements.txt
     ```
   - Create a `.env` file and add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

3. Run the backend server:
   ```
   python app.py
   ```

4. Set up the frontend:
   - Open `index.html` in your web browser to view the application.

## Usage

- The chatbot interface allows users to interact with the chatbot powered by the OpenAI API.
- The sidebar can be toggled on mobile devices for better accessibility.

## License

This project is licensed under the MIT License.