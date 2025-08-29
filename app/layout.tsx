import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/google-analytics";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MintroAI - AI-Powered Token Creation, Vesting & Cross-Chain Smart Contracts",
  description: "Create ERC20 tokens, manage vesting schedules, deploy cross-chain smart contracts with AI. Features NEAR chain signatures, onchain AI by ChainGPT, vesting dashboards, and multi-chain deployment across Ethereum, Base, Arbitrum, Polygon, BNB, Avalanche, NEAR Protocol and more.",
  metadataBase: new URL('https://mintro.ai'),
  keywords: [
    'ERC20 token creation',
    'token vesting platform',
    'vesting dashboard',
    'claim dashboard',
    'smart contract generator',
    'AI smart contracts',
    'ChainGPT integration',
    'NEAR Protocol',
    'NEAR chain signatures',
    'cross-chain deployment',
    'multi-chain smart contracts',
    'no-code token creation',
    'DeFi vesting',
    'token unlock schedule',
    'Ethereum smart contracts',
    'Base blockchain',
    'Arbitrum',
    'Polygon',
    'BNB Smart Chain',
    'Avalanche',
    'Optimism',
    'Blast',
    'HyperEVM',
    'Web3 AI tools',
    'onchain AI',
    'blockchain automation',
    'token management platform',
    'decentralized vesting',
    'cross-chain bridge',
    'EVM compatible chains',
    'solidity AI generator',
    'smart contract audit',
    'token distribution',
    'cliff vesting',
    'linear vesting',
    'tokenomics dashboard'
  ],
  authors: [{ name: 'MintroAI Team' }],
  creator: 'MintroAI',
  publisher: 'MintroAI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-hq.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon-hq.svg',
        color: '#6366F1',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mintro.ai',
    siteName: 'MintroAI',
    title: 'MintroAI - AI Token Creation, Vesting & Cross-Chain Smart Contracts',
    description: 'Create ERC20 tokens, manage vesting schedules, deploy cross-chain smart contracts with AI. Features NEAR chain signatures, onchain AI, and multi-chain deployment.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MintroAI - AI-Powered Token Creation & Vesting Platform for Web3',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MintroAI - AI Token Creation & Vesting Platform',
    description: 'Create ERC20 tokens, manage vesting, deploy cross-chain smart contracts with AI. Supporting 10+ blockchains.',
    images: ['/og-image.png'],
    creator: '@mintroai',
  },
  alternates: {
    canonical: 'https://mintro.ai',
  },
  verification: {
    google: undefined,
    yandex: undefined,
    yahoo: undefined,
    other: {},
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'MintroAI',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description: 'AI-powered platform for creating ERC20 tokens, managing vesting schedules, and deploying cross-chain smart contracts',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
    },
    author: {
      '@type': 'Organization',
      name: 'MintroAI',
      url: 'https://mintro.ai',
    },
    featureList: [
      'ERC20 Token Creation',
      'Token Vesting Management',
      'Cross-Chain Deployment',
      'NEAR Chain Signatures',
      'ChainGPT AI Integration',
      'Vesting Dashboard',
      'Claim Dashboard',
      'Multi-Chain Support',
      'No-Code Smart Contracts',
      'Automated Token Distribution',
    ],
    screenshot: 'https://mintro.ai/og-image.png',
    softwareVersion: '2.0',
    url: 'https://mintro.ai',
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
