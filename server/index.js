require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');
const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' })
});

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'User message is required' });
    }

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });

    res.json({ reply: chatCompletion.choices[0].message.content });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})