"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Standard",
    price: "₹2,999",
    description: "Ideal for data projects OR small business websites.",
    features: ["Data Analytics", "(OR)", "3-Page Modern Website", "SaaS Service", "SEO-Optimization"],
    popular: false
  },
  {
    name: "Professional",
    price: "₹9,999",
    description: "Complete digital infrastructure with AI automation.",
    features: ["Interactive Dashboard", "1-7 Pages Website", "AI-Chatbot Service", "SEO-Optimization", "Custom Domain Name"],
    popular: true
  },
  {
    name: "Agentic",
    price: "₹19,999",
    description: "Enterprise AI agents integrated with e-commerce.",
    features: ["AI Agent + Web Service", "Full E-Commerce Integration", "Advanced Automation", "Custom Logic", "Priority Support"],
    popular: false
  },
  {
    name: "Custom",
    price: "Varies",
    description: "Tailored services for complex scale and unique needs.",
    features: ["Custom Service", "Dedicated Environment", "Specialized AI Flow", "SLA & Compliance", "Technical Advisory"],
    popular: false
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-card/10">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-16">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            No hidden fees. Scale up or down as your business grows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative glass-card p-10 rounded-2xl flex flex-col text-left transition-all",
                plan.popular ? "border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-[0_0_45px_rgba(0,230,118,0.15)]" : "border-border"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-background font-black text-[10px] py-1 px-4 rounded-full uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <p className={cn("text-xs font-black uppercase tracking-widest mb-4", plan.popular ? "text-primary" : "text-muted-foreground")}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{plan.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => {
                  const isOR = feature === "(OR)"
                  return (
                    <div key={feature} className={cn("flex items-start gap-3 text-sm", isOR && "py-1")}>
                      {!isOR && <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
                      <span className={cn(
                        isOR 
                          ? "text-[10px] font-bold uppercase tracking-[0.2em] text-primary/80 pl-7" 
                          : "text-foreground/80"
                      )}>
                        {feature}
                      </span>
                    </div>
                  )
                })}
              </div>

              <Button
                asChild
                variant={plan.popular ? "default" : "outline"}
                className={cn(
                  "w-full rounded-full h-12 font-black transition-all",
                  plan.popular 
                    ? "bg-primary text-background hover:bg-secondary hover:text-background shadow-[0_0_20px_rgba(0,230,118,0.2)]" 
                    : "border-border hover:bg-primary hover:text-background transition-colors"
                )}
              >
                <Link href="#contact">
                  {plan.name === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
