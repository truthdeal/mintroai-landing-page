'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/public/logo-small.svg'

// Professional Navigation
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={Logo} alt="MintroAI" width={32} height={32} />
            <span className="text-lg font-medium tracking-tight">MintroAI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link href="#technology" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Technology
            </Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Features
            </Link>
            <Link href="#networks" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Networks
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Pricing
            </Link>
            <Link href="https://app.mintro.ai" className="text-sm font-medium px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Technical Circular Diagram
const TechnicalDiagram = () => {
  const [mounted, setMounted] = useState(false)
  const rotation = useMotionValue(0)
  
  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      rotation.set(rotation.get() + 0.2)
    }, 50)
    return () => clearInterval(interval)
  }, [rotation])

  if (!mounted) return null

  return (
    <div className="relative w-[500px] h-[500px]">
      {/* Outer rings */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <circle cx="250" cy="250" r="240" fill="none" stroke="#e5e5e5" strokeWidth="1" strokeDasharray="5 5" />
        <circle cx="250" cy="250" r="200" fill="none" stroke="#e5e5e5" strokeWidth="1" />
        <circle cx="250" cy="250" r="160" fill="none" stroke="#000" strokeWidth="2" strokeDasharray="10 5" />
      </motion.svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold">AI</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs uppercase tracking-wider text-gray-500">Smart Contracts</p>
          <p className="text-xs uppercase tracking-wider text-gray-500">Powered by AI</p>
        </div>
      </div>
      
      {/* Technical labels */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
        <span className="text-xs font-mono text-gray-400">GENERATION</span>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
        <span className="text-xs font-mono text-gray-400">DEPLOYMENT</span>
      </div>
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
        <span className="text-xs font-mono text-gray-400">SECURITY</span>
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
        <span className="text-xs font-mono text-gray-400">OPTIMIZATION</span>
      </div>
    </div>
  )
}

// Stats Counter
const StatsCounter = ({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prevCount) => {
          const increment = end / (duration * 50)
          const newCount = Math.min(prevCount + increment, end)
          if (newCount === end) clearInterval(timer)
          return newCount
        })
      }, 20)
      return () => clearInterval(timer)
    }
  }, [isInView, end, duration])

  return (
    <span ref={ref} className="font-mono">
      {Math.floor(count).toLocaleString()}{suffix}
    </span>
  )
}

// Feature Card with minimal design
const FeatureCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <div className="border border-gray-200 rounded-lg p-8 h-full hover:border-black transition-colors duration-300">
        <span className="text-xs font-mono text-gray-400">{number}</span>
        <h3 className="text-xl font-medium mt-4 mb-3">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

