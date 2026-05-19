import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';

/**
 * CONFIGURATION POUR GITHUB PAGES
 * --------------------------------
 * Votre dépôt est 'ScholarQuiz' servi sous :
 * https://talbi-svg.github.io/ScholarQuiz/
 */
const repoName = '/ScholarQuiz'; 

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Le basePath et l'assetPrefix doivent correspondre pour que le CSS se charge
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? `${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? repoName : '',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;