interface Config {
  openai: {
    apiKey: string;
    model: string;
  };
  env: string;
}

const development: Config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
  },
  env: 'development',
};

const production: Config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4',
  },
  env: 'production',
};

export const config: Config = process.env.NODE_ENV === 'production' ? production : development;

// Validate configuration
if (!config.openai.apiKey) {
  throw new Error('OpenAI API key is required. Please set OPENAI_API_KEY environment variable.');
} 