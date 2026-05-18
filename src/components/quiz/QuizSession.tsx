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
import { useLoading } from "@/components/providers/LoadingProvider";

interface QuizSessionProps {
  category: string;
}

export function QuizSession({ category }: QuizSessionProps) {
  const { setIsLoading } = useLoading();
  const [questions, setQuestions] = useState<GeneratePracticeQuestionsOutput>([]);

  useEffect(() => {
    // Reset global loading state when the component mounts
    setIsLoading(false);
  }, [setIsLoading]);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const unsubscribe = timerService.subscribe((seconds) => {
      setTimeLeft(seconds);
    });

    return () => {
      unsubscribe();
      timerService.stop();
    };
  }, []);

  useEffect(() => {
    async function loadQuiz() {
      setLoading(true);
      const data = await questionService.getQuestions(category);
      setQuestions(data);
      
      // Check for custom time limit in local concours metadata
      const availableConcours = questionService.getAvailableConcours(category);
      const currentConcours = availableConcours[0];
      const customTimeLimit = currentConcours?.timeLimit;
      
      const duration = customTimeLimit || (data.length * 120);
      timerService.configure(duration);
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
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCategoryTitle = (id: string) => {
    if (id === 'dev') return "Ministère de la Justice (Dev)";
    if (id === 'math') return "Mathématiques";
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
    return (
      <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-6">
            <TrophyIcon className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Practice Complete!</h2>
          <p className="text-muted-foreground">Review your performance below.</p>
        </div>

        <Card className="border-none shadow-lg overflow-hidden rounded-[2rem] bg-card">
          <CardContent className="p-0">
            <div className="bg-primary p-8 text-primary-foreground text-center">
              <span className="text-6xl font-bold">{percentage}%</span>
              <p className="text-primary-foreground/80 mt-1 font-medium">Your Score</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4 divide-x bg-card">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{score}</p>
                <p className="text-xs text-muted-foreground uppercase font-bold">Correct</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-500">{questions.length - score}</p>
                <p className="text-xs text-muted-foreground uppercase font-bold">Incorrect</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 h-14 rounded-2xl font-bold gap-2" onClick={() => window.location.reload()}>
            <RefreshCw className="h-5 w-5" /> Try Again
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full h-14 rounded-2xl font-bold gap-2">
              <Home className="h-5 w-5" /> Dashboard
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
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span>Dashboard</span>
            </Link>
            <ChevronRight className="h-2 w-2" />
            <span className="font-bold text-foreground">
              {getCategoryTitle(category)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className={cn(
              "text-xs font-bold tabular-nums text-primary",
              timeLeft < 60 && "text-destructive"
            )}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          <span>Progress</span>
          <span>{currentStep + 1} / {questions.length}</span>
        </div>
        <Progress value={progress} className="h-1.5 rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-xl md:text-2xl font-bold leading-tight">
            {currentQuestion.questionText}
          </h2>

          <RadioGroup 
            value={selectedOption || ""} 
            onValueChange={handleOptionSelect}
            className="grid gap-4 mt-2"
          >
            {Object.entries(currentQuestion.options).map(([key, text]) => {
              const isSelected = selectedOption === key;

              return (
                <div key={key} className="flex items-center space-x-3 group">
                  <RadioGroupItem 
                    value={key} 
                    id={`option-${key}`} 
                    className="h-5 w-5 border-2 border-primary/30 text-primary"
                  />
                  <Label
                    htmlFor={`option-${key}`}
                    className={cn(
                      "text-base md:text-lg font-medium cursor-pointer flex-1 py-1 transition-colors",
                      isSelected ? "text-primary font-bold" : "text-foreground"
                    )}
                  >
                    <span className="mr-2 opacity-50">{key}.</span>
                    {text}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-10 pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          size="lg"
          className="w-full h-14 rounded-2xl text-lg font-bold gap-2 shadow-md"
        >
          {currentStep === questions.length - 1 ? "Finish" : "Continue"}
          <ArrowRight className="h-5 w-5" />
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
