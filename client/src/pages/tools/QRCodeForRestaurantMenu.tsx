import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, QrCode, Smartphone, DollarSign, BarChart3, AlertCircle, HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for my restaurant menu?",
    answer: "Simply enter your menu URL into the QR code generator above, customize the design if desired, and download the QR code. You can then print it on table tents, posters, or include it on receipts. Customers scan the code with their phones to view your digital menu instantly."
  },
  {
    question: "Do customers need an app to scan restaurant QR codes?",
    answer: "No! Most modern smartphones (iPhone and Android) have built-in QR code scanning capabilities. Customers can scan QR codes directly using their phone's camera app without downloading any additional applications."
  },
  {
    question: "Can I update my restaurant menu without changing the QR code?",
    answer: "Yes! If you host your menu on a website, you can update the menu content anytime without changing the QR code itself. The QR code will always point to the latest version of your menu. For dynamic QR codes, you can even change the destination link while keeping the same code."
  },
  {
    question: "What size should restaurant QR codes be for tables?",
    answer: "QR codes for table tents should be at least 2cm x 2cm (about 1 inch x 1 inch) for reliable scanning from arm's length. For posters and window displays, we recommend 5cm x 5cm or larger for better visibility. Always download in high resolution (2x or 4x) for print materials."
  },
  {
    question: "Are QR code menus free to create and use?",
    answer: "Yes! Our QR code generator is completely free. There are no hidden fees, no limit on the number of QR codes you can create, and no watermarks. You can generate unlimited QR codes for your restaurant without any cost."
  },
  {
    question: "How do I make sure the QR code menu is mobile-friendly?",
    answer: "Make sure your menu website is responsive and works well on smartphones. Test the QR code on multiple devices (iPhone and Android) before printing it. Ensure the menu loads quickly and is easy to read on smaller screens with proper font sizes and clear navigation."
  },
  {
    question: "Can I track how many customers scan my restaurant QR code?",
    answer: "With our free generator, basic QR codes provide limited tracking. For advanced analytics, you can use dynamic QR codes through third-party services that track scans, locations, and device types. This helps you understand customer engagement with your digital menu."
  },
  {
    question: "What happens if I need to change my restaurant menu URL?",
    answer: "If you generate a static QR code linked to a specific URL, you would need to generate a new QR code if the URL changes. However, if you use a dynamic QR code service (available through third-party providers), you can change the destination link without generating a new code."
  }
];

