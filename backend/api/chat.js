const { GoogleGenerativeAI } = require("@google/generative-ai");

require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function handleChat(req, res) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const chat = model.startChat();
        
        const result = await chat.sendMessage(req.body.message);
        const response = await result.response;
        
        res.json({ reply: response.text() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get response from Gemini' });
    }
}

module.exports = { handleChat };
