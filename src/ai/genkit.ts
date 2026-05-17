
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Ensure the API key is present before initializing
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

const isPlaceholder = !apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey.trim() === '';

if (isPlaceholder) {
  console.error('❌ Genkit Error: No valid API key found. Please get a key from https://aistudio.google.com/app/apikey and add it to your .env file as GOOGLE_GENAI_API_KEY.');
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: isPlaceholder ? 'missing-key' : apiKey }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
