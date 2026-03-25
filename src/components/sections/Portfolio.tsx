"use client"

import Image from "next/image"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import placeholderData from "@/app/lib/placeholder-images.json"

const projects = [
  {
    title: "Neural Nexus",
    category: "Agentic AI",
    description: "An autonomous multi-agent system for supply chain optimization, reducing manual oversight by 85%.",
    image: placeholderData.placeholderImages.find(img => img.id === "project-workflow")?.imageUrl,
    tags: ["Genkit", "Next.js", "Python"],
    link: "#"
  },
  {
    title: "VeloCart AI",
    category: "E-Commerce",
    description: "High-conversion platform with integrated predictive search and personalized recommendation engine.",
    image: placeholderData.placeholderImages.find(img => img.id === "project-chatbot")?.imageUrl,
    tags: ["React", "Stripe", "AI"],
    link: "#"
  },
  {
    title: "InsightFlow",
    category: "Analytics Dashboard",
    description: "Real-time data visualization tool for enterprise SaaS, powered by an LLM-driven insight generator.",
    image: placeholderData.placeholderImages.find(img => img.id === "project-dashboard")?.imageUrl,
    tags: ["Recharts", "Cloud Run", "BigQuery"],
    link: "#"
  }
]

export function Portfolio() {
  return (
    <section id="works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Previous Works &<br /><span className="text-secondary">Case Studies</span></h2>
            <p className="text-muted-foreground text-lg">
              A selection of our latest deployments across Agentic AI, high-scale E-Commerce, and deep data analytics.
            </p>
          </div>
          <Button variant="outline" className="border-border hover:border-primary hover:text-primary rounded-full px-8 h-12 font-bold transition-all">
            View All Projects <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group glass-card rounded-[2rem] overflow-hidden flex flex-col hover:border-primary/40 transition-all">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={project.image || "https://picsum.photos/seed/works/600/400"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  data-ai-hint="futuristic software interface"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="flex gap-3">
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10 bg-white text-black hover:bg-primary hover:text-white transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10 bg-white text-black hover:bg-primary hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-1">{project.category}</p>
                    <h3 className="text-xl font-black">{project.title}</h3>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] uppercase font-bold px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
