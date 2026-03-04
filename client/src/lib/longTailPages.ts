export interface LongTailPage {
  title: string;
  slug: string;
  path: string;
}

export const longTailPagesMap: Record<string, LongTailPage[]> = {
  "temp-mail": [
    { title: "For Facebook Signup", slug: "facebook-signup", path: "/tools/temp-mail/facebook-signup" },
    { title: "For Instagram Verification", slug: "instagram-verification", path: "/tools/temp-mail/instagram-verification" },
    { title: "For Online Shopping", slug: "online-shopping", path: "/tools/temp-mail/online-shopping" },
    { title: "For Testing Accounts", slug: "testing-accounts", path: "/tools/temp-mail/testing-accounts" },
  ],
  "password-generator": [
    { title: "For Online Accounts", slug: "online-accounts", path: "/tools/password-generator/online-accounts" },
    { title: "For Security", slug: "security", path: "/tools/password-generator/security" },
    { title: "For Business", slug: "business", path: "/tools/password-generator/business" },
    { title: "For Testing", slug: "testing", path: "/tools/password-generator/testing" },
    { title: "Strong Password Examples", slug: "strong-password-examples", path: "/strong-password-examples" },
    { title: "Unhackable Password", slug: "unhackable", path: "/unhackable-password-generator" },
    { title: "Private Password", slug: "private", path: "/private-password-generator" },
    { title: "Offline Password", slug: "offline", path: "/offline-password-generator" },
  ],
  "password-strength-checker": [
    { title: "Check Online", slug: "check-online", path: "/tools/password-strength-checker/check-online" },
    { title: "Security Guide", slug: "security", path: "/tools/password-strength-checker/security" },
    { title: "Is My Password Strong", slug: "is-strong", path: "/tools/password-strength-checker/is-strong" },
    { title: "Password Validation", slug: "validation", path: "/tools/password-strength-checker/validation" },
  ],
  "random-string-generator": [
    { title: "For API Keys", slug: "api-keys", path: "/tools/random-string-generator/api-keys" },
    { title: "Online Generator", slug: "online", path: "/tools/random-string-generator/online" },
    { title: "Secure Generator", slug: "secure", path: "/tools/random-string-generator/secure" },
    { title: "For Testing", slug: "testing", path: "/tools/random-string-generator/testing" },
  ],
  "text-encrypt-decrypt": [
    { title: "For Private Messages", slug: "private-messages", path: "/tools/text-encrypt-decrypt/private-messages" },
    { title: "Online Encryption", slug: "online", path: "/tools/text-encrypt-decrypt/online" },
    { title: "Secure Encryption", slug: "secure", path: "/tools/text-encrypt-decrypt/secure" },
    { title: "For Storage", slug: "storage", path: "/tools/text-encrypt-decrypt/storage" },
  ],
  "image-exif-remover": [
    { title: "For Photo Privacy", slug: "privacy", path: "/tools/image-exif-remover/privacy" },
    { title: "Remove EXIF Online", slug: "online", path: "/tools/image-exif-remover/online" },
    { title: "Before Sharing", slug: "before-sharing", path: "/tools/image-exif-remover/before-sharing" },
    { title: "For Social Media", slug: "social-media", path: "/tools/image-exif-remover/social-media" },
  ],
  "word-counter": [
    { title: "For Essays", slug: "essays", path: "/tools/word-counter/essays" },
    { title: "Online Counter", slug: "online", path: "/tools/word-counter/online" },
    { title: "For Content Marketing", slug: "content-marketing", path: "/tools/word-counter/content-marketing" },
    { title: "For Social Media", slug: "social-media", path: "/tools/word-counter/social-media" },
  ],
  "image-compressor": [
    { title: "For Web", slug: "web", path: "/tools/image-compressor/web" },
    { title: "Compress JPG", slug: "jpg", path: "/tools/image-compressor/jpg" },
    { title: "Reduce File Size", slug: "reduce-file-size", path: "/tools/image-compressor/reduce-file-size" },
    { title: "For Email", slug: "email", path: "/tools/image-compressor/email" },
  ],
  "image-resizer": [
    { title: "For Social Media", slug: "social-media", path: "/tools/image-resizer/social-media" },
    { title: "Online Resizer", slug: "online", path: "/tools/image-resizer/online" },
    { title: "Bulk Resize", slug: "bulk", path: "/tools/image-resizer/bulk" },
    { title: "By Dimensions", slug: "dimensions", path: "/tools/image-resizer/dimensions" },
  ],
  "pdf-to-image": [
    { title: "Convert PDF to Image", slug: "convert", path: "/tools/pdf-to-image/convert" },
    { title: "Online Conversion", slug: "online", path: "/tools/pdf-to-image/online" },
    { title: "Convert to JPG", slug: "jpg", path: "/tools/pdf-to-image/jpg" },
    { title: "Extract Images", slug: "extract", path: "/tools/pdf-to-image/extract" },
  ],
  "youtube-thumbnail-downloader": [
    { title: "Free - No Login", slug: "free-no-login", path: "/tools/youtube-thumbnail-downloader/free-no-login" },
    { title: "Download Online", slug: "online", path: "/tools/youtube-thumbnail-downloader/online" },
    { title: "Channel Thumbnails", slug: "channel-thumbnails", path: "/tools/youtube-thumbnail-downloader/channel-thumbnails" },
    { title: "Best Tool Comparison", slug: "best", path: "/tools/youtube-thumbnail-downloader/best" },
  ],
  "qr-code-maker": [
    { title: "Free Online Generator", slug: "free-online", path: "/tools/qr-code-maker/free-online" },
    { title: "WiFi QR Codes", slug: "wifi-network", path: "/tools/qr-code-maker/wifi-network" },
    { title: "For Business Cards", slug: "business-cards", path: "/tools/qr-code-maker/business-cards" },
    { title: "With Logo", slug: "with-logo", path: "/tools/qr-code-maker/with-logo" },
    { title: "For Events & Ticketing", slug: "event-ticketing", path: "/tools/qr-code-maker/event-ticketing" },
    { title: "For Social Media", slug: "social-media", path: "/tools/qr-code-maker/social-media" },
    { title: "For Product Links", slug: "product-links", path: "/tools/qr-code-maker/product-links" },
    { title: "Dynamic QR Codes", slug: "dynamic", path: "/tools/qr-code-maker/dynamic" },
  ],
  "text-to-pdf": [
    { title: "Convert Online Free", slug: "convert-online", path: "/tools/text-to-pdf/convert-online" },
    { title: "With Formatting", slug: "formatting-guide", path: "/tools/text-to-pdf/formatting-guide" },
    { title: "Email Converter", slug: "email-converter", path: "/tools/text-to-pdf/email-converter" },
    { title: "Bulk Conversion", slug: "bulk-conversion", path: "/tools/text-to-pdf/bulk-conversion" },
  ],
  "time-difference-calculator": [
    { title: "For Payroll & Billing", slug: "payroll-billing", path: "/tools/time-difference-calculator/payroll-billing" },
    { title: "Online Duration Tool", slug: "online-duration", path: "/tools/time-difference-calculator/online-duration" },
    { title: "For Project Tracking", slug: "project-tracking", path: "/tools/time-difference-calculator/project-tracking" },
    { title: "Work Hours Calculator", slug: "work-hours", path: "/tools/time-difference-calculator/work-hours" },
  ],
};

export function getLongTailPages(toolId: string): LongTailPage[] {
  return longTailPagesMap[toolId] || [];
}
