let isProcessing = false;

async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    console.log('Sending message:', message); // Debug log
    
    if (!message || isProcessing) return;
    
    isProcessing = true;
    messageInput.value = '';
    
    displayMessage('You', message, 'user');
    displayTypingIndicator();

    try {
        // ส่ง request ไปยัง test_gemini.py ผ่าน API endpoint
        const response = await fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        console.log('Response status:', response.status); // Debug log

        const data = await response.json();
        removeTypingIndicator();

        // ตรวจสอบ response จาก test_gemini.py
        if (data.error) {
            throw new Error(data.error);
        }

        displayMessage('AOODDY_AI', data.response, 'bot');
        
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        displayMessage('AOODDY_AI', 'Sorry, something went wrong. Please try again.', 'error');
    } finally {
        isProcessing = false;
    }
}

function displayMessage(sender, message, type) {
    const chatArea = document.getElementById('chatArea');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function displayTypingIndicator() {
    const chatArea = document.getElementById('chatArea');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typing-indicator';
    typingIndicator.classList.add('message', 'bot');
    typingIndicator.innerHTML = '<strong>AOODDY_AI:</strong> Typing...';
    chatArea.appendChild(typingIndicator);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});