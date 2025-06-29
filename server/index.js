require('dotenv').config();

const express = require('express');
const { OpenAI } = require('openai');
// 引入 Gemini 服務
const GeminiService = require('./gemini');
const app = express();
const port = 3000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 初始化 Gemini 服務
const geminiService = new GeminiService();

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express!' })
});

// add system prompt
const systemPrompt = `You are a helpful assistant who only replies with Traditional Chinese.
                      You can only reply within 50 words.
                      You must check user's name before making any reply.
                      You alway start your reply with "Hi, [user's name]".
                      You can never talk about weather related topics`;

// start the conversation
let conversationHistory = [
  { role: 'system', content: systemPrompt },
];

// customize response filter
const filterResponse = (response) => {
  const forbiddenKeywords = ["我", "妳", "你", "他", "她", "它"];

  const replacedResponse = forbiddenKeywords.reduce((acc, keyword) => {
    return acc.replaceAll(keyword, '*'.repeat(keyword.length));
  }, response);

  return replacedResponse;
}

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'User message is required' });
    }

    // add user conversation
    conversationHistory.push({ role: 'user', content: userMessage });

    const chatCompletion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: 'gpt-4o',
    });

    const assistantReply = chatCompletion.choices[0].message.content;

    const filteredReply = filterResponse(assistantReply);

    // add assistant conversation
    conversationHistory.push({ role: 'assistant', content: assistantReply });

    res.json({ reply: filteredReply });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
})

// Gemini 聊天路由 - 簡單的對話功能
app.post('/api/chat/gemini', async (req, res) => {
  try {
    const userMessage = req.body.message;

    // 驗證使用者訊息
    if (!userMessage) {
      return res.status(400).json({ error: 'User message is required' });
    }

    // 檢查 Gemini API Key 是否已設定
    if (!geminiService.isConfigured()) {
      return res.status(500).json({ error: 'Gemini API Key not configured' });
    }

    // 使用 Gemini 服務處理對話
    const reply = await geminiService.chat(userMessage);

    res.json({ reply });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'An error occurred with Gemini API' });
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
