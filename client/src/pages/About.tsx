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
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">About Pixocraft Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building the best free online tools for creators, developers, and everyone
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-muted-foreground">
              <p>
                At Pixocraft Tools, we believe that powerful online utilities should be accessible to everyone, completely free of charge. Our mission is to build fast, secure, and privacy-focused tools that help you work smarter, not harder.
              </p>
              <p>
                We started Pixocraft Tools because we were frustrated with bloated, ad-filled tools that compromised user privacy. We wanted to create something better—a suite of tools that respect your privacy, work instantly, and never ask for payment.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Speed First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our tools work instantly in your browser. No waiting, no loading screens—just immediate results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Privacy Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We don't collect your data, track your usage, or sell your information. Your privacy is non-negotiable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Always Free</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No premium tiers, no hidden fees, no paywalls. Every feature is completely free, forever.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Accessible</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our tools work on any device, any browser, anywhere in the world. No downloads, no installations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>User-Centered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every decision we make starts with asking: "How does this benefit our users?"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We listen to our users and constantly improve our tools based on your feedback and needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy Tools</h3>
                <p className="text-muted-foreground">
                  Protect your online identity with our temporary email generator and password generator. Keep your real information safe from spam and data breaches.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Productivity Tools</h3>
                <p className="text-muted-foreground">
                  Boost your efficiency with QR code generators, image compressors, and more. All designed to save you time and effort.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Developer Tools</h3>
                <p className="text-muted-foreground">
                  Perfect for developers who need quick utilities for testing, development, and debugging. No authentication required.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact CTA */}
        <section className="max-w-3xl mx-auto text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-2xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
              <Link href="/contact">
                <Button size="lg" data-testid="button-contact-cta">
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
