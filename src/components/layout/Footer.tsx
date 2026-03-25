"use client"

import Link from "next/link"
import * as React from "react"

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
              <div className="text-primary font-headline font-black text-2xl tracking-tighter">
                Well<span className="text-foreground">dropp</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Drop Smarter. Scale Faster. — AI solutions precisely engineered for modern businesses. From agents to e-commerce, we build it all.
            </p>
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
              <li><Link href="#contact" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#research" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-foreground mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-semibold text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">
            © {year || '2025'} Welldropp Technologies. All rights reserved.
          </p>
          <div className="flex gap-4">
            {['𝕏', 'in', 'gh', 'tg'].map((social) => (
              <Link key={social} href="#" className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center font-bold text-sm hover:border-primary hover:bg-primary/5 transition-all">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
