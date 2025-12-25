import { useSEO } from "@/lib/seo";
import { Lock, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FreePasswordGeneratorSEO() {
  useSEO({
    title: "Free Strong Password Generator - Create Secure Passwords Instantly",
    description: "Generate unbreakable passwords instantly with our free password generator. No signup, no tracking, completely private and offline."
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <div className="mb-8 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">•</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">Tools</Link>
          <span className="mx-2">•</span>
          <span>Strong Password Generator</span>
        </div>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Free Strong Password Generator – Create Unbreakable Passwords Instantly
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mt-4">
            Generate cryptographically secure passwords that are impossible to crack. Customize length, characters, and complexity. Works offline, completely private, no signup required.
          </p>
        </header>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Why Strong Passwords Matter More Than Ever</h2>
          <p className="text-muted-foreground leading-relaxed">
            Weak passwords are the #1 cause of account breaches. Hackers use automated tools that can crack common passwords in seconds. A strong, random password protects your accounts from unauthorized access, identity theft, and financial loss. Yet most people create passwords they can remember—exactly what makes them weak and vulnerable.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The solution is simple: let a secure password generator create random, unguessable passwords. These computer-generated passwords combine uppercase, lowercase, numbers, and symbols in ways no human would think of, making them virtually impossible to crack through brute force attacks.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Why People Choose Random Password Generators</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Defense Against Hacking:</strong> Truly random passwords can't be guessed or cracked by standard attack methods</span>
            </li>
            <li className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Protection After Breaches:</strong> When one site gets hacked, unique passwords for each account prevent cascade failures</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Compliance Requirements:</strong> Banks, work accounts, and sensitive services require passwords that meet security standards</span>
            </li>
            <li className="flex gap-3">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground"><strong>Zero Mental Effort:</strong> No need to invent passwords or worry about whether they're secure enough</span>
            </li>
          </ul>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">How a Strong Password Generator Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            A password generator creates random combinations of characters—letters, numbers, and symbols—in lengths you specify. The randomness is crucial. Instead of following patterns human minds naturally create, generators produce truly unpredictable strings that follow no logic a hacker could guess.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You control the rules: require uppercase letters, add numbers, include special symbols, set minimum length. The tool instantly generates multiple options, and you copy whichever one you prefer. The entire process happens offline in your browser, meaning your generated passwords never leave your device.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Store generated passwords in a password manager—software designed to securely remember them for you. This way you get maximum security without memorization burden.
          </p>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Common Password Security Mistakes</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Using Personal Information</h3>
              <p className="text-muted-foreground text-sm">Birthdays, pet names, and anniversary dates are the first things hackers try when they know something about you.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Reusing the Same Password</h3>
              <p className="text-muted-foreground text-sm">When one site gets hacked, your password works on every other account. A password generator lets you create unique passwords for every service.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Simple Patterns Like 123456 or QWERTY</h3>
              <p className="text-muted-foreground text-sm">These passwords show up in the top 100 most commonly cracked passwords. Random generation eliminates pattern predictability.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Short Passwords Under 12 Characters</h3>
              <p className="text-muted-foreground text-sm">Longer passwords are exponentially harder to crack. A 16-character random password provides military-grade security.</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold mb-2">Writing Passwords Down or Storing in Plain Text</h3>
              <p className="text-muted-foreground text-sm">Use a password manager instead, which encrypts passwords and protects them with one strong master password.</p>
            </div>
          </div>
        </section>

        <section className="mb-12 space-y-4">
          <h2 className="text-2xl font-bold">Security & Privacy Guarantee</h2>
          <p className="text-muted-foreground leading-relaxed">
            Your passwords are generated entirely in your browser using cryptographically secure randomness. Nothing is sent to servers, stored in databases, or shared with third parties. The tool has no signup, no cookies, no tracking. Your device is the only place where your passwords exist.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The randomness algorithm meets NIST cryptographic standards—the same security level used by governments and banks. You can generate passwords with absolute confidence that they're secure and that your privacy is completely protected.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">FAQs About Strong Passwords</h2>
          <div className="space-y-4">
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">How long should a strong password be?</summary>
              <p className="text-muted-foreground text-sm mt-3">At minimum 12 characters, but 16+ is better. Each additional character exponentially increases crack time—a 16-character password would take thousands of years to brute force.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Do I need special characters in passwords?</summary>
              <p className="text-muted-foreground text-sm mt-3">Special characters significantly improve password strength. They expand the character set that hackers must try, making passwords harder to crack. Use them when a website allows them.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Can I customize the password requirements?</summary>
              <p className="text-muted-foreground text-sm mt-3">Yes. You can set length, require uppercase/lowercase, include numbers, add symbols, and exclude ambiguous characters. This lets you match any website's password policy.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Should I use a password manager?</summary>
              <p className="text-muted-foreground text-sm mt-3">Absolutely. A password manager securely stores your generated passwords, encrypts them, and auto-fills them when needed. This removes memorization burden while maintaining security.</p>
            </details>
            <details className="border rounded-lg p-4 open:bg-muted/50 cursor-pointer">
              <summary className="font-semibold text-sm hover:text-primary transition-colors">Can hackers guess a random password?</summary>
              <p className="text-muted-foreground text-sm mt-3">No. A properly generated random password with sufficient length and character variety is mathematically impossible to guess. It would take longer than the age of the universe to brute force.</p>
            </details>
          </div>
        </section>

        <section className="mb-12 space-y-6">
          <h2 className="text-2xl font-bold">Related Security Tools</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              <Link href="/tools/password-generator" className="text-primary hover:underline font-semibold">
                Generate a Strong Password
              </Link>
              {" "}– Create unbreakable passwords with customizable character sets, length, and complexity requirements.
            </p>
            <p className="text-muted-foreground">
              <Link href="/tools/password-strength-checker" className="text-primary hover:underline font-semibold">
                Password Strength Checker
              </Link>
              {" "}– Test your passwords and see exactly how long they would take to crack.
            </p>
            <p className="text-muted-foreground">
              <Link href="/tools/temp-mail" className="text-primary hover:underline font-semibold">
                Temporary Email
              </Link>
              {" "}– Create disposable email addresses for accounts you don't want linked to your main email.
            </p>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Create Your First Secure Password</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Stop using weak passwords that put your accounts at risk. Generate a strong, random password in seconds and upgrade your account security today.
          </p>
          <Link href="/tools/password-generator">
            <Button size="lg" data-testid="button-generate-password">
              Generate Strong Password Now
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
