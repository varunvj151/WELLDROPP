"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-primary font-headline font-black text-2xl tracking-tighter">
            Well<span className="text-foreground">dropp</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Button className="bg-primary text-background hover:bg-secondary font-bold rounded-full px-6 transition-all">
            Get Started →
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[500px] py-6" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-4 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-bold hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full mt-2 rounded-full font-bold">Get Started →</Button>
        </div>
      </div>
    </nav>
  )
}
