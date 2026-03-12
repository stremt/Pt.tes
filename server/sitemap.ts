const BASE_URL = "https://tools.pixocraft.in";
const TODAY = new Date().toISOString().split("T")[0];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

const URLS: SitemapUrl[] = [
  // Core pages
  { loc: "/", priority: 1.0, changefreq: "daily", lastmod: TODAY },
  { loc: "/tools", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/blogs", priority: 0.8, changefreq: "daily", lastmod: TODAY },
  { loc: "/about", priority: 0.5, changefreq: "monthly", lastmod: TODAY },
  { loc: "/contact", priority: 0.5, changefreq: "monthly", lastmod: TODAY },
  { loc: "/privacy", priority: 0.4, changefreq: "monthly", lastmod: TODAY },

  // Main tool pages
  { loc: "/tools/qr-maker", priority: 0.95, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/temp-mail", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-generator", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-compressor", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-resizer", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-to-image", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-to-file", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/word-counter", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/invoice-generator", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-merger", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-splitter", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-compressor", priority: 0.9, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-watermark-adder", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-to-pdf", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/jpg-to-png", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/png-to-jpg", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-strength-checker", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/random-string-generator", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-encrypt-decrypt", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-exif-remover", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/youtube-thumbnail-downloader", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/instagram-profile-picture-downloader", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/robots-txt-generator", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/sitemap-xml-generator", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/meta-robots-tag-generator", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/canonical-url-generator", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/open-graph-tag-generator", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/audio-noise-remover", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/gif-to-mp4", priority: 0.8, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/mp4-to-mp3", priority: 0.8, changefreq: "weekly", lastmod: TODAY },

  // Category pages
  { loc: "/tools/privacy", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/media", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/developer", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/math", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/random", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/productivity", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/color", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/ai", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // QR Code — 24 SEO landing pages
  { loc: "/tools/qr-code-for-instagram", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-facebook", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-youtube", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-linkedin", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-whatsapp", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-flyers", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-posters", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-coupons", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-business-promotion", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-product-marketing", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-google-reviews", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-contact-forms", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-feedback-forms", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-surveys", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-lead-capture", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-wifi", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-payments", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-vcard-contacts", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-email", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-sms", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-restaurant-menu", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-property-listings", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-product-packaging", priority: 0.85, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-for-event-tickets", priority: 0.85, changefreq: "weekly", lastmod: TODAY },

  // QR Code — longtail sub-pages
  { loc: "/tools/qr-code-maker/free-online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/wifi-network", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/business-cards", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/with-logo", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/event-ticketing", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/social-media", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/product-links", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/qr-code-maker/dynamic", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // Temp mail longtail
  { loc: "/tools/temp-mail/facebook-signup", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/temp-mail/instagram-verification", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/temp-mail/online-shopping", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/temp-mail/testing-accounts", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Password generator longtail
  { loc: "/tools/password-generator/online-accounts", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-generator/security", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-generator/business", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-generator/testing", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/12-character-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/16-character-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/20-character-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/32-character-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/48-character-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/unhackable-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/private-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/offline-password-generator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/strong-password-for-gmail", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/strong-password-for-instagram", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/strong-password-for-facebook", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/apple-id-password-generator", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/banking-password-generator", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/military-grade-password-generator", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/secure-random-password-generator", priority: 0.65, changefreq: "monthly", lastmod: TODAY },
  { loc: "/strongest-password-generator", priority: 0.65, changefreq: "monthly", lastmod: TODAY },

  // Password strength checker longtail
  { loc: "/tools/password-strength-checker/check-online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-strength-checker/security", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-strength-checker/is-strong", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/password-strength-checker/validation", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Password articles
  { loc: "/password-entropy-explained", priority: 0.6, changefreq: "monthly", lastmod: TODAY },
  { loc: "/common-password-mistakes", priority: 0.6, changefreq: "monthly", lastmod: TODAY },
  { loc: "/how-to-create-strong-password", priority: 0.6, changefreq: "monthly", lastmod: TODAY },
  { loc: "/strong-password-examples", priority: 0.6, changefreq: "monthly", lastmod: TODAY },
  { loc: "/password-strength-checker-guide", priority: 0.6, changefreq: "monthly", lastmod: TODAY },
  { loc: "/how-passwords-get-hacked", priority: 0.6, changefreq: "monthly", lastmod: TODAY },

  // Random string generator longtail
  { loc: "/tools/random-string-generator/api-keys", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/random-string-generator/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/random-string-generator/secure", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/random-string-generator/testing", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Text encrypt longtail
  { loc: "/tools/text-encrypt-decrypt/private-messages", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-encrypt-decrypt/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-encrypt-decrypt/secure", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-encrypt-decrypt/storage", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Image EXIF remover longtail
  { loc: "/tools/image-exif-remover/privacy", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-exif-remover/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-exif-remover/before-sharing", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-exif-remover/social-media", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Word counter longtail
  { loc: "/tools/word-counter/essays", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/word-counter/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/word-counter/content-marketing", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/word-counter/social-media", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Image compressor longtail
  { loc: "/tools/image-compressor/web", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-compressor/jpg", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-compressor/reduce-file-size", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-compressor/email", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // Image resizer longtail
  { loc: "/tools/image-resizer/social-media", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-resizer/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-resizer/bulk", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-resizer/dimensions", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PDF to image longtail
  { loc: "/tools/pdf-to-image/convert", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-to-image/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-to-image/jpg", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-to-image/extract", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // Image to PDF longtail
  { loc: "/tools/image-to-pdf/convert", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-to-pdf/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-to-pdf/jpg-to-pdf", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/image-to-pdf/combine", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // JPG to PNG longtail
  { loc: "/tools/jpg-to-png/convert", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/jpg-to-png/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/jpg-to-png/transparent", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/jpg-to-png/batch", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PNG to JPG longtail
  { loc: "/tools/png-to-jpg/convert", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/png-to-jpg/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/png-to-jpg/high-quality", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/png-to-jpg/batch", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // Instagram downloader longtail
  { loc: "/tools/instagram-downloader/dp-full-size", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/instagram-downloader/online-viewer", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/instagram-downloader/private-profile", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/instagram-downloader/anonymous", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // YouTube thumbnail downloader longtail
  { loc: "/tools/youtube-thumbnail-downloader/free-no-login", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/youtube-thumbnail-downloader/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/youtube-thumbnail-downloader/channel-thumbnails", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/youtube-thumbnail-downloader/best", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Invoice generator longtail
  { loc: "/tools/invoice-generator/freelancers", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/invoice-generator/online-creator", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/invoice-generator/small-business", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/invoice-generator/simple-billing", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PDF merger longtail
  { loc: "/tools/pdf-merger/combine", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-merger/free", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-merger/join", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-merger/professional", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PDF splitter longtail
  { loc: "/tools/pdf-splitter/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-splitter/extract", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-splitter/separate", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-splitter/professional", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PDF compressor longtail
  { loc: "/tools/pdf-compressor/online", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-compressor/reduce-size", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-compressor/100kb", priority: 0.75, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-compressor/email", priority: 0.75, changefreq: "weekly", lastmod: TODAY },

  // PDF watermark longtail
  { loc: "/tools/pdf-watermark-adder/online", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-watermark-adder/protect", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-watermark-adder/custom", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/pdf-watermark-adder/professional", priority: 0.7, changefreq: "weekly", lastmod: TODAY },

  // Text to file longtail
  { loc: "/tools/text-to-file/online-notepad", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-to-file/plain-text-editor", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-to-file/create-text-file", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-to-file/create-config-file", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
  { loc: "/tools/text-to-file/browser-text-editor", priority: 0.7, changefreq: "weekly", lastmod: TODAY },
];

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateSitemapXml(): string {
  const urlEntries = URLS.map((u) => {
    const fullLoc = escapeXml(`${BASE_URL}${u.loc}`);
    const lines = [`  <url>`, `    <loc>${fullLoc}</loc>`];
    if (u.lastmod) lines.push(`    <lastmod>${u.lastmod}</lastmod>`);
    if (u.changefreq) lines.push(`    <changefreq>${u.changefreq}</changefreq>`);
    if (u.priority !== undefined) lines.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
    lines.push(`  </url>`);
    return lines.join("\n");
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;
}

export function getTotalUrlCount(): number {
  return URLS.length;
}
