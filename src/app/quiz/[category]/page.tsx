
import { QuizSession } from "@/components/quiz/QuizSession";

export async function generateStaticParams() {
  const categories = ["07-01-2024", "29-09-2024", "history", "biology", "literature", "chemistry", "dev", "math"];
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function QuizPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  return <QuizSession category={category} />;
}
