import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { Shield, Mail, Lock, Hash, Unlock, FileX, Link2, Code, Shuffle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function PrivacyCategory() {
  useSEO({
    title: "Privacy Tools - Free Online Privacy & Security Solutions | Pixocraft",
    description: "Protect your digital privacy with Pixocraft's free online privacy tools. Browser-based, offline-first, and completely secure. No data uploads or tracking.",
    keywords: "privacy tools, online privacy, data security, password generator, encryption, privacy protection, free privacy tools, browser-based privacy",
    canonicalUrl: "https://tools.pixocraft.in/tools/privacy",
  });

  const privacyTools = [
    {
      id: "temp-mail",
      name: "Temp Mail Generator",
      description: "Generate temporary disposable emails instantly. Protect your privacy and avoid spam with free temporary email addresses.",
      icon: Mail,
      path: "/tools/temp-mail",
    },
    {
      id: "password-generator",
      name: "Password Generator",
      description: "Create strong, secure passwords instantly. Customize length and complexity for maximum security.",
      icon: Lock,
      path: "/tools/password-generator",
    },
    {
      id: "password-strength-checker",
      name: "Password Strength Checker",
      description: "Check how strong your password is. Get instant feedback and security recommendations.",
      icon: Shield,
      path: "/tools/password-strength-checker",
    },
    {
      id: "text-encrypt-decrypt",
      name: "Text Encrypt & Decrypt",
      description: "Encrypt or decrypt text with a password using offline browser crypto. Zero data storage. AES encryption.",
      icon: Lock,
      path: "/tools/text-encrypt-decrypt",
    },
    {
      id: "hash-generator",
      name: "Hash Generator",
      description: "Generate MD5, SHA1 & SHA256 hashes instantly. Developer-friendly, offline & secure.",
      icon: Hash,
      path: "/tools/hash-generator",
    },
    {
      id: "pdf-password-remover",
      name: "PDF Password Remover",
      description: "Remove password protection from PDF files instantly. Unlock encrypted PDFs securely in your browser without uploading.",
      icon: Unlock,
      path: "/tools/pdf-password-remover",
    },
    {
      id: "exif-remover",
      name: "Image EXIF Remover",
      description: "Remove EXIF metadata from images using offline canvas method.",
      icon: FileX,
      path: "/tools/exif-remover",
    },
    {
      id: "url-encoder",
      name: "URL Encoder/Decoder",
      description: "Encode or decode URLs instantly. Convert special characters for safe URL transmission.",
      icon: Link2,
      path: "/tools/url-encoder",
    },
    {
      id: "html-encoder-decoder",
      name: "HTML Encoder/Decoder",
      description: "Encode or decode HTML characters instantly. Perfect for developers, SEO and editors.",
      icon: Code,
      path: "/tools/html-encoder-decoder",
    },
    {
      id: "random-string-generator",
      name: "Random String Generator",
      description: "Generate secure random strings for IDs, passwords, and testing. Uses cryptographically secure randomness.",
      icon: Shuffle,
      path: "/tools/random-string-generator",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Privacy Tools" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-privacy-category">
              Privacy Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Protect Your <span className="text-primary">Privacy Online</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Free, browser-based privacy tools for data security, encryption, and protection
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Understanding Digital Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              In today's interconnected world, digital privacy has become more important than ever. Privacy tools help you maintain control over your personal information, protect sensitive data, and ensure your online activities remain secure and confidential. Whether you're managing passwords, encrypting messages, or removing metadata from files, privacy tools provide essential protection against unauthorized access and data breaches.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy isn't just about hiding information—it's about maintaining your right to control what you share, with whom, and when. Privacy tools empower you to take ownership of your digital footprint and protect yourself against evolving online threats.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Benefits from Privacy Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Privacy tools serve a diverse audience across different sectors and needs. Students use encryption tools to protect academic research and personal communications. Professionals safeguard confidential business documents and client information using password managers and file encryption. Developers implement security best practices in their applications using hashing tools and data obfuscation techniques. Everyday internet users protect their accounts with strong passwords, secure messaging, and metadata removal from personal files.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Businesses rely on privacy tools to comply with data protection regulations and maintain customer trust. Whether you're an individual concerned about online tracking or an organization handling sensitive data, privacy tools provide the foundation for secure digital operations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">How Privacy Tools Help Protect You</h2>
            <p className="text-muted-foreground leading-relaxed">
              Privacy tools solve real-world security challenges. Need a strong password that's impossible to crack? Use a password generator. Worried about email interception? Encrypt your messages. Sharing a file containing hidden metadata? Remove EXIF data before uploading. These tools handle common privacy scenarios that everyone faces online.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In daily life, privacy tools help you secure your social media accounts, protect email communications, encrypt sensitive documents, and prevent tracking through metadata. Professionally, they support compliance with GDPR, HIPAA, and other privacy regulations. Academically, they protect research data and student information from unauthorized access.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy, Security & Browser-Based Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our privacy tools operate entirely in your browser—meaning your data never leaves your device. No uploads to external servers. No cloud storage of sensitive information. No tracking or analytics of what you process. This "offline-first" approach is fundamental to digital privacy today.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Browser-based privacy tools matter because they eliminate the middleman. You control the entire process—input your data, process it locally, and get your results—all without any third-party visibility. This architecture ensures genuine privacy, not privacy claims. Your password generators produce secure passwords only you see. Your encryption tools encrypt data only on your computer. Your metadata removers work entirely on your device before you download the cleaned file.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In an era of data breaches and privacy concerns, this transparent, user-controlled approach builds trust through technical design rather than promises alone.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using Privacy Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with password security. Create strong, unique passwords for each online account using a password generator. Check password strength regularly to ensure your existing passwords meet security standards. Layer encryption on top by encrypting sensitive files and documents before sharing or storing them.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before sharing images or documents, remove metadata that reveals location, device information, and other identifying details. Use hash generators to verify file integrity and create secure checksums. For sensitive communications, encrypt messages that only intended recipients can decrypt.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combine these tools logically: generate a secure password, hash-verify important files, encrypt sensitive documents, remove metadata from shareable files. Most importantly, use privacy tools consistently as part of your digital routine, not just when something goes wrong. Privacy is an ongoing practice, not a one-time action.
            </p>
          </section>
        </article>

        {/* All Privacy Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All Privacy Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card key={tool.id} className="hover-elevate flex flex-col">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                    <a href={tool.path}>
                      <Button variant="outline" className="w-full" data-testid={`button-privacy-tool-${tool.id}`}>
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
