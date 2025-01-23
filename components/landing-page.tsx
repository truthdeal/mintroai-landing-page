"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Brain, Code2, LinkIcon, Shield, Cpu, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = window.scrollY
      setScrollProgress((currentProgress / totalScroll) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      {/* Header */}
      <header
        className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 transition-all duration-300"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${Math.min(scrollProgress / 20, 0.9)})`,
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">SmartAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              {["features", "how-it-works", "testimonials", "FAQ"].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className="text-sm hover:text-primary transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(`#${section}`)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {section
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <Button className="bg-primary hover:bg-primary/90 relative overflow-hidden group" size="sm">
              <span className="relative z-10">Launch dApp</span>
              <span className="absolute inset-0 bg-white/20 transform translate-y-full transition-transform group-hover:translate-y-0" />
              <ExternalLink className="ml-2 h-4 w-4 relative z-10" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-[70vh] pt-16 pb-8 relative overflow-hidden flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent animate-gradient" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.2)_100%)]" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl"
            >
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" variant="outline">
                Powered by AI
              </Badge>
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold leading-tight md:leading-snug"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50 animate-gradient-x">
                    Create Smart Contracts
                  </span>
                  {" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-white">
                    with Artificial Intelligence
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-400 max-w-3xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Revolutionize your blockchain development with AI-powered smart contract generation. Secure, efficient,
                  and intelligent contract creation at your fingertips.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 transform transition-all hover:scale-105">
                    View Documentation
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white hover:bg-white/90 text-black border-white group relative overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="absolute inset-0 bg-primary transform translate-y-full group-hover:translate-y-0 transition-transform" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Image Section */}
            <motion.div 
              className="hidden lg:block relative h-[350px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/img.jpeg"
                  alt="AI Visualization"
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.8) contrast(1.2)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blockchain Networks Section */}
      <section className="pt-8 pb-20 bg-black/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Supported Blockchain Networks</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deploy your smart contracts across multiple leading blockchain networks
            </p>
          </div>
          <div className="relative">
            <div className="flex overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-8 items-center whitespace-nowrap"
              >
                {[...blockchains, ...blockchains].map((chain, index) => (
                  <div
                    key={`${chain.name}-${index}`}
                    className="flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary/50" />
                    <span className="text-lg font-semibold">{chain.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with blockchain technology to deliver a seamless smart contract
              creation experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Create and deploy smart contracts in minutes with our intuitive process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-5xl font-bold text-primary/20 mb-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-primary">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands of developers who trust our platform for their smart contract needs
            </p>
          </div>
          <Carousel className="max-w-xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <p className="text-gray-400 mb-4">{testimonial.content}</p>
                      <div className="flex items-center">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-3">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-gray-400">{testimonial.title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/20 to-primary/10 border-white/10">
            <CardContent className="p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-400 mb-8">
                  Join the future of smart contract development with AI-powered solutions.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Launch dApp
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="FAQ" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20">
              FAQ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about our AI-powered smart contract platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-white">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="w-8 h-8 text-primary" />
              <span className="font-bold text-xl">SmartAI</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Documentation
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SmartAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "AI-Powered Generation",
    description: "Leverage advanced AI models to automatically generate secure and efficient smart contracts.",
    icon: Brain,
  },
  {
    title: "Secure by Design",
    description:
      "Built-in security checks and best practices ensure your contracts are protected against vulnerabilities.",
    icon: Shield,
  },
  {
    title: "Custom Logic",
    description: "Easily implement complex business logic with our intuitive contract creation interface.",
    icon: Code2,
  },
  {
    title: "Cross-Chain Compatible",
    description: "Deploy your smart contracts across multiple blockchain networks with ease.",
    icon: LinkIcon,
  },
  {
    title: "Automated Auditing",
    description: "Continuous security analysis and optimization suggestions for your smart contracts.",
    icon: Cpu,
  },
  {
    title: "Version Control",
    description: "Track changes and manage different versions of your smart contracts efficiently.",
    icon: Code2,
  },
]

const steps = [
  {
    title: "Define Requirements",
    description: "Specify your smart contract requirements using natural language or our intuitive interface.",
  },
  {
    title: "AI Generation",
    description: "Our AI system generates optimal smart contract code based on your specifications.",
  },
  {
    title: "Deploy & Monitor",
    description: "Deploy your contracts with one click and monitor their performance in real-time.",
  },
]

const testimonials = [
  {
    content:
      "SmartAI has revolutionized how we create and deploy smart contracts. The AI-powered generation saves us countless hours of development time.",
    name: "Alex Thompson",
    title: "Blockchain Developer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    content:
      "The security features and automated auditing give us confidence in our smart contracts. It's an essential tool for modern blockchain development.",
    name: "Sarah Chen",
    title: "CTO, DeFi Solutions",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    content:
      "The platform's intuitive interface and powerful AI capabilities make it accessible for developers of all skill levels.",
    name: "Michael Rodriguez",
    title: "Smart Contract Engineer",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const blockchains = [
  { name: "Ethereum" },
  { name: "Arbitrum" },
  { name: "Blast" },
  { name: "Optimism" },
  { name: "Base" },
  { name: "Polygon" },
  { name: "Avalanche" },
  { name: "BNB Chain" },
]

const faqs = [
  {
    question: "What is SmartAI?",
    answer:
      "SmartAI is an AI-powered platform that enables developers to create, deploy, and manage smart contracts efficiently. Our platform uses advanced artificial intelligence to generate secure and optimized smart contract code based on your requirements.",
  },
  {
    question: "How does the AI smart contract generation work?",
    answer:
      "Our AI analyzes your requirements provided in natural language or through our interface, understands the intended functionality, and generates secure smart contract code following best practices. The AI is trained on thousands of audited smart contracts and continuously updated with the latest security patterns.",
  },
  {
    question: "Which blockchains are supported?",
    answer:
      "SmartAI supports all major EVM-compatible blockchains including Ethereum, Arbitrum, Blast, Optimism, Base, Polygon, Avalanche, and BNB Chain. We're continuously adding support for more blockchain networks.",
  },
  {
    question: "Is the generated code secure?",
    answer:
      "Yes, all generated smart contracts undergo rigorous security checks. Our AI is trained on security best practices and common vulnerabilities. Additionally, we provide automated auditing tools and recommend manual audits for high-value contracts.",
  },
  {
    question: "Can I customize the generated smart contracts?",
    answer:
      "Absolutely! While our AI generates the initial code, you have full control to modify and customize the smart contracts according to your specific needs. Our platform provides an intuitive interface for making changes while maintaining security.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer comprehensive support including detailed documentation, video tutorials, and a dedicated support team. Our community forum is also active with developers helping each other. Enterprise customers get access to priority support and consulting services.",
  },
]