export default function QRCodeForRestaurantMenu() {
  useSEO({
    title: "QR Code for Restaurant Menu | Digital Menu QR Code Generator",
    description: "Create touchless QR code menus for restaurants and cafes instantly. Generate custom restaurant menu QR codes, digital menu codes, and contactless dining solutions. Free online QR code maker.",
    keywords: "qr code for restaurant menu, restaurant qr code generator, digital menu qr code, contactless menu qr code, qr code menu for restaurant, restaurant menu qr code generator, cafe qr code menu",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-restaurant-menu",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Restaurant Menu – Free Restaurant QR Code Generator | Pixocraft","description":"Create a QR code for your restaurant menu. Generate digital menu QR codes for tables, windows, and packaging that open your menu instantly.","url":"https://tools.pixocraft.in/tools/qr-code-for-restaurant-menu","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for a Restaurant Menu","description":"Follow these steps to generate a QR code that opens your digital menu when scanned.","step":[{"@type":"HowToStep","name":"Upload Your Menu or Get Your Menu URL","text":"Host your menu as a PDF, image, or digital menu URL on your website or a menu hosting platform."},{"@type":"HowToStep","name":"Enter the Menu URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste your digital menu URL into the input field."},{"@type":"HowToStep","name":"Customize the QR Code","text":"Match the QR code design to your restaurant's branding and add your restaurant's logo to the center."},{"@type":"HowToStep","name":"Print and Place on Tables","text":"Download the QR code at print quality and add it to table cards, menus, doors, and receipts."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Restaurant Menu","item":"https://tools.pixocraft.in/tools/qr-code-for-restaurant-menu"}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground pt-4 pb-2 max-w-4xl mx-auto px-4 md:px-8 flex-wrap">
            <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
            <span>›</span>
            <Link href="/tools/qr-maker"><span className="hover:text-foreground cursor-pointer">QR Code Generator</span></Link>
            <span>›</span>
            <span className="text-foreground">QR Code for Restaurant Menu</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code for Restaurant Menu – Create Contactless Digital Menu QR Codes</h1>
            <p className="text-xl text-muted-foreground mb-8">Generate contactless QR code menus for restaurants, cafes, food trucks, and hotels. Customers scan the QR code to instantly view your digital menu on their phone.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">No app required</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for contactless dining</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Print-ready QR codes</span>
              </div>
            </div>

            <Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Restaurant QR Code Now
            </Button></Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Code Generator Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Restaurant Menu QR Code</h2>
              <p className="text-lg text-muted-foreground">Paste your restaurant menu URL below to generate a QR code customers can scan instantly.</p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            <p className="mt-4 text-sm text-muted-foreground">
                Use our{" "}
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                to create custom QR codes for websites, social media, marketing campaigns, and business use cases.
              </p>
            </div>
          </section>

          {/* Why Restaurants Use QR Code Menus */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Restaurants Use QR Code Menus</h2>
              <p className="text-lg text-muted-foreground mb-6">The shift to digital restaurant menus has accelerated dramatically. Here's why restaurants worldwide are adopting QR code menus:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Pandemic-Driven Adoption</h3>
                <p className="text-muted-foreground">COVID-19 accelerated the need for contactless dining solutions. QR code menus became essential for restaurants to maintain hygiene standards and customer safety during lockdowns and restrictions.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Touchless Dining Experience</h3>
                <p className="text-muted-foreground">Customers eliminate the risk of touching contaminated physical menus. Each guest accesses the menu on their personal device, reducing cross-contamination and providing peace of mind in food service settings.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Cost Savings from Printed Menus</h3>
                <p className="text-muted-foreground">Eliminate expenses for printing, laminating, and replacing physical menus. Digital menus remove ongoing printing costs and the need for menu reprints when items change or prices update.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Instant Menu Updates</h3>
                <p className="text-muted-foreground">Update prices, add new dishes, or remove unavailable items instantly. No need to reprint menus or physically change displays. Changes take effect immediately when customers scan the QR code.</p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Using QR Code Menus in Your Restaurant</h2>
              <p className="text-lg text-muted-foreground mb-6">Digital menu QR codes offer numerous advantages for modern restaurants and food service businesses:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Contactless Ordering</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Customers view menus on their phones without touching shared physical menus, enhancing hygiene and safety.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Easy Menu Updates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Update prices, add specials, or remove items instantly without reprinting or replacing physical menus.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Lower Printing Costs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Eliminate ongoing expenses for printing, laminating, and replacing physical menus regularly.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Better UX</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Customers enjoy a modern dining experience with easy browsing, search functionality, and large, readable text.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Multilingual Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Serve international customers by hosting menus in multiple languages on your digital menu platform.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Analytics & Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Track how many customers scan your menu, measure engagement, and gather data on popular items.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How QR Code Menus Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Restaurant QR Code Menus Work</h2>
            <p className="text-lg text-muted-foreground">The process is simple and straightforward. Here's how digital menu QR codes function in a restaurant:</p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Upload or Host Your Menu Online</h3>
                  <p className="text-muted-foreground">Create a digital menu on your website, use a menu hosting service, or upload a PDF. Ensure the menu is mobile-friendly and loads quickly on smartphones.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Generate a QR Code Using This Tool</h3>
                  <p className="text-muted-foreground">Paste your menu URL into the QR code generator above. Customize the design with your restaurant colors, add your logo, and download the QR code in high resolution.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Print QR Codes on Tables or Posters</h3>
                  <p className="text-muted-foreground">Print the QR code on table tents, placemats, window displays, posters, or receipts. Ensure proper sizing (minimum 2cm x 2cm) and contrast for easy scanning.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan and View Your Menu Instantly</h3>
                  <p className="text-muted-foreground">Customers use their phone camera or QR scanner app to scan the code. They're instantly taken to your digital menu and can browse items, prices, photos, and descriptions on their device.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Where to Place Restaurant QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Where to Place Restaurant QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">Strategic placement of QR codes ensures maximum engagement and scanning rates:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Tables & Table Tents</h3>
                <p className="text-muted-foreground">Place QR codes on table tents at the center of each table. This is the primary location where customers encounter the menu and are ready to order.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Front Door & Entrance</h3>
                <p className="text-muted-foreground">Display QR codes at the entrance so customers can preview your menu before entering or while waiting. This helps manage expectations and reduces decision time.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Receipts & Takeaway Packaging</h3>
                <p className="text-muted-foreground">Include QR codes on receipts and takeaway containers. Customers can access your menu later for repeat orders or share it with friends and family.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Window Displays & Posters</h3>
                <p className="text-muted-foreground">Use larger QR codes in window displays and promotional posters. Passersby can quickly scan to see your menu, specials, or delivery options.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Napkins & Placemats</h3>
                <p className="text-muted-foreground">Print QR codes on napkins and placemats for subtle branding. Customers naturally interact with these items and can access the menu anytime during their meal.</p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">Bar Counter & Ordering Area</h3>
                <p className="text-muted-foreground">Place QR codes where customers stand in line or wait to order. This reduces wait time anxiety by giving them something productive to do.</p>
              </div>
            </div>
          </section>

          {/* Real Restaurant Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Restaurant QR Code Use Cases</h2>
            <p className="text-lg text-muted-foreground mb-6">See how different types of food service businesses are using QR code menus:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cafe QR Menu</CardTitle>
                  <CardDescription>Coffee shops & cafes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Cafes use QR code menus to display drink options, pastries, and lunch items. Regular customers can quickly access the menu without waiting. It's especially useful during busy morning hours.</p>
                  <Badge variant="secondary">Fast Service</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fine Dining QR Menu</CardTitle>
                  <CardDescription>Upscale restaurants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">High-end restaurants use branded, customized QR codes that match their aesthetic. Digital menus can include food photography, wine pairings, and chef descriptions to enhance the dining experience.</p>
                  <Badge variant="secondary">Premium Experience</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Food Truck QR Ordering</CardTitle>
                  <CardDescription>Mobile food vendors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Food trucks display QR codes on their windows. Customers scan to view the menu and current location via GPS. QR codes can link to online ordering or delivery platforms for convenient purchasing.</p>
                  <Badge variant="secondary">Mobile Business</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hotel Restaurant Menu</CardTitle>
                  <CardDescription>Hotel dining & room service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">Hotels use QR code menus for room service and dining areas. Guests can order food without calling, enabling contactless in-room dining. QR codes can also link to special packages or premium offerings.</p>
                  <Badge variant="secondary">Hospitality</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices for Restaurant QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">Follow these guidelines to ensure your restaurant QR codes are effective and scannable:</p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use Large QR Codes</h3>
                  <p className="text-muted-foreground text-sm">Minimum size of 2cm x 2cm (about 1 inch). For posters and window displays, use 5cm x 5cm or larger for better visibility and easier scanning from a distance.</p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes at Eye Level</h3>
                  <p className="text-muted-foreground text-sm">Position QR codes where customers naturally look while seated. Avoid placing them too high, too low, or in corners where they might be missed.</p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure Strong Contrast</h3>
                  <p className="text-muted-foreground text-sm">Use black QR codes on white or light backgrounds. Avoid colored or low-contrast codes that are difficult to scan. High contrast improves scanning reliability.</p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test with Multiple Devices</h3>
                  <p className="text-muted-foreground text-sm">Scan the QR code on different phones (iPhone and Android) and from various distances before printing. Ensure the menu loads quickly and displays properly on all devices.</p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Link to Mobile-Friendly Menu Pages</h3>
                  <p className="text-muted-foreground text-sm">Ensure your menu website is fully responsive and optimized for mobile devices. Poor mobile experience will frustrate customers and reduce engagement.</p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Download High Resolution QR Codes</h3>
                  <p className="text-muted-foreground text-sm">Always download QR codes in high resolution (2x or 4x) when printing. This prevents pixelation and ensures crisp, scannable codes in print materials.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">Learn from common pitfalls that reduce QR code effectiveness:</p>

            <div className="space-y-4">
              <div className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">Linking to Non-Mobile Menus</h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">Avoid linking QR codes to desktop-only websites. If customers can't view your menu on their phone, they'll abandon the scan. Always ensure your menu URL is fully mobile-responsive.</p>
                </div>
              </div>

              <div className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">Placing QR Codes Too Small</h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">Small QR codes are frustrating to scan and lead to failed attempts. Customers who struggle to scan will lose interest. Use minimum 2cm x 2cm codes, larger when possible.</p>
                </div>
              </div>

              <div className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">Using Low Resolution Images</h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">Pixelated QR codes fail to scan properly. Always download in high resolution (4x) for print. This ensures crisp codes that work reliably with any smartphone camera.</p>
                </div>
              </div>

              <div className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">Broken or Outdated Links</h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">If your menu URL breaks or becomes unavailable, customers will see an error. Maintain a stable menu URL and test QR codes regularly to ensure they still work correctly.</p>
                </div>
              </div>

              <div className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">Poor Contrast or Colored QR Codes</h3>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">Colored or low-contrast QR codes are harder to scan. Stick with high contrast (black on white or white on black) for maximum scannability and reliability.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold mb-3 flex gap-2 items-start">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm ml-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking Section */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Related QR Code Tools & Guides</h2>
            <p className="text-lg text-muted-foreground mb-6">Explore other ways to use QR codes for your business:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/qr-code-for-property-listings">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-2">QR Code for Real Estate</h3>
                  <p className="text-sm text-muted-foreground">Share virtual property tours and listing details with QR codes</p>
                </div>
              </Link>

              <Link href="/tools/qr-code-for-product-packaging">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-2">QR Code for Products</h3>
                  <p className="text-sm text-muted-foreground">Add QR codes to packaging for customer engagement</p>
                </div>
              </Link>

              <Link href="/tools/qr-code-for-event-tickets">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-2">QR Code for Events</h3>
                  <p className="text-sm text-muted-foreground">Generate QR codes for event tickets and check-ins</p>
                </div>
              </Link>

              <Link href="/tools/qr-maker">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-2">Main QR Code Generator</h3>
                  <p className="text-sm text-muted-foreground">Access the full QR code maker with all customization options</p>
                </div>
              </Link>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Related QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-property-listings">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Property Listings</span>
                </Link>{" "}
                — Share property listings with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-packaging">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Packaging</span>
                </Link>{" "}
                — Add QR codes to product packaging
              </p>
              <p>
                <Link href="/tools/qr-code-for-event-tickets">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Event Tickets</span>
                </Link>{" "}
                — Create scannable QR codes for event tickets
              </p>
              </div>
            </section>

          {/* Related QR Code Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-2">Related QR Code Use Cases</h2>
              <p className="text-muted-foreground mb-6">Explore more QR code guides for your specific needs.</p>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
            >
              {[
                { href: "/tools/qr-code-for-property-listings", title: "QR Code for Property Listings", desc: "Share property info and virtual tours via QR code." },
                { href: "/tools/qr-code-for-product-packaging", title: "QR Code for Product Packaging", desc: "Add QR codes to packaging for customer engagement." },
                { href: "/tools/qr-code-for-event-tickets", title: "QR Code for Event Tickets", desc: "Generate scannable QR codes for event entry." },
                { href: "/tools/qr-code-for-wifi", title: "QR Code for WiFi", desc: "Let guests connect to WiFi without typing passwords." },
                { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect guest feedback quickly via QR code." },
                { href: "/tools/qr-code-for-instagram", title: "QR Code for Instagram", desc: "Drive diners to your restaurant Instagram page." },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="flex flex-col gap-2 p-5 rounded-lg border bg-card hover-elevate cursor-pointer h-full"
                    data-testid={`card-related-${item.href.split("/").pop()}`}
                  >
                    <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <span className="text-xs text-primary font-medium mt-1">Explore &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>


          {/* Final CTA */}
          <section className="border-t pt-12 space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">Create Your Restaurant QR Code Now</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Generate your contactless restaurant menu QR code instantly. Free, unlimited, and ready to print.</p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
                Start Creating QR Codes Today
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
