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

  // Auto-added missing pages from route audit
  { loc: "/browser-text-editor", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/create-config-file-online", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/create-text-file-online", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/online-notepad", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/password-brute-force-calculator", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/plain-text-editor", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/advanced-text-shadow", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/age-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/age-gap-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/api-snippet-builder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/area-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/ascii-art-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/ascii-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/assignment-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/audio-to-mp3", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/average-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/background-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/barcode-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/base64-encoder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/base64-to-image", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/bmi-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/border-radius-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/box-shadow-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/button-css-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/calorie-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/case-randomizer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/character-map", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/character-paragraph-counter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/chat-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/circle-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/code-beautifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/color-palette-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/color-palette-shuffler", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/color-picker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/commission-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/compound-interest-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/convert-text-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/countdown-timer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/css-animation-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/css-clamp-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/css-grid-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/css-minifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/csv-viewer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/csv-viewer/convert-and-edit", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/csv-viewer/edit-without-excel", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/csv-viewer/view-in-browser", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/csv-viewer/view-large-files", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/currency-formatter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/days-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/dominant-color-finder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/email-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/emi-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/emoji-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/excel-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/excel-to-pdf/professional", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/excel-viewer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/excel-viewer/mobile", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/excel-viewer/no-software", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/exif-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/expense-tracker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/exponent-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/extract-numbers", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/fancy-text-styler", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/favicon-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/fibonacci-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/file-to-base64", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/flexbox-playground", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/fraction-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/gif-compressor", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/glitch-text-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/gradient-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/gradient-text-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/hash-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/heic-to-jpg", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/height-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/hex-color-picker-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/hex-rgb-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/html-beautifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/html-encoder-decoder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/html-minifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/html-table-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/html-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-blur-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-cropper", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-darken-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-grayscale-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-invert-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-lighten-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-mirror-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-pixelator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-rotate-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-to-base64", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/image-upscaler", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/js-minifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/json-csv-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/json-formatter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/json-tree-viewer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/json-yaml-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/keyword-density-checker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/lcm-hcf-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/line-break-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/loan-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/markdown-editor", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/markdown-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/math-equation-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/matrix-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/mean-median-mode-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/meta-tag-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/modulo-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/morse-code-translator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/mortgage-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/mp3-cutter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/nato-phonetic-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/notes-app", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/notes-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/number-sorter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/og-preview", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/outline-css-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/palindrome-checker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/pangram-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/paste-text-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/pay-split-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/pdf-password-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/pdf-rotator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/pdf-watermark-remover", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/percentage-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/percentage-change-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/prime-factorization", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/prime-number-checker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/prime-number-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/quadratic-solver", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/quotation-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-animal-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-country-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-date-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-emoji-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-fake-address", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-hex-color", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-hindi-name", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-motivational-quote", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-movie-suggestion", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-number-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-object-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-riddle", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-startup-idea", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-superhero-name", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-task", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-tech-stack", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-truth-dare", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/random-word-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/ratio-simplifier", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/receipt-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/regex-tester", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/remove-duplicate-lines", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/remove-duplicate-words", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/remove-numbers", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/roman-numeral-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/screen-resolution-checker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/sentence-case-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/signature-pad-tool", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/how-to-sign-pdf-online", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/silent-text", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/simple-interest-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/slug-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/speech-to-text", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/stopwatch", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/subscript-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/superscript-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/symbol-combiner", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/table-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-case-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-cleaner", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-diff", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-differ", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-file-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-highlight-marker", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-repeater", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-reverser", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-rotator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-spacer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-summarizer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-pdf/bulk-conversion", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-pdf/convert-online", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-pdf/email-converter", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-pdf/formatting-guide", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-to-speech", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/text-with-images-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/time-difference-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/time-difference-calculator/online-duration", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/time-difference-calculator/payroll-billing", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/time-difference-calculator/project-tracking", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/time-difference-calculator/work-hours", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/timer-stopwatch", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/tip-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/title-case-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/todo-list", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/triangle-area-calculator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/txt-to-pdf", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/unit-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/url-encoder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/username-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/utm-builder", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/uuid-generator", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/variable-font-viewer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/video-compressor", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/video-to-gif", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/word-frequency-counter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/word-shuffler", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter/bulk-convert", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter/free-online", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter/history", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter/no-excel", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-to-csv-converter/with-preview", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-viewer", priority: 0.8, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-viewer/convert-and-edit", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-viewer/edit-without-excel", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-viewer/view-in-browser", priority: 0.7, changefreq: "monthly", lastmod: TODAY },
  { loc: "/tools/xlsx-viewer/view-large-files", priority: 0.7, changefreq: "monthly", lastmod: TODAY },

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
