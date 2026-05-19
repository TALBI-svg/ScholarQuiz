"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Home, RefreshCw, Loader2, Clock, ChevronRight, BookOpen, GraduationCap, CheckCircle2, XCircle } from "lucide-react";
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

type QuizMode = "prepare" | "test";

export function QuizSession({ category }: QuizSessionProps) {
  const { setIsLoading } = useLoading();
  const [questions, setQuestions] = useState<GeneratePracticeQuestionsOutput>([]);
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

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
    if (!quizMode) return;

    const unsubscribe = timerService.subscribe((seconds) => {
      setTimeLeft(seconds);
    });

    return () => {
      unsubscribe();
      timerService.stop();
    };
  }, [quizMode]);

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
      
      setLoading(false);
    }
    loadQuiz();
  }, [category]);

  const startQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    timerService.start();
  };

  const handleOptionSelect = (option: string) => {
    if (quizMode === "prepare" && isAnswerSubmitted) return;
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    if (quizMode === "prepare" && !isAnswerSubmitted) {
      setIsAnswerSubmitted(true);
      if (selectedOption === questions[currentStep].correctAnswer) {
        setScore((prev) => prev + 1);
      }
      return;
    }

    // In test mode, we just increment score silently
    if (quizMode === "test" && selectedOption === questions[currentStep].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
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

  if (!quizMode && !quizComplete) {
    return (
      <div className="flex flex-col gap-8 p-6 max-w-2xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-2">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold">Choisissez votre mode d'entraînement</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Sélectionnez le mode qui correspond le mieux à votre étape actuelle de préparation.
          </p>
        </div>

        <div className="grid gap-6 mt-4">
          <button 
            onClick={() => startQuiz("prepare")}
            className="flex items-start gap-6 p-6 rounded-[2rem] bg-card border-2 border-transparent hover:border-primary/20 transition-all text-left group"
          >
            <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <BookOpen className="h-7 w-7 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Mode Préparation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Apprenez au fur et à mesure. Recevez un feedback immédiat après chaque question pour comprendre vos erreurs.
              </p>
              <div className="pt-2 flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                Recommandé pour apprendre <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </button>

          <button 
            onClick={() => startQuiz("test")}
            className="flex items-start gap-6 p-6 rounded-[2rem] bg-card border-2 border-transparent hover:border-primary/20 transition-all text-left group"
          >
            <div className="h-14 w-14 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Clock className="h-7 w-7 text-purple-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Mode Examen</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Simulez les conditions réelles du concours. Pas de feedback jusqu'à la fin de la session.
              </p>
              <div className="pt-2 flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wider">
                Simuler le concours <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </button>
        </div>

        <div className="pt-8 text-center">
          <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
            ← Retour au Dashboard
          </Link>
        </div>
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
            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold ml-2 text-[10px]">
              {quizMode === "prepare" ? "PRÉPARATION" : "TEST"}
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
            className="grid gap-1.5 mt-2"
          >
            {Object.entries(currentQuestion.options).map(([key, text]) => {
              const isSelected = selectedOption === key;
              const isCorrect = key === currentQuestion.correctAnswer;
              const showResult = quizMode === "prepare" && isAnswerSubmitted;

              return (
                <div 
                  key={key} 
                  className={cn(
                    "flex items-center space-x-3 group p-1 transition-all rounded-lg",
                    showResult && isCorrect && "bg-green-50 border border-green-200",
                    showResult && isSelected && !isCorrect && "bg-red-50 border border-red-200",
                    !showResult && "hover:bg-primary/5"
                  )}
                >
                  <RadioGroupItem 
                    value={key} 
                    id={`option-${key}`} 
                    disabled={showResult}
                    className={cn(
                      "h-5 w-5 border-2 transition-colors",
                      showResult && isCorrect && "border-green-500 text-green-500",
                      showResult && isSelected && !isCorrect && "border-red-500 text-red-500",
                      !showResult && "border-primary/30 text-primary group-hover:border-primary"
                    )}
                  />
                  <Label
                    htmlFor={`option-${key}`}
                    className={cn(
                      "text-sm md:text-base font-light cursor-pointer flex-1 py-0.5 transition-colors flex items-center justify-between",
                      showResult && isCorrect && "text-green-700 font-medium",
                      showResult && isSelected && !isCorrect && "text-red-700 font-medium",
                      !showResult && isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                    )}
                  >
                    <span>
                      <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">{key}.</span>
                      {text}
                    </span>
                    {showResult && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
                    {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          {quizMode === "prepare" && isAnswerSubmitted && currentQuestion.explanation && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-primary/5 border border-primary/10"
            >
              <h4 className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">Explication</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto pt-10 pb-8">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          size="lg"
          className="w-full h-14 rounded-2xl text-lg font-bold gap-2 shadow-md"
        >
          {quizMode === "prepare" && !isAnswerSubmitted ? "Vérifier la réponse" : (currentStep === questions.length - 1 ? "Terminer" : "Continuer")}
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
