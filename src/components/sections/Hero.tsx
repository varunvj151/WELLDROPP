"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden text-center bg-background">
      <div className="absolute inset-0 z-0 hero-grid pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[300px] md:max-w-[700px] h-[300px] md:h-[400px] hero-glow pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-secondary text-[11px] md:text-sm font-black mb-8 animate-fade-in-up uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-primary animate-blink" />
          Agentic AI Solutions for Modern Business
        </div>

        <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.95] animate-fade-in-up [animation-delay:150ms]">
          Drop Smarter.<br />
          <span className="text-primary">Scale</span> <span className="text-secondary">Faster.</span>
        </h1>

        <p className="max-w-xl mx-auto text-base md:text-lg text-muted-foreground mb-12 animate-fade-in-up [animation-delay:300ms] px-4">
          Welldropp delivers precision AI — from autonomous agents and customer support bots to full e-commerce platforms and ML research. One partner, infinite scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 animate-fade-in-up [animation-delay:450ms]">
          <Button asChild size="lg" className="h-14 w-full sm:w-auto px-10 rounded-full text-lg font-black bg-primary text-background hover:bg-secondary shadow-[0_0_28px_rgba(0,230,118,0.3)] hover:translate-y-[-2px] transition-all">
            <Link href="#services">Explore Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 w-full sm:w-auto px-10 rounded-full text-lg font-bold border-border hover:bg-primary hover:text-background transition-all">
            <Link href="#contact">Talk to Us</Link>
          </Button>
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-24 animate-fade-in-up [animation-delay:600ms]">
          {[
            { label: "AI Services", value: "7+" },
            { label: "Support Runtime", value: "24/7" },
            { label: "Scale Potential", value: "∞" },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-[120px]">
              <div className="text-3xl md:text-5xl font-black text-primary leading-none mb-2">{stat.value}</div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
