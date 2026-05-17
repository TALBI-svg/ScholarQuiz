'use server';
/**
 * @fileOverview A Genkit flow for generating practice questions for concours exams.
 *
 * - generatePracticeQuestions - A function that handles the practice question generation process.
 * - GeneratePracticeQuestionsInput - The input type for the generatePracticeQuestions function.
 * - GeneratePracticeQuestionsOutput - The return type for the generatePracticeQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuestionsInputSchema = z.object({
  examCategory:
    z.string().describe('The category of the exam, e.g., "Mathematics", "Physics", "History".'),
  difficultyLevel:
    z.enum(['Easy', 'Medium', 'Hard']).describe('The difficulty level of the questions.'),
  numberOfQuestions:
    z.number().int().min(1).max(10).default(5).describe('The number of questions to generate (1-10).'),
});
export type GeneratePracticeQuestionsInput = z.infer<
  typeof GeneratePracticeQuestionsInputSchema
>;

const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the multiple-choice question.'),
  options: z
    .object({
      A: z.string().describe('Option A for the question.'),
      B: z.string().describe('Option B for the question.'),
      C: z.string().describe('Option C for the question.'),
      D: z.string().describe('Option D for the question.'),
    })
    .describe('The multiple-choice options for the question.'),
  correctAnswer:
    z.enum(['A', 'B', 'C', 'D']).describe('The letter corresponding to the correct option.'),
});

const GeneratePracticeQuestionsOutputSchema = z
  .array(QuestionSchema)
  .describe('An array of generated practice questions.');
export type GeneratePracticeQuestionsOutput = z.infer<
  typeof GeneratePracticeQuestionsOutputSchema
>;

export async function generatePracticeQuestions(
  input: GeneratePracticeQuestionsInput
): Promise<GeneratePracticeQuestionsOutput> {
  return generatePracticeQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuestionsPrompt',
  input: {schema: GeneratePracticeQuestionsInputSchema},
  output: {schema: GeneratePracticeQuestionsOutputSchema},
  prompt: `You are an expert quiz question generator for concours exams. Your task is to create multiple-choice questions.\n\nGenerate exactly {{{numberOfQuestions}}} practice questions for the "{{{examCategory}}}" category at a "{{{difficultyLevel}}}" difficulty level.\n\nEach question must have:\n- A 'questionText' field for the question itself.\n- An 'options' object with four fields (A, B, C, D) for the choices.\n- A 'correctAnswer' field indicating the correct option (A, B, C, or D).\n\nEnsure the questions are challenging and relevant to concours exams. Provide only the JSON output.`,
});

const generatePracticeQuestionsFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuestionsFlow',
    inputSchema: GeneratePracticeQuestionsInputSchema,
    outputSchema: GeneratePracticeQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
