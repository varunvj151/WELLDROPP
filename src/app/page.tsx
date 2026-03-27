import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { Services } from "@/components/sections/Services"
import { Research } from "@/components/sections/Research"
import { Portfolio } from "@/components/sections/Portfolio"
import { Testimonials } from "@/components/sections/Testimonials"
import { Pricing } from "@/components/sections/Pricing"
import { Contact } from "@/components/sections/Contact"
import { Toaster } from "@/components/ui/toaster"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MsmeLogo } from "@/components/ui/MsmeLogo"

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Built by builders,<br />for builders.</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Welldropp was born from a simple belief: AI should be accessible, precision-engineered, and actually useful. We build intelligent systems that solve real-world operational challenges.
              </p>
              <Button asChild className="bg-primary text-background font-black py-4 px-10 rounded-full hover:bg-secondary h-auto transition-all">
                <Link href="#contact">Partner With Us</Link>
              </Button>
            </div>

            <div className="lg:w-1/2">
              <div className="glass-card p-12 rounded-[2.5rem] relative overflow-hidden group">
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-10 relative z-10">
                  {[
                    { icon: "⚡", title: "Precision Engineering", text: "Every solution is scoped, designed, and deployed with intent. No bloat — just systems that work." },
                    { icon: "🔬", title: "Research-Backed", text: "Our ML/DL team actively researches the latest models — what we build is always cutting-edge." },
                    { icon: "🌱", title: "Startup Mindset", text: "We move fast, iterate faster, and treat every client's problem like our own startup challenge." },
                    { icon: "🔒", title: "Secure by Default", text: "Enterprise-grade security baked into every product — your data is always protected." }
                  ].map((item) => (
                    <div key={item.title} className="flex gap-6">
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="mt-32 pt-16 border-t border-border/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="lg:max-w-lg">
                <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Our Credentials</p>
                <h3 className="text-3xl md:text-4xl font-black mb-4">Certified & Reliable</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We adhere to government compliance standards, ensuring our operations are robust, legitimate, and trustworthy.
                </p>
              </div>
              
              <div className="glass-card p-6 md:p-10 rounded-[2.5rem] flex flex-col sm:flex-row items-center sm:items-start gap-10 w-full lg:w-auto hover:border-primary/40 transition-all group relative overflow-hidden">
                {/* Background brand glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
                
                <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-full h-full bg-white rounded-full p-2.5 shadow-xl group-hover:rotate-[5deg] group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                    <MsmeLogo size={88} />
                  </div>
                </div>
                
                <div className="text-center sm:text-left flex-1 max-w-sm relative z-10">
                  <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block mb-3">Compliance & Reliability</span>
                  <p className="text-base font-semibold text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors">
                    <strong className="text-foreground">Welldropp</strong> is a government registered MSME enterprise, ensuring bank-grade reliability and process compliance for all operations.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Services />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <Research />
      <Contact />

      <Footer />
      <Toaster />
    </main>
  )
}
