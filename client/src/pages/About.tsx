import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Zap, Shield, Sparkles, Globe, Users, Heart } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  useSEO({
    title: "About Pixocraft Tools | Free Online Utilities",
    description: "Learn about Pixocraft Tools - a free platform offering privacy-focused online utilities. Our mission is to provide fast, secure, and accessible tools for everyone.",
    keywords: "about pixocraft, online tools, free utilities, privacy tools",
    canonicalUrl: "https://tools.pixocraft.in/about",
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-6 mb-20">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">About Us</Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Empowering <span className="text-primary">Everyone</span> with Free Tools
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to build the best free online tools for creators, developers, and everyone who values privacy and simplicity
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "100%", label: "Free Forever" },
              { value: "0", label: "Ads or Tracking" },
              { value: "10+", label: "Powerful Tools" },
              { value: "∞", label: "Usage Limits" },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Making powerful tools accessible to everyone, without compromise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-xl">Why We Started</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                We were frustrated with bloated, ad-filled tools that compromised user privacy. We wanted to create something better—a suite of tools that respect your privacy, work instantly, and never ask for payment.
              </CardContent>
            </Card>
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-xl">What We Believe</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                Powerful online utilities should be accessible to everyone, completely free of charge. Our mission is to build fast, secure, and privacy-focused tools that help you work smarter, not harder.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Principles that guide everything we build
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Speed First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  All our tools work instantly in your browser. No waiting, no loading screens—just immediate results.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Privacy Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We don't collect your data, track your usage, or sell your information. Your privacy is non-negotiable.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Always Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  No premium tiers, no hidden fees, no paywalls. Every feature is completely free, forever.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our tools work on any device, any browser, anywhere in the world. No downloads, no installations.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">User-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Every decision we make starts with asking: "How does this benefit our users?"
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We listen to our users and constantly improve our tools based on your feedback and needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Tools designed to make your digital life easier and more secure
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Privacy Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Protect your online identity with our temporary email generator and password generator. Keep your real information safe from spam and data breaches.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Productivity Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Boost your efficiency with QR code generators, image compressors, and more. All designed to save you time and effort.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">Developer Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Perfect for developers who need quick utilities for testing, development, and debugging. No authentication required.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover-elevate transition-all duration-200">
            <CardContent className="py-12 px-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions, suggestions, or feedback? We'd love to hear from you and discuss how we can help.
              </p>
              <Link href="/contact">
                <Button size="lg" className="text-base px-8" data-testid="button-contact-cta">
                  Contact Us
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
