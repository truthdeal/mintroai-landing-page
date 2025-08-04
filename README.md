# MintroAI - AI-Powered Smart Contract Platform

A modern web application for creating and deploying smart contracts using artificial intelligence. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- AI-powered smart contract generation
- Support for multiple blockchain networks
- Secure by design with automated auditing
- Modern, responsive UI
- Cross-chain compatibility

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/smartai.git
cd smartai
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

### Acceptance Tests

This project uses Cucumber + Playwright for acceptance testing with BDD (Behavior Driven Development) approach.

#### Running Acceptance Tests

```bash
# Run all acceptance tests
npm run test:acceptance

# Run tests with UI
npm run test:ui

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

#### Test Structure

```
tests/acceptance/
├── features/          # Gherkin feature files
│   ├── landing_core.feature
│   └── landing_visual_seo.feature
├── steps/            # Step definitions
│   └── landing.steps.ts
└── support/          # Test hooks
    └── hooks.ts
```

#### Writing Tests

Tests are written in Gherkin syntax focusing on user behavior:

```gherkin
Feature: Landing page functionality

Scenario: User can navigate to sections
  When I navigate to "/"
  And I click the navigation link "Features"
  Then I should see the section "features"
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Playwright (Testing)
- Cucumber (BDD)

## License

MIT License - See LICENSE file for details
