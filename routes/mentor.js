const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });
    } catch (err) {
        console.error('OpenAI API error:', err.message);
        res.status(500).json({ error: 'AI error', details: err.message });
    }
});

module.exports = router;
