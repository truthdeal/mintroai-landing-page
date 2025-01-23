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
              {["features", "how-it-works", "testimonials"].map((section) => (
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <Badge className="mb-4" variant="outline">
              Powered by AI
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/50">
              Create Smart Contracts with Artificial Intelligence
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Revolutionize your blockchain development with AI-powered smart contract generation. Secure, efficient,
              and intelligent contract creation at your fingertips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Documentation
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 aspect-square hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/img.jpeg"
              alt="AI Visualization"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
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
            <Badge variant="outline" className="mb-4">
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
            <Badge variant="outline" className="mb-4">
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

