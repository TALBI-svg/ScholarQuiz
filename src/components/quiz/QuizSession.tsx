"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, RefreshCw, Loader2, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { type GeneratePracticeQuestionsOutput } from "@/ai/flows/generate-practice-questions";
import { questionService } from "@/lib/question-service";
import { timerService } from "@/lib/timer-service";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuizSessionProps {
  category: string;
}

export function QuizSession({ category }: QuizSessionProps) {
  const [questions, setQuestions] = useState<GeneratePracticeQuestionsOutput>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Subscribe to the TimerService (Observer Pattern)
  useEffect(() => {
    const unsubscribe = timerService.subscribe((seconds) => {
      setTimeLeft(seconds);
      if (seconds === 0 && !loading && !quizComplete && questions.length > 0) {
        // Handle timeout if needed
      }
    });

    return () => {
      unsubscribe();
      timerService.stop();
    };
  }, [loading, quizComplete, questions.length]);

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      const data = await questionService.getQuestions(category);
      setQuestions(data);
      
      // Configure and start the timer once questions are loaded
      // Here we configure it to 10 minutes (600 seconds) as an example
      timerService.configure(600);
      timerService.start();
      
      setLoading(false);
    }
    loadQuiz();
  }, [category]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (selectedOption === questions[currentStep].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizComplete(true);
      timerService.stop();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryTitle = (id: string) => {
    if (id === 'math') return "Ministère de la Justice";
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-6 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <h2 className="text-2xl font-bold">Generating your personalized concours practice...</h2>
        <p className="text-muted-foreground text-lg">Preparing high-quality questions for your success.</p>
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
          <h2 className="text-4xl font-bold mb-4">Practice Complete!</h2>
          <p className="text-muted-foreground text-lg">{message}</p>
        </div>

        <Card className="border-none shadow-xl overflow-hidden rounded-[2.5rem] bg-card">
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
  const isAnswered = selectedOption !== null;

  return (
    <div className="flex flex-col gap-8 p-6 min-h-screen max-w-3xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-primary transition-colors shrink-0 flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0" />
            <span className="font-bold text-foreground truncate">
              {getCategoryTitle(category)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 shrink-0 ml-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className={cn(
              "text-xs font-bold tabular-nums",
              timeLeft < 60 ? "text-destructive animate-pulse" : "text-primary"
            )}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <span className="text-sm font-bold text-primary shrink-0 ml-2">
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 rounded-full" />
      </div>

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

          <RadioGroup 
            value={selectedOption || ""} 
            onValueChange={handleOptionSelect}
            className="grid gap-6 mt-4"
          >
            {Object.entries(currentQuestion.options).map(([key, text]) => {
              const isSelected = selectedOption === key;

              return (
                <div key={key} className="flex items-center space-x-4 group">
                  <RadioGroupItem 
                    value={key} 
                    id={`option-${key}`} 
                    className="h-6 w-6 border-2 border-muted-foreground/30 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor={`option-${key}`}
                    className={cn(
                      "text-lg md:text-xl font-medium cursor-pointer flex-1 py-1 transition-colors",
                      isSelected ? "text-primary font-bold" : "text-foreground"
                    )}
                  >
                    <span className="mr-2 font-bold opacity-40 group-hover:opacity-100 transition-opacity">{key}.</span>
                    {text}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-10 pb-12">
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          size="lg"
          className="w-full h-16 rounded-3xl text-xl font-bold gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {currentStep === questions.length - 1 ? "Complete Practice" : "Continue"}
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
