// This file contains the main JavaScript logic for the frontend application, handling interactions and connecting to the backend API.

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = chatInput.value;
        chatInput.value = '';

        // Display user message
        appendMessage('You: ' + userMessage);

        // Send message to backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        appendMessage('Bot: ' + data.reply);
    });

    function appendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        chatOutput.appendChild(messageElement);
    }
});