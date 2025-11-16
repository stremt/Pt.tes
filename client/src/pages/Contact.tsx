import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { Mail, Clock, Send, MessageSquare, HelpCircle, Lightbulb, MapPin, Phone } from "lucide-react";
import { SiX, SiGithub, SiLinkedin } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactForm as ContactFormType } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useSEO({
    title: "Contact Pixocraft Tools - India's Biggest Free Online Tool Hub | Get Support & Feedback",
    description: "Get in touch with the Pixocraft Tools team. We're here to help with questions, feature requests, bug reports, and feedback about our 200+ free online tools. Email us at support@pixocraft.in or use our contact form. Fast response within 24-48 hours.",
    keywords: "contact pixocraft tools, support, customer service, feedback, help desk, report bug, feature request, pixocraft support email, India tool hub contact, get in touch",
    canonicalUrl: "https://tools.pixocraft.in/contact",
  });

  const onSubmit = (data: ContactFormType) => {
    const emailSubject = encodeURIComponent(data.subject);
    const emailBody = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:support@pixocraft.in?subject=${emailSubject}&body=${emailBody}`;
    
    window.location.href = mailtoLink;
    
    toast({
      title: "Opening Email Client",
      description: "Your default email app will open to send this message.",
    });

    setTimeout(() => {
      form.reset();
    }, 500);
  };

  const faqs = [
    {
      question: "How quickly will I get a response?",
      answer: "We typically respond to all inquiries within 24-48 hours during business days. For urgent matters, please mention 'URGENT' in your subject line."
    },
    {
      question: "What types of inquiries do you handle?",
      answer: "We handle all types of inquiries including bug reports, feature requests, tool suggestions, partnership opportunities, technical support, and general feedback."
    },
    {
      question: "Are all your tools really free?",
      answer: "Yes! All 200+ tools on Pixocraft are completely free to use with no hidden charges. We believe in providing accessible tools for everyone."
    },
    {
      question: "Can I suggest a new tool?",
      answer: "Absolutely! We love hearing tool suggestions from our users. Please include as much detail as possible about the tool you'd like to see."
    },
    {
      question: "Do you offer API access?",
      answer: "Currently, we don't offer public API access, but we're considering it for the future. Contact us if you have specific use cases."
    }
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 px-4">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">Contact Us</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Let's <span className="text-primary">Talk</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or suggestions? We're here to help and would love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Fill out the form and click send to open your email client
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="your.email@example.com"
                              {...field}
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              {...field}
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more..."
                              rows={6}
                              {...field}
                              data-testid="textarea-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                      <p className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-primary" />
                        Your email app will open
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Clicking send will open your default email app with this message ready to send to{" "}
                        <span className="font-semibold text-foreground">support@pixocraft.in</span>
                      </p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      data-testid="button-submit-contact"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send via Email
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader className="p-4 sm:p-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Email Us</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <div>
                  <p className="text-sm sm:text-base font-medium mb-1">Support Email</p>
                  <a
                    href="mailto:support@pixocraft.in"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid="link-email-support"
                  >
                    support@pixocraft.in
                  </a>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  data-testid="button-email-direct"
                >
                  <a href="mailto:support@pixocraft.in">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Us Directly
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader className="p-4 sm:p-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  We typically respond within 24-48 hours during business days
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader className="p-4 sm:p-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Follow us on social media for updates and tips
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://twitter.com/pixocraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      data-testid="link-social-twitter"
                    >
                      <SiX className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://github.com/pixocraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      data-testid="link-social-github"
                    >
                      <SiGithub className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href="https://linkedin.com/company/pixocraft"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      data-testid="link-social-linkedin"
                    >
                      <SiLinkedin className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader className="p-4 sm:p-6">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <ul className="space-y-2.5 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Be specific about which tool you're asking about</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Include screenshots if reporting a bug</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Check our blog for tutorials and guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Feature requests are always welcome!</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="p-6 sm:p-8 text-center">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-base">
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 pt-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger 
                      className="text-left hover:no-underline"
                      data-testid={`accordion-faq-${index}`}
                    >
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Still have questions?{" "}
                  <a 
                    href="mailto:support@pixocraft.in" 
                    className="text-primary font-medium hover:underline"
                    data-testid="link-faq-email"
                  >
                    Get in touch
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
