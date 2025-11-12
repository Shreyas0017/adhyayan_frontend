import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs"
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ===== AMPLIFY OPTIMIZATION =====
  output: 'standalone', // Required for Amplify
  
  // ===== STYLED COMPONENTS =====
  compiler: {
    styledComponents: true,
  },
  
  // ===== IMAGE OPTIMIZATION =====
  images: {
    unoptimized: true, // Required for Amplify (no image optimization service)
    domains: [
      'lh3.googleusercontent.com', // Google OAuth avatars
      'firebasestorage.googleapis.com', // Firebase Storage
      'avatars.githubusercontent.com', // GitHub avatars
    ],
  },
  
  // ===== BUILD SETTINGS =====
  eslint: {
    ignoreDuringBuilds: true, // Keep your setting
  },
  typescript: {
    ignoreBuildErrors: true, // Keep your setting - but fix before production!
  },
  
  // ===== ENVIRONMENT VARIABLES =====
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  
  // ===== EXPERIMENTAL (for better performance) =====
  experimental: {
    optimizePackageImports: [
      '@heroui/react',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      'framer-motion',
      'lucide-react',
      '@xyflow/react',
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "937a64d7-2299-4dac-9620-5e2614ad615b",
  oauthServer: process.env.NEXT_PUBLIC_AUTH_SERVER || 'https://auth.civic.com/oauth',
  // @ts-ignore - endpoints is valid at runtime but not in types
  endpoints: { 
    wallet: process.env.NEXT_PUBLIC_WALLET_API_BASE_URL 
  }
});

export default withCivicAuth(nextConfig);