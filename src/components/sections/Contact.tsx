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
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().optional().or(z.literal('')),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(2, { message: "Message too short" }),
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
        message: values.message
      })
      
      toast({
        title: "✓ Message Sent!",
        description: "Our AI categorized your request as: " + result.category,
      })
      form.reset()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Let's build<br />something real.</h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md">
              Tell us what you need. We'll scope it, price it, and ship it — fast.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, value: "welldropp.tech@gmail.com" },
                { icon: Phone, value: "+91 87788 60376" },
                { icon: MapPin, value: "Tamil Nadu, India 🇮🇳" },
                { icon: Clock, value: "Mon-Sat, 9AM-10PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-10 rounded-[2rem]">
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
                          <SelectItem value="agent">Agentic AI System</SelectItem>
                          <SelectItem value="bot">Telegram / Email Bot</SelectItem>
                          <SelectItem value="chat">Customer Care Chatbot</SelectItem>
                          <SelectItem value="ecom">E-Commerce Platform</SelectItem>
                          <SelectItem value="dashboard">Analytics Dashboard</SelectItem>
                          <SelectItem value="builder">Website Builder</SelectItem>
                          <SelectItem value="research">ML/DL Research</SelectItem>
                          <SelectItem value="custom">Custom / Enterprise</SelectItem>
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
                          className="bg-background/50 border-border min-h-[120px] rounded-xl focus:border-primary" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 rounded-full text-lg font-black bg-primary text-background hover:bg-secondary transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  )
}
