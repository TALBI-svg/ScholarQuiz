
import { generatePracticeQuestions, type GeneratePracticeQuestionsOutput } from "@/ai/flows/generate-practice-questions";

/**
 * Singleton QuestionService to manage and provide questions for the app.
 * This can be extended to support different question formats or sources.
 */
class QuestionService {
  private static instance: QuestionService;
  
  private dummyData: Record<string, GeneratePracticeQuestionsOutput> = {
    math: [
      {
        questionText: "What is the square root of 144?",
        options: { A: "10", B: "12", C: "14", D: "16" },
        correctAnswer: "B"
      },
      {
        questionText: "Solve for x: 3x - 7 = 14",
        options: { A: "5", B: "6", C: "7", D: "8" },
        correctAnswer: "C"
      },
      {
        questionText: "What is the area of a circle with radius 5? (Approximate π as 3.14)",
        options: { A: "31.4", B: "78.5", C: "15.7", D: "100" },
        correctAnswer: "B"
      },
      {
        questionText: "What is 15% of 200?",
        options: { A: "20", B: "25", C: "30", D: "35" },
        correctAnswer: "C"
      },
      {
        questionText: "If a triangle has angles of 90° and 45°, what is the third angle?",
        options: { A: "45°", B: "90°", C: "60°", D: "30°" },
        correctAnswer: "A"
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
    ],
    biology: [
      {
        questionText: "Which organ is responsible for pumping blood throughout the body?",
        options: { A: "Lungs", B: "Brain", C: "Heart", D: "Liver" },
        correctAnswer: "C"
      },
      {
        questionText: "What is the powerhouse of the cell?",
        options: { A: "Nucleus", B: "Mitochondria", C: "Ribosome", D: "Cytoplasm" },
        correctAnswer: "B"
      }
    ],
    literature: [
      {
        questionText: "Who wrote the play 'Romeo and Juliet'?",
        options: { A: "Charles Dickens", B: "William Shakespeare", C: "Mark Twain", D: "Jane Austen" },
        correctAnswer: "B"
      }
    ],
    chemistry: [
      {
        questionText: "What is the chemical symbol for water?",
        options: { A: "CO2", B: "O2", C: "H2O", D: "NaCl" },
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
   * Tries AI first, falls back to pre-defined data.
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

  /**
   * Provides fallback questions for a category.
   */
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
