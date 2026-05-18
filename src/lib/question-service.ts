import { generatePracticeQuestions, type GeneratePracticeQuestionsOutput } from "@/ai/flows/generate-practice-questions";

// Import pre-defined quiz data from the correct 'dev' category
import justiceQuiz07 from "@/data/quizzes/dev/2024-01-07-justice.json";
import justiceQuiz24 from "@/data/quizzes/dev/2024-01-24-justice.json";

/**
 * Singleton QuestionService to manage and provide questions for the app.
 * Acts as a central factory for quiz data across all categories.
 */
class QuestionService {
  private static instance: QuestionService;
  
  // Registry of available local concours files
  private localQuizzes: Record<string, any[]> = {
    "07-01-2024": [justiceQuiz07],
    "29-09-2024": [justiceQuiz24],
    history: [],
    biology: [],
    literature: [],
    chemistry: []
  };

  private constructor() {}

  public static getInstance(): QuestionService {
    if (!QuestionService.instance) {
      QuestionService.instance = new QuestionService();
    }
    return QuestionService.instance;
  }

  /**
   * Fetches questions for a specific category.
   * Prefers local JSON files (concours records) if available, 
   * otherwise falls back to AI generation or generic dummy data.
   */
  public async getQuestions(category: string, count: number = 5): Promise<GeneratePracticeQuestionsOutput> {
    const categoryLower = category.toLowerCase();

    // 1. Check if we have a specific local concours for this category
    const localConcours = this.localQuizzes[categoryLower];
    if (localConcours && localConcours.length > 0) {
      // Return the latest concours by date (sorted in JSON folder)
      return localConcours[0].questions;
    }

    // 2. Fallback to AI generation
    try {
      const data = await generatePracticeQuestions({
        concoursCategory: category,
        difficultyLevel: "Medium",
        numberOfQuestions: count,
      });
      
      if (data && data.length > 0) {
        return data;
      }
      throw new Error("No data returned from AI");
    } catch (error) {
      console.warn(`AI Quiz generation failed for ${category}, using generic fallback`);
      return this.getFallbackQuestions(category);
    }
  }

  private getFallbackQuestions(category: string): GeneratePracticeQuestionsOutput {
    return [
      {
        questionText: `Prepare for your ${category} concours. Ready to begin?`,
        options: { A: "Yes, let's go!", B: "I need a moment", C: "Maybe later", D: "Tell me more" },
        correctAnswer: "A"
      }
    ];
  }

  /**
   * Returns metadata about available concours for a category
   */
  public getAvailableConcours(category: string) {
    return this.localQuizzes[category.toLowerCase()] || [];
  }
}

export const questionService = QuestionService.getInstance();
