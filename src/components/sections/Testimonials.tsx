"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    quote: "Welldropp's Telegram bot transformed our customer service. Response time dropped from 6 hours to under 30 seconds. Absolutely wild ROI.",
    author: "Ravi Kumar",
    role: "CEO, RetailPlus India",
    initials: "RK"
  },
  {
    quote: "The e-commerce platform they built is rock solid. AI recommendations alone increased our average order value by 34% in the first month.",
    author: "Sneha Mehta",
    role: "Founder, StyleKart",
    initials: "SM"
  },
  {
    quote: "Their agentic AI system runs our entire onboarding pipeline autonomously. We went from 3 staff doing manual work to zero. Game changer.",
    author: "Arjun Pillai",
    role: "CTO, NexaFlow SaaS",
    initials: "AP"
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-card/5">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">What Clients Say</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Results that speak<br />for themselves.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.author} className="glass-card p-10 rounded-[2rem] flex flex-col hover:border-primary/30 transition-all">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-base font-medium italic text-foreground/90 leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-black text-sm">{t.author}</div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
