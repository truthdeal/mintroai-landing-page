"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
//import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Brain, Code2, LinkIcon, Shield, Cpu, ChevronRight, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Logo from "@/public/logo-small.svg";
import Alex from "@/public/testimonials/alex.jpeg";
import Sarah from "@/public/testimonials/sarah.jpeg";
import Michael from "@/public/testimonials/michael.jpeg";

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
        <Link href="/" className="flex items-center space-x-1">
          <Image src={Logo} alt="MintroAI logo" width={30} height={30} />
          <span className="font-medium tracking-tight text-xl">MintroAI</span>
        </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              {["features", "how-it-works", "testimonials", "FAQ"].map((section) => (
                <Link
                  key={section}
                  href={`#${section}`}
                  className="text-sm font-[450] tracking-wider text-white/90 hover:text-white transition-colors relative group"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(`#${section}`)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {section
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/40 transition-all group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <Button className="bg-primary/90 hover:bg-primary relative overflow-hidden group font-[450] tracking-wider" size="sm" onClick={() => window.open(process.env.NEXT_PUBLIC_DAPP_URL, '_blank')}>
              <span className="relative z-10">Launch dApp</span>
              <span className="absolute inset-0 bg-white/10 transform translate-y-full transition-transform group-hover:translate-y-0" />
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
              {/* <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm" variant="outline">
                Powered by AI
              </Badge> */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-7xl font-light tracking-tighter leading-tight md:leading-snug"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/50 animate-gradient-x">
                    Create Smart Contracts
                  </span>
                  {" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary/80 to-white font-light">
                    with Artificial Intelligence
                  </span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-400 max-w-3xl font-normal tracking-wide"
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
                  <Link href="/waitlist" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 transform transition-all hover:scale-105 font-bold">
                      Join Waitlist
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white hover:bg-white/90 text-black border-white group relative overflow-hidden"
                    onClick={() => window.open(process.env.NEXT_PUBLIC_DAPP_URL, '_blank')}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors">
                      Launch dApp
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
                  src="/img2.jpeg"
                  alt="AI Visualization"
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.8) contrast(1.2)' }}
                />
                {/* Gradient overlay for right-to-left fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blockchain Networks Section */}
      <section className="pt-8 pb-20 bg-black/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4">Supported Blockchain Networks</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
              Deploy your smart contracts across multiple leading blockchain networks
            </p>
          </div>
          <div className="relative">
            <div className="flex overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="flex gap-6 items-center whitespace-nowrap"
              >
                {[...blockchains, ...blockchains].map((chain, index) => (
                  <div
                    key={`${chain.name}-${index}`}
                    className="flex items-center gap-4 bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group"
                  >
                    <div className="relative w-6 h-6 rounded-lg overflow-hidden">
                      <Image
                        src={chain.logo}
                        alt={`${chain.name} logo`}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="text-base font-[450] text-neutral-300 group-hover:text-white transition-colors">{chain.name}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="absolute inset-y-0 left-0 w-[200px] bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-[200px] bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20 font-normal">
              Features
            </Badge> */}
            <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4">Powered by Advanced Technology</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
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
                <Card className="bg-indigo-950/20 border-indigo-500/10 hover:border-indigo-500/30 hover:bg-indigo-950/30 transition-colors">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-violet-400 mb-4" />
                    <h3 className="text-xl font-[450] tracking-tight mb-2 text-neutral-200">{feature.title}</h3>
                    <p className="text-neutral-400 font-[350] tracking-wide">{feature.description}</p>
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
            {/* <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20 font-normal">
              Process
            </Badge> */}
            <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
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
                <Card className="bg-white/[0.02] border-white/5">
                  <CardContent className="p-6">
                    <div className="text-5xl font-[450] tracking-tighter text-violet-400 mb-4">
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-[450] tracking-tight mb-2 text-neutral-200">{step.title}</h3>
                    <p className="text-neutral-400 font-[350] tracking-wide">{step.description}</p>
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
            {/* <Badge variant="outline" className="mb-4 bg-white/10 text-white hover:bg-white/20 font-normal">
              Testimonials
            </Badge> */}
            <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-normal tracking-wide">
              Join thousands of developers who trust our platform for their smart contract needs
            </p>
          </div>
          <Carousel className="max-w-xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-white/[0.02] border-white/5">
                    <CardContent className="p-6">
                      <p className="text-neutral-400 mb-4">{testimonial.content}</p>
                      <div className="flex items-center">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-3">
                          <div className="font-[450] text-neutral-200">{testimonial.name}</div>
                          <div className="text-sm text-neutral-400">{testimonial.title}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="bg-white/10 hover:bg-white/20 border-white/20" />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-indigo-950/30 border-indigo-500/20 hover:bg-indigo-950/40 transition-colors">
            <CardContent className="p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-[450] tracking-tighter mb-4 text-white">Ready to Get Started?</h2>
                <p className="text-white/80 mb-8 font-[350] tracking-wide">
                  Join the future of smart contract development with AI-powered solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/waitlist">
                    <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transform transition-all hover:scale-105 shadow-lg hover:shadow-violet-500/25">
                      Join Waitlist
                      <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" className="bg-primary/90 hover:bg-primary/90 transform transition-all hover:scale-105" onClick={() => window.open(process.env.NEXT_PUBLIC_DAPP_URL, '_blank')}>
                    Launch dApp
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="FAQ" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-[450] tracking-tighter mb-4">Frequently Asked Questions</h2>
            <p className="text-white/80 max-w-2xl mx-auto font-[350] tracking-wide">
              Everything you need to know about our AI-powered smart contract platform
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white/[0.02] border-white/5 rounded-lg px-4">
                  <AccordionTrigger className="text-left text-neutral-200 font-[450] tracking-wide hover:text-white/90">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-neutral-400 font-[350] tracking-wide">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="mb-6 md:mb-0 flex items-center gap-8">
              <div className="flex items-center space-x-1">
                <Image src={Logo} alt="MintroAI logo" width={30} height={30} />
                <span className="font-bold text-xl">MintroAI</span>
              </div>
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <Link 
                  href="https://x.com/MintroAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter/X"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://github.com/mintroai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/mintroai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link 
                  href="https://www.instagram.com/mintroai/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                  </svg>
                </Link>
                <Link 
                  href="https://t.me/MintroAI" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </Link>
              </div>
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
              <Link href="mailto:contact@mintro.ai" className="text-sm text-gray-400 hover:text-primary">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} MintroAI. All rights reserved.
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
    title: "Conversational No-Code Builder",
    description: "Describe what you want in natural language; MintroAI populates every field and writes the Solidity for you.",
    icon: Sparkles,
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
      "MintroAI has revolutionized how we create and deploy smart contracts. The AI-powered generation saves us countless hours of development time.",
    name: "Alex Thompson",
    title: "Blockchain Developer",
    avatar: Alex,
  },
  {
    content:
      "The security features and automated auditing give us confidence in our smart contracts. It's an essential tool for modern blockchain development.",
    name: "Sarah Chen",
    title: "CTO, DeFi Solutions",
    avatar: Sarah,
  },
  {
    content:
      "The platform's intuitive interface and powerful AI capabilities make it accessible for developers of all skill levels.",
    name: "Michael Rodriguez",
    title: "Smart Contract Engineer",
    avatar: Michael,
  },
]

const blockchains = [
  { name: "Arbitrum", logo: "/logos/arbitrum.svg" },
  { name: "NEAR Protocol", logo: "/logos/near.svg" },
  { name: "BNB Chain", logo: "/logos/bnb.svg" },
  { name: "HyperEVM", logo: "/logos/hyperevm.png" },
  { name: "Soneium", logo: "/logos/soneium.png" },
  { name: "Optimism", logo: "/logos/optimism.svg" },
  { name: "Arbitrum Sepolia", logo: "/logos/arbitrum.svg" },
  { name: "NEAR Testnet", logo: "/logos/near.svg" },
  { name: "BNB Testnet", logo: "/logos/bnb.svg" },
]

const faqs = [
  {
    question: "What is MintroAI?",
    answer:
      "MintroAI is an AI-powered platform that enables developers to create, deploy, and manage smart contracts efficiently. Our platform uses advanced artificial intelligence to generate secure and optimized smart contract code based on your requirements.",
  },
  {
    question: "How does the AI smart contract generation work?",
    answer:
      "Our AI analyzes your requirements provided in natural language or through our interface, understands the intended functionality, and generates secure smart contract code following best practices. The AI is trained on thousands of audited smart contracts and continuously updated with the latest security patterns.",
  },
  {
    question: "Which blockchains are supported?",
    answer:
      "MintroAI supports major EVM-compatible blockchains including Arbitrum, Arbitrum Sepolia, BNB Chain, BNB Testnet, HyperEVM, Soneium and using chain signatures with NEAR Protocol, and NEAR Testnet. We're continuously adding support for more blockchain networks.",
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

