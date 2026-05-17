
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Home, RefreshCw, Loader2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { generatePracticeQuestions, type GeneratePracticeQuestionsOutput } from "@/ai/flows/generate-practice-questions";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuizSessionProps {
  category: string;
}

export function QuizSession({ category }: QuizSessionProps) {
  const [questions, setQuestions] = useState<GeneratePracticeQuestionsOutput>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const data = await generatePracticeQuestions({
          examCategory: category,
          difficultyLevel: "Medium",
          numberOfQuestions: 5,
        });
        setQuestions(data);
      } catch (error) {
        console.error("Failed to load quiz", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [category]);

  const handleOptionSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentStep].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <h2 className="text-2xl font-bold">Generating your personalized quiz...</h2>
        <p className="text-muted-foreground text-lg">Our AI is hand-picking fresh questions for your success.</p>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Keep studying! You can do better.";
    if (percentage >= 80) message = "Amazing work! You're ready for the concours!";
    else if (percentage >= 50) message = "Good progress! Keep practicing.";

    return (
      <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500 py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-primary/10 mb-6">
            <TrophyIcon className="h-14 w-14 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
          <p className="text-muted-foreground text-lg">{message}</p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem]">
          <CardContent className="p-0">
            <div className="bg-primary p-10 text-primary-foreground text-center">
              <span className="text-6xl md:text-7xl font-bold">{percentage}%</span>
              <p className="text-primary-foreground/80 mt-2 text-lg font-medium">Your Accuracy</p>
            </div>
            <div className="p-8 grid grid-cols-2 gap-8 divide-x divide-border bg-card">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">{score}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1 font-bold">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-red-500">{questions.length - score}</p>
                <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1 font-bold">Incorrect</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button 
            className="flex-1 h-16 rounded-3xl text-xl font-bold gap-3 shadow-lg"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-6 w-6" /> Try Again
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-16 rounded-3xl text-xl font-bold gap-3">
              <Home className="h-6 w-6" /> Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen max-w-3xl mx-auto">
      {/* Quiz Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-accent/20">
              <Home className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold text-primary">02:45</span>
          </div>
          <span className="text-lg font-bold text-primary">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
      </div>

      {/* Question Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col gap-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-headline leading-tight mt-4">
            {currentQuestion.questionText}
          </h2>

          <div className="grid gap-4">
            {Object.entries(currentQuestion.options).map(([key, text]) => {
              const isSelected = selectedOption === key;
              const isCorrect = key === currentQuestion.correctAnswer;
              
              let stateClasses = "bg-card border-border hover:border-primary/50 hover:bg-accent/5";
              if (isAnswered) {
                if (isCorrect) stateClasses = "bg-green-50 border-green-500 text-green-700 ring-2 ring-green-500";
                else if (isSelected) stateClasses = "bg-red-50 border-red-500 text-red-700 ring-2 ring-red-500";
                else stateClasses = "bg-card border-border opacity-40 grayscale-[0.5]";
              }

              return (
                <button
                  key={key}
                  onClick={() => handleOptionSelect(key)}
                  disabled={isAnswered}
                  className={cn(
                    "flex items-center justify-between p-5 md:p-6 rounded-3xl border-2 transition-all text-left group",
                    stateClasses,
                    !isAnswered && "hover:shadow-lg active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <span className={cn(
                      "flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-xl font-bold text-lg transition-colors",
                      isAnswered && isCorrect ? "bg-green-500 text-white" : 
                      isAnswered && isSelected ? "bg-red-500 text-white" :
                      "bg-secondary group-hover:bg-primary/20 text-primary"
                    )}>
                      {key}
                    </span>
                    <span className="font-semibold text-base md:text-lg">{text}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-6 w-6 md:h-8 md:w-8 text-red-500" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-10 pb-12">
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          size="lg"
          className="w-full h-16 rounded-3xl text-xl font-bold gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {currentStep === questions.length - 1 ? "Complete Quiz" : "Continue"}
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
