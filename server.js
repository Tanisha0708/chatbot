const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// OpenAI API Configuration
const configuration = new Configuration({
    apiKey: 'p38wah1sOlPzqdz5MLE1d35qe1n1', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.post('/chat-api', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Communicate with OpenAI API
        const response = await openai.createCompletion({
            model: 'text-davinci-003', // or another model like gpt-4
            prompt: userMessage,
            max_tokens: 150,
            temperature: 0.7,
        });

        const botMessage = response.data.choices[0].text.trim();
        res.json({ message: botMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error communicating with OpenAI API' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
