import express from 'express';
import cors from 'cors';
import { handleNicheGPTRequest } from './niche-gpt';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/niche-gpt', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await handleNicheGPTRequest(message);
    res.json(response);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
}); 