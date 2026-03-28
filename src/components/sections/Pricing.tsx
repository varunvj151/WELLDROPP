"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Basic",
    price: "₹2,999",
    description: "For solo founders and micro-businesses testing AI automation.",
    features: ["1 Chatbot Integration", "Telegram or Email Bot", "2,000 AI interactions/mo", "Basic Analytics", "Email Support"],
    popular: false
  },
  {
    name: "Starter",
    price: "₹9,999",
    description: "For small businesses ready to automate support and operations.",
    features: ["2 AI Agents", "Telegram + Email Bot", "Customer Care Chatbot", "15,000 AI interactions/mo", "Priority Email Support"],
    popular: false
  },
  {
    name: "Growth",
    price: "₹29,999",
    description: "For scaling companies that need serious AI infrastructure.",
    features: ["5 AI Agents (custom)", "Full E-Commerce Platform", "Advanced Dashboard", "50,000 AI interactions/mo", "Website Builder Access", "24/7 Priority Support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Full-suite AI with ML research, custom models, and dedicated team.",
    features: ["Unlimited AI Agents", "Custom ML/DL Models", "Dedicated Infrastructure", "Unlimited interactions", "On-call Engineering Team", "SLA & Compliance"],
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
                  {plan.price !== "Custom" && <span className="text-muted-foreground text-sm">/mo</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </div>
                ))}
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
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
