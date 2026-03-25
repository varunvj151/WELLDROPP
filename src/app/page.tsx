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
                Welldropp was born from a simple belief: AI should be accessible, precise, and actually useful. We engineer intelligent systems that solve real business problems.
              </p>
              <button className="bg-primary text-background font-black py-4 px-10 rounded-full hover:bg-secondary transition-all">
                Partner With Us
              </button>
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
