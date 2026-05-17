
import { QuizSession } from "@/components/quiz/QuizSession";

export default async function QuizPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  return <QuizSession category={category} />;
}