// Network Logo Grid
const NetworkGrid = () => {
  const networks = [
    { name: 'NEAR', logo: '/logos/near.svg' },
    { name: 'BNB Chain', logo: '/logos/bnb.svg' },
    { name: 'Arbitrum', logo: '/logos/arbitrum.svg' },
    { name: 'Optimism', logo: '/logos/optimism.svg' },
    { name: 'Soneium', logo: '/logos/soneium.png' },
    { name: 'HyperEVM', logo: '/logos/hyperevm.png' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-200">
      {networks.map((network, index) => (
        <motion.div
          key={network.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-8 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Image src={network.logo} alt={network.name} width={48} height={48} className="mb-3" />
          <span className="text-xs text-gray-600">{network.name}</span>
        </motion.div>
      ))}
    </div>
  )
}

// Pricing Table
const PricingTable = () => {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for testing and development',
      features: ['Test Networks Only', 'Unlimited Deployments', 'Basic Features', 'Community Support']
    },
    {
      name: 'Professional',
      price: '$99',
      description: 'For production-ready smart contracts',
      features: ['Mainnet Access', 'Advanced Features', 'Security Auditing', 'Email Support'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions for organizations',
      features: ['Custom Integration', 'Dedicated Support', 'SLA Guarantee', 'Training Included']
    }
  ]

  return (
    <div className="grid md:grid-cols-3 gap-px bg-gray-200">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-white p-8 ${plan.recommended ? 'ring-2 ring-black' : ''}`}
        >
          {plan.recommended && (
            <span className="text-xs font-mono uppercase tracking-wider">Recommended</span>
          )}
          <h3 className="text-2xl font-medium mt-4">{plan.price}</h3>
          <p className="text-sm text-gray-600 mt-2">{plan.name}</p>
          <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
          <ul className="mt-8 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className={`w-full mt-8 py-3 text-sm font-medium rounded-full transition-colors ${
            plan.recommended 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'border border-gray-300 hover:border-black'
          }`}>
            Get Started
          </button>
        </div>
      ))}
    </div>
  )
}

export function ProfessionalLanding() {
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
        
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-light leading-tight">
                Intelligent
                <span className="block font-normal">Smart Contract</span>
                <span className="block text-gray-400">Generation</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
                Deploy secure, optimized smart contracts across multiple blockchain networks using advanced AI technology.
              </p>
              <div className="flex items-center gap-4 mt-10">
                <Link href="/waitlist">
                  <button className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
                    Join Waitlist
                  </button>
                </Link>
                <Link href="https://app.mintro.ai">
                  <button className="px-8 py-3 border border-gray-300 text-sm font-medium rounded-full hover:border-black transition-colors">
                    Try Demo
                  </button>
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-12">
                <div>
                  <p className="text-2xl font-light"><StatsCounter end={50000} suffix="+" /></p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Contracts Deployed</p>
                </div>
                <div className="w-px h-12 bg-gray-200" />
                <div>
                  <p className="text-2xl font-light"><StatsCounter end={99.9} duration={3} suffix="%" /></p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Security Score</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block"
            >
              <TechnicalDiagram />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-mono text-gray-400">[ scroll down ]</span>
        </motion.div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Technology</span>
            <h2 className="text-4xl font-light mt-4">
              Advanced AI-Powered
              <span className="block text-gray-400">Contract Generation</span>
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Our proprietary AI models analyze millions of smart contracts to generate secure, 
              gas-efficient code tailored to your specific requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              number="01"
              title="Natural Language Processing"
              description="Describe your contract requirements in plain English. Our AI understands context and intent to generate precise Solidity code."
            />
            <FeatureCard
              number="02"
              title="Security-First Architecture"
              description="Built-in vulnerability scanning and automated testing ensure your contracts are protected against common attack vectors."
            />
            <FeatureCard
              number="03"
              title="Gas Optimization"
              description="Intelligent code optimization reduces gas costs by up to 40% compared to manually written contracts."
            />
            <FeatureCard
              number="04"
              title="Cross-Chain Compatibility"
              description="Deploy seamlessly across EVM and non-EVM chains with automatic contract adaptation."
            />
            <FeatureCard
              number="05"
              title="Real-Time Auditing"
              description="Continuous monitoring and automated security updates protect your deployed contracts."
            />
            <FeatureCard
              number="06"
              title="Version Control"
              description="Complete deployment history with rollback capabilities and upgrade patterns built-in."
            />
          </div>
        </div>
      </section>

      {/* Networks Section */}
      <section id="networks" className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Networks</span>
            <h2 className="text-4xl font-light mt-4">Multi-Chain Support</h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Deploy your smart contracts across leading blockchain networks with one-click deployment.
            </p>
          </div>
          <div className="mt-16">
            <NetworkGrid />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <p className="text-4xl font-light"><StatsCounter end={247} suffix="K+" /></p>
              <p className="text-xs uppercase tracking-wider mt-2 text-gray-400">Total Users</p>
            </div>
            <div>
              <p className="text-4xl font-light">$<StatsCounter end={2.3} duration={3} suffix="M+" /></p>
              <p className="text-xs uppercase tracking-wider mt-2 text-gray-400">Value Locked</p>
            </div>
            <div>
              <p className="text-4xl font-light"><StatsCounter end={15} suffix="+" /></p>
              <p className="text-xs uppercase tracking-wider mt-2 text-gray-400">Blockchains</p>
            </div>
            <div>
              <p className="text-4xl font-light"><StatsCounter end={99.97} duration={3} suffix="%" /></p>
              <p className="text-xs uppercase tracking-wider mt-2 text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Process</span>
            <h2 className="text-4xl font-light mt-4">How It Works</h2>
          </div>

          <div className="mt-16 space-y-px bg-gray-200">
            {[
              { step: '01', title: 'Define Requirements', description: 'Describe your smart contract needs using natural language or select from templates.' },
              { step: '02', title: 'AI Generation', description: 'Our AI analyzes your requirements and generates optimized, secure smart contract code.' },
              { step: '03', title: 'Review & Customize', description: 'Review the generated code, make adjustments, and run automated security tests.' },
              { step: '04', title: 'Deploy & Monitor', description: 'Deploy to your chosen blockchain network and monitor performance in real-time.' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 flex items-start gap-8"
              >
                <span className="text-xs font-mono text-gray-400">{item.step}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl font-light mt-4">Simple, Transparent Pricing</h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Choose the plan that fits your needs. All plans include core features and security updates.
            </p>
          </div>
          <div className="mt-16">
            <PricingTable />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-light">Ready to Build?</h2>
          <p className="mt-6 text-gray-400 text-lg">
            Join thousands of developers using AI to create secure smart contracts.
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <Link href="/waitlist">
              <button className="px-8 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-colors">
                Get Early Access
              </button>
            </Link>
            <Link href="https://docs.mintro.ai">
              <button className="px-8 py-3 border border-gray-700 text-sm font-medium rounded-full hover:border-white transition-colors">
                View Documentation
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image src={Logo} alt="MintroAI" width={24} height={24} />
                <span className="font-medium">MintroAI</span>
              </Link>
              <p className="text-sm text-gray-600 mt-4">
                AI-powered smart contract generation platform.
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Features</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">About</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Blog</Link></li>
                <li><Link href="#" className="text-sm text-gray-600 hover:text-black">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-gray-500">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="https://twitter.com/mintroai" className="text-sm text-gray-600 hover:text-black">Twitter</Link></li>
                <li><Link href="https://github.com/mintroai" className="text-sm text-gray-600 hover:text-black">GitHub</Link></li>
                <li><Link href="mailto:contact@mintro.ai" className="text-sm text-gray-600 hover:text-black">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">© 2024 MintroAI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-gray-500 hover:text-black">Privacy</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-black">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}