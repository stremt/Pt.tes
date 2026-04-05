import { Link } from "wouter";
import { Mail, Github, Twitter, Linkedin, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "Storage Cleared",
      description: "Local storage has been cleared. Please refresh the page to see new features.",
    });
  };

  const categoryLinks = [
    { href: "/tools/text", label: "Text Tools" },
    { href: "/tools/image", label: "Image Tools" },
    { href: "/tools/pdf", label: "PDF Tools" },
    { href: "/tools/media", label: "Media Tools" },
    { href: "/tools/developer", label: "Developer Tools" },
    { href: "/tools/math", label: "Math Tools" },
    { href: "/tools/random", label: "Random Generators" },
    { href: "/tools/productivity", label: "Productivity Tools" },
  ];

  const toolLinks = [
    { href: "/tools/qr-maker", label: "QR Code Maker" },
    { href: "/tools/image-compressor", label: "Image Compressor" },
    { href: "/tools/password-generator", label: "Password Generator" },
    { href: "/tools/youtube-thumbnail-downloader", label: "YouTube Thumbnail" },
    { href: "/tools/mp4-to-mp3", label: "MP4 to MP3" },
    { href: "/tools/online-signature-generator", label: "Signature Generator" },
    { href: "/tools/temp-mail", label: "Temp Mail" },
    { href: "/tools/pdf-merger", label: "PDF Merger" },
  ];

  const companyLinks = [
    { href: "/about", label: "About Us" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/update-guide", label: "How to Update" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="Pixocraft Tools Logo" 
                className="h-7 w-7 sm:h-8 sm:w-8"
              />
              <span className="font-bold text-base sm:text-lg">Pixocraft Tools</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
              India's Biggest Free Online Tool Hub
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              200+ Browser Tools • 100% Private & Offline • Made in India
            </p>
            <div className="flex items-center gap-2 pt-1 sm:pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button 
                    key={social.label}
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9"
                    asChild
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      data-testid={`link-social-${social.label.toLowerCase()}`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors" data-testid={`link-category-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">Popular Tools</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <a
                href="mailto:support@pixocraft.in"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-footer-email"
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:text-primary transition-colors" />
                <span className="text-xs sm:text-sm">support@pixocraft.in</span>
              </a>
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                We typically respond within 24-48 hours
              </p>
            </div>
            <Separator className="my-3 sm:my-4" />
            <div className="space-y-2">
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Built with precision by the Pixocraft team
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator className="my-6 sm:my-8" />
        <div className="flex flex-col sm:flex-row md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <p className="text-center sm:text-left">
            © {currentYear} Pixocraft Tools — India's Biggest Free Online Tool Hub • Part of{" "}
            <a 
              href="https://pixocraft.in" 
              className="hover:text-foreground transition-colors underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pixocraft.in
            </a>
          </p>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs flex-wrap justify-center">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <a href="mailto:support@pixocraft.in" className="hover:text-foreground transition-colors">
              Contact Support
            </a>
            <span>•</span>
            <span>Made in India</span>
            <span>•</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-0 text-[10px] sm:text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  data-testid="button-update-storage"
                >
                  <RotateCw className="h-3 w-3" />
                  Update
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Local Storage?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete all cached data and local storage. You'll be able to enjoy new features after refresh. Are you sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="bg-destructive/10 border border-destructive/30 rounded p-3 text-xs text-destructive">
                  <strong>Warning:</strong> This action cannot be undone. All saved preferences and cached data will be permanently deleted.
                </div>
                <div className="flex gap-2 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleClearLocalStorage}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Clear Storage
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </footer>
  );
}
