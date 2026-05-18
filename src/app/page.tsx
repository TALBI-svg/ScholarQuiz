"use client";

import { Button } from "@/components/ui/button";
import { Star, BookOpen, CheckCircle2, Trophy, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLoading } from "@/components/providers/LoadingProvider";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { setIsLoading } = useLoading();
  const router = useRouter();

  const handleStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6">
              <Star className="h-3 w-3 fill-current" />
              <span>#1 CONCOURS PREP PLATFORM</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-headline text-foreground leading-tight mb-6">
              Maîtrisez vos <span className="text-primary">Concours</span> avec ScholarQuiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Préparez-vous efficacement avec des quiz personnalisés, des simulations réelles et un suivi de performance intelligent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" onClick={handleStart}>
                <Button size="lg" className="h-14 px-10 rounded-2xl font-bold text-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Commencer maintenant <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/#features">
                <Button variant="outline" size="lg" className="h-14 px-10 rounded-2xl font-bold text-lg bg-card">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-card/50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-black text-primary">10k+</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Candidats</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-primary">50+</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Concours Corrigés</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-primary">95%</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Taux de Réussite</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-primary">24/7</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Accès Concours</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir ScholarQuiz?</h2>
            <p className="text-muted-foreground">Une approche moderne pour des résultats exceptionnels.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Rocket className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Apprentissage Rapide</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Notre algorithme identifie vos lacunes et vous propose les questions les plus pertinentes.
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Simulations Réelles</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Entraînez-vous dans les conditions réelles des concours avec notre système de chrono intégré.
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm hover:shadow-md transition-all group">
              <div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Corrections Détaillées</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comprenez vos erreurs grâce à des explications complètes pour chaque question.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-6">Prêt à réussir votre prochain concours?</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg">
            Rejoignez des milliers d'étudiants qui utilisent déjà notre plateforme pour atteindre leurs objectifs.
          </p>
          <Link href="/dashboard" onClick={handleStart}>
            <Button size="lg" variant="secondary" className="h-14 px-12 rounded-2xl font-black text-lg">
              Commencer Gratuitement
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Star className="text-primary-foreground h-4 w-4 fill-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-primary">ScholarQuiz</span>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">© 2026 ScholarQuiz. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Developed by <a href="https://talbi-svg.github.io/AbdelkaderTalbi.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">DevSphere</a>
            </p>
          </div>
          <div className="flex gap-6 text-sm font-bold text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
