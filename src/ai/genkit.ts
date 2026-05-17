
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Ensure the API key is present before initializing
const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
  console.warn('Genkit: No valid API key found. Please set GOOGLE_GENAI_API_KEY in your .env file with a key from https://aistudio.google.com/app/apikey');
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
