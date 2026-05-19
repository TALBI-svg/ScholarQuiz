# ScholarQuiz 🎓

ScholarQuiz est une plateforme moderne et intuitive dédiée à la préparation des concours. Elle combine des outils d'intelligence artificielle avec une expérience utilisateur fluide pour aider les candidats à réussir leurs examens.

## 🚀 Fonctionnalités Clés

- **Double Mode d'Entraînement** :
  - **Mode Préparation** : Apprentissage interactif avec feedback immédiat et explications détaillées après chaque question.
  - **Mode Examen** : Simulation des conditions réelles de concours sans feedback jusqu'à la fin de la session.
- **Banque de Concours Réels** : Accès à des archives de concours réels (ex: Ministère de la Justice).
- **Tableau de Bord Intuitif** : Recherche et filtrage facile par catégories de concours.
- **Design Mobile-First** : Interface responsive optimisée pour une utilisation sur smartphone, tablette et ordinateur.
- **Suivi de Performance** : Analyse des résultats avec score détaillé (pourcentage, réponses correctes vs incorrectes).

## 🛠️ Stack Technique

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Style** : [Tailwind CSS](https://tailwindcss.com/)
- **Composants UI** : [Shadcn/UI](https://ui.shadcn.com/) (Radix UI)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **IA** : [Genkit](https://firebase.google.com/docs/genkit) & [Google Gemini AI](https://aistudio.google.com/app/apikey)
- **Icônes** : [Lucide React](https://lucide.dev/)

## 📦 Installation et Lancement

1. **Cloner le projet** :
   ```bash
   git clone <votre-repo-url>
   cd scholar-quiz
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env.local` à la racine et ajoutez votre clé API Google :
   ```env
   GOOGLE_GENAI_API_KEY=votre_cle_api_ici
   ```

4. **Lancer en mode développement** :
   ```bash
   npm run dev
   ```
   L'application sera disponible sur `http://localhost:9002`.

## 🚢 Déploiement

Le projet est configuré pour un déploiement automatique sur **GitHub Pages** via GitHub Actions.

- **Build Statis** : Le projet utilise `output: 'export'` pour générer des fichiers statiques.
- **Chemins des Assets** : Utilisation d'un helper `getAssetPath` pour garantir que les images et fichiers dans `public/` fonctionnent correctement avec le `basePath` de GitHub Pages.
- **Workflow** : Toute modification poussée sur la branche `main` déclenche automatiquement le déploiement.

*Note : Les fonctionnalités d'IA nécessitent un environnement serveur. En mode statique (GitHub Pages), l'application utilise les concours locaux et les fallbacks.*

---

Développé avec ❤️ par [DevSphere](https://talbi-svg.github.io/AbdelkaderTalbi.github.io/)
