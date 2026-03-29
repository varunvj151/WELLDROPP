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
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const formSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(1, { message: "Message is required" }),
})

export function Contact() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      // PREPARING CLEAN EMAIL BODY AS REQUESTED
      const emailBody = `
New Contact Form Submission:

Name: ${data.first_name} ${data.last_name || ""}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}

Message:
${data.message}
      `.trim();

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "012cf280-c68e-4589-a206-628fbd19d8bc",
          subject: "New Client Inquiry - Welldropp",
          from_name: "Welldropp Website",
          replyto: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: emailBody, // Using the formatted body
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        toast({
          title: "Message sent successfully",
          description: "We'll get back to you shortly.",
        })
        form.reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        throw new Error(result.message || "Failed to send message")
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Sending Message",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
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
                      name="first_name"
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
                      name="last_name"
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
                            <SelectItem value="Agentic AI">Agentic AI</SelectItem>
                            <SelectItem value="Telegram Bots">Telegram Bots</SelectItem>
                            <SelectItem value="Custom Software">Custom Software</SelectItem>
                            <SelectItem value="Enterprise Automation">Enterprise Automation</SelectItem>
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
                    {isSubmitting ? "Sending..." : "Send Message →"}
                  </Button>
                </form>
                {submitted && (
                  <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary font-semibold text-center animate-in fade-in slide-in-from-bottom-2">
                    ✓ Message sent successfully
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
