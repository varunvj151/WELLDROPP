"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { aiLeadCategorizationAndResponse } from "@/ai/flows/ai-lead-categorization-and-response"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(2, { message: "Message is too short" }),
})

export function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const result = await aiLeadCategorizationAndResponse({
        name: `${values.firstName} ${values.lastName || ''}`.trim(),
        email: values.email,
        phone: values.phone,
        service: values.service,
        message: values.message
      })
      
      toast({
        title: "✓ Message Sent Successfully!",
        description: `Your inquiry has been categorized as "${result.category}". Our team has been notified at welldropp.tech@gmail.com.`,
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "We couldn't process your message right now. Please try again later or email us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="reveal">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Let's build<br />something real.</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md leading-relaxed">
              Tell us what you need. We'll scope it, price it, and ship it — fast.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, value: "welldropp.tech@gmail.com", label: "Email Us" },
                { icon: Phone, value: "+91 87788 60376", label: "Call Us" },
                { icon: MapPin, value: "Tamil Nadu, India 🇮🇳", label: "Location" },
                { icon: Clock, value: "Mon-Sat, 9AM-10PM", label: "Available Hours" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">{item.label}</p>
                    <span className="text-foreground font-semibold">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="glass-card p-10 rounded-[2rem] border border-border/50">
              <h3 className="text-xl font-black mb-8">Send Us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} className="bg-background/50 border-border h-12 rounded-xl focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} className="bg-background/50 border-border h-12 rounded-xl focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@company.com" {...field} className="bg-background/50 border-border h-12 rounded-xl focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 87788 60376" {...field} className="bg-background/50 border-border h-12 rounded-xl focus:border-primary" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">Service Interested In</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50 border-border h-12 rounded-xl focus:ring-primary">
                              <SelectValue placeholder="Choose a service..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="Agentic AI System">Agentic AI System</SelectItem>
                            <SelectItem value="Telegram / Email Bot">Telegram / Email Bot</SelectItem>
                            <SelectItem value="Customer Care Chatbot">Customer Care Chatbot</SelectItem>
                            <SelectItem value="E-Commerce Platform">E-Commerce Platform</SelectItem>
                            <SelectItem value="Analytics Dashboard">Analytics Dashboard</SelectItem>
                            <SelectItem value="Website Builder">Website Builder</SelectItem>
                            <SelectItem value="ML/DL Research">ML/DL Research</SelectItem>
                            <SelectItem value="Custom / Enterprise">Custom / Enterprise</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground">About your project</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what you want to build..." 
                            {...field} 
                            className="bg-background/50 border-border min-h-[120px] rounded-xl focus:border-primary resize-none" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 rounded-full text-lg font-black bg-primary text-background hover:bg-secondary transition-all shadow-[0_10px_30px_rgba(0,230,118,0.2)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Send Message →"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
