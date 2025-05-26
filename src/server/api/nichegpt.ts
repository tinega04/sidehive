import { Router } from 'express';
import { generateBusinessIdea, NicheGPTRequest } from '../services/openai';

const router = Router();

router.post('/generate', async (req, res) => {
  try {
    const params: NicheGPTRequest = {
      prompt: req.body.prompt,
      industry: req.body.industry,
      marketSize: req.body.marketSize,
      capitalRange: req.body.capitalRange,
    };

    const result = await generateBusinessIdea(params);
    res.json(result);
  } catch (error: any) {
    console.error('NicheGPT API Error:', error);
    res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
    });
  }
});

export default router; 