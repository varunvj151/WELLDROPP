"use client"

import Link from "next/link"
import * as React from "react"
import { Logo } from "@/components/ui/Logo"
import { MsmeLogo } from "@/components/ui/MsmeLogo"

export function Footer() {
  const [year, setYear] = React.useState<number | null>(null)

  React.useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo size="md" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
              Drop Smarter. Scale Faster. — AI solutions precisely engineered for modern businesses. From agents to e-commerce, we build it all.
            </p>
            
            {/* MSME Credential Badge */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 max-w-sm hover:border-primary/30 hover:bg-white/10 transition-all duration-300 group">
              <div className="relative flex-shrink-0 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <MsmeLogo size={52} className="relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-primary font-black uppercase tracking-widest text-[9px] block mb-1">Government Registered</span>
                <p className="text-[11px] text-muted-foreground font-semibold leading-snug group-hover:text-foreground transition-colors">
                  <strong className="text-foreground">Welldropp</strong> is a certified MSME (Udyam) enterprise.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-foreground mb-6">Services</h4>
            <ul className="space-y-4 text-sm font-semibold text-muted-foreground">
              <li><Link href="#services" className="hover:text-primary transition-colors">Agentic AI</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Telegram Bots</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Chatbots</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">E-Commerce</Link></li>
              <li><Link href="#services" className="hover:text-primary transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-foreground mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-semibold text-muted-foreground">
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#research" className="hover:text-primary transition-colors">Research Lab</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#works" className="hover:text-primary transition-colors">Our Work</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-foreground mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold text-muted-foreground flex flex-col items-start">
              <li><Link href="/privacy-policy" className="hover:text-primary focus-visible:text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary focus-visible:text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Terms of Use</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary focus-visible:text-primary transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">
            © {year || '2025'} Welldropp Technologies. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { label: '𝕏', href: 'https://x.com/welldropp', title: 'Follow us on X (Twitter)' },
              { label: 'in', href: 'https://linkedin.com/company/welldropp', title: 'Connect on LinkedIn' },
              { label: 'gh', href: 'https://github.com/welldropp', title: 'View on GitHub' },
              { label: 'tg', href: 'https://t.me/welldropp', title: 'Join us on Telegram' },
            ].map((social) => (
              <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" title={social.title} aria-label={social.title} className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all">
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
