import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Zap, Shield, Sparkles, Globe, Users, Heart } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  useSEO({
    title: "About Pixocraft Tools - India's Biggest Free Online Tool Hub | 200+ Browser Tools",
    description: "Discover Pixocraft Tools, India's largest free online tool hub with 200+ browser-based utilities. Learn about our mission to provide privacy-first, lightning-fast, and 100% free tools for everyone across India. No signup, no tracking, completely offline-supported.",
    keywords: "about pixocraft tools, India's biggest tool hub, free online tools, privacy-focused tools, browser-based utilities, offline tools, no tracking, 200+ tools, static tools, made in India",
    canonicalUrl: "https://tools.pixocraft.in/about",
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Page Header */}
        <div className="text-center space-y-6 mb-12 md:mb-20">
          <Badge variant="secondary" className="text-sm px-4 py-1.5">About Us</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
            India's Biggest <span className="text-primary">Free Tool Hub</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Building India's largest collection of 200+ free, privacy-first online tools for creators, developers, students, and professionals across India
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-12 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "200+", label: "Free Tools" },
              { value: "0", label: "Tracking & Ads" },
              { value: "10,000+", label: "Daily Users" },
              { value: "100%", label: "Private & Free" },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-4 md:p-6">
                <CardContent className="p-0">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Building India's largest free online tool hub that's fast, private, and accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Why We Started Pixocraft Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We saw too many online tools filled with ads, requiring signups, and compromising user privacy. India needed a better solution—a comprehensive hub of 200+ browser-based tools that are completely free, work offline, respect privacy, and deliver instant results without any tracking or data collection.
              </CardContent>
            </Card>
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">What Drives Us Forward</CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We believe every person in India deserves access to powerful, professional-grade online tools without paying or sacrificing privacy. Our mission is to make Pixocraft Tools the go-to destination for students, professionals, developers, and creators who demand speed, security, and simplicity from their digital tools.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Principles that guide everything we build
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
        <section className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">200+ Tools Across 10+ Categories</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Comprehensive suite of tools designed for every digital need
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Privacy & Security Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Temporary email generators, password generators, hash generators, and encryption tools. Protect your digital identity with zero-tracking utilities built for maximum privacy and security.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Text & Image Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Word counters, case converters, text summarizers, image compressors, resizers, format converters, and background removers. Professional-grade tools for content creators and designers.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all duration-200">
              <CardHeader>
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Developer & Math Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  JSON formatters, code beautifiers, Base64 encoders, API builders, EMI calculators, loan calculators, and geometry tools. Essential utilities for India's thriving developer and student community.
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
