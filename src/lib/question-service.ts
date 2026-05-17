
import { generatePracticeQuestions, type GeneratePracticeQuestionsOutput } from "@/ai/flows/generate-practice-questions";

/**
 * Singleton QuestionService to manage and provide questions for the app.
 * Acts as a central factory for quiz data across all categories.
 */
class QuestionService {
  private static instance: QuestionService;
  
  private dummyData: Record<string, GeneratePracticeQuestionsOutput> = {
    math: [
      {
        questionText: "Quelle est la juridiction compétente pour le contentieux administratif en premier ressort ?",
        options: { A: "Le Tribunal de Grande Instance", B: "Le Tribunal Administratif", C: "La Cour d'Appel", D: "Le Conseil d'État" },
        correctAnswer: "B"
      },
      {
        questionText: "Qui est le chef du parquet dans un tribunal de grande instance ?",
        options: { A: "Le Procureur de la République", B: "Le Juge d'Instruction", C: "Le Président du Tribunal", D: "L'Huissier" },
        correctAnswer: "A"
      },
      {
        questionText: "Quel est l'âge minimum pour être juré d'assises ?",
        options: { A: "18 ans", B: "21 ans", C: "23 ans", D: "25 ans" },
        correctAnswer: "C"
      },
      {
        questionText: "Sous quelle autorité sont placés les magistrats du parquet ?",
        options: { A: "Le Conseil Supérieur de la Magistrature", B: "Le Garde des Sceaux", C: "Le Premier Ministre", D: "Le Président de la République" },
        correctAnswer: "B"
      },
      {
        questionText: "Quelle est la peine maximale pour un crime ?",
        options: { A: "20 ans", B: "30 ans", C: "Réclusion criminelle à perpétuité", D: "10 ans" },
        correctAnswer: "C"
      }
    ],
    physics: [
      {
        questionText: "What is the unit of force in the International System of Units (SI)?",
        options: { A: "Watt", B: "Joule", C: "Newton", D: "Pascal" },
        correctAnswer: "C"
      },
      {
        questionText: "What is the speed of light in a vacuum?",
        options: { A: "300,000 km/s", B: "150,000 km/s", C: "1,000,000 km/s", D: "500,000 km/s" },
        correctAnswer: "A"
      }
    ],
    history: [
      {
        questionText: "In which year did World War II end?",
        options: { A: "1943", B: "1944", C: "1945", D: "1946" },
        correctAnswer: "C"
      },
      {
        questionText: "Who was the first President of the United States?",
        options: { A: "Thomas Jefferson", B: "Abraham Lincoln", C: "George Washington", D: "John Adams" },
        correctAnswer: "C"
      }
    ]
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
   * Uses AI generation if possible, otherwise falls back to static dummy data.
   */
  public async getQuestions(category: string, count: number = 5): Promise<GeneratePracticeQuestionsOutput> {
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
      console.warn(`AI Quiz generation failed for ${category}, falling back to dummy data`);
      return this.getFallbackQuestions(category);
    }
  }

  private getFallbackQuestions(category: string): GeneratePracticeQuestionsOutput {
    const key = category.toLowerCase();
    return this.dummyData[key] || [
      {
        questionText: "Welcome to the practice session. Ready to begin?",
        options: { A: "Yes, let's go!", B: "I need a moment", C: "Maybe later", D: "Tell me more" },
        correctAnswer: "A"
      }
    ];
  }
}

export const questionService = QuestionService.getInstance();
