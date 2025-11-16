const CACHE_NAME = 'pixocraft-tools-v1';
const OFFLINE_URL = '/';

const STATIC_ASSETS = [
  '/',
  '/tools',
  '/blogs',
  '/about',
  '/contact',
  '/privacy',
  '/favicon.png',
  '/logo.png',
  '/manifest.json'
];

const TOOL_ROUTES = [
  '/tools/temp-mail',
  '/tools/password-generator',
  '/tools/qr-maker',
  '/tools/image-compressor',
  '/tools/text-case-converter',
  '/tools/word-counter',
  '/tools/json-formatter',
  '/tools/url-encoder',
  '/tools/color-picker',
  '/tools/username-generator',
  '/tools/password-strength-checker',
  '/tools/text-summarizer',
  '/tools/image-resizer',
  '/tools/base64-encoder',
  '/tools/barcode-generator',
  '/tools/json-csv-converter',
  '/tools/json-yaml-converter',
  '/tools/code-beautifier',
  '/tools/css-minifier',
  '/tools/js-minifier',
  '/tools/html-beautifier',
  '/tools/regex-tester',
  '/tools/markdown-editor',
  '/tools/api-snippet-builder',
  '/tools/text-differ',
  '/tools/image-to-base64',
  '/tools/base64-to-image',
  '/tools/hex-rgb-converter',
  '/tools/color-palette-generator',
  '/tools/gradient-generator',
  '/tools/box-shadow-generator',
  '/tools/border-radius-generator',
  '/tools/image-cropper',
  '/tools/random-number-generator',
  '/tools/favicon-generator',
  '/tools/file-to-base64',
  '/tools/html-encoder-decoder',
  '/tools/emoji-remover',
  '/tools/text-repeater',
  '/tools/sentence-case-converter',
  '/tools/utm-builder',
  '/tools/meta-tag-generator',
  '/tools/og-preview',
  '/tools/timer-stopwatch',
  '/tools/invoice-generator',
  '/tools/receipt-generator',
  '/tools/quotation-generator',
  '/tools/area-converter',
  '/tools/height-converter',
  '/tools/bmi-calculator',
  '/tools/age-calculator',
  '/tools/age-gap-calculator',
  '/tools/calorie-calculator',
  '/tools/tip-calculator',
  '/tools/loan-calculator',
  '/tools/emi-calculator',
  '/tools/mortgage-calculator',
  '/tools/simple-interest-calculator',
  '/tools/compound-interest-calculator',
  '/tools/percentage-calculator',
  '/tools/percentage-change-calculator',
  '/tools/discount-calculator',
  '/tools/commission-calculator',
  '/tools/pay-split-calculator',
  '/tools/unit-converter',
  '/tools/currency-formatter',
  '/tools/exponent-calculator',
  '/tools/quadratic-solver',
  '/tools/fraction-calculator',
  '/tools/lcm-hcf-calculator',
  '/tools/modulo-calculator',
  '/tools/average-calculator',
  '/tools/mean-median-mode-calculator',
  '/tools/ratio-simplifier',
  '/tools/prime-number-checker',
  '/tools/prime-number-generator',
  '/tools/prime-factorization',
  '/tools/fibonacci-generator',
  '/tools/matrix-calculator',
  '/tools/circle-calculator',
  '/tools/triangle-area-calculator',
  '/tools/number-sorter',
  '/tools/random-word-generator',
  '/tools/random-sentence-generator',
  '/tools/random-paragraph-generator',
  '/tools/random-string-generator',
  '/tools/random-date-generator',
  '/tools/random-emoji-generator',
  '/tools/random-hex-color',
  '/tools/random-hindi-name',
  '/tools/random-fake-address',
  '/tools/random-country-generator',
  '/tools/random-animal-generator',
  '/tools/random-hashtag-generator',
  '/tools/random-motivational-quote',
  '/tools/random-riddle',
  '/tools/random-truth-dare',
  '/tools/random-movie-suggestion',
  '/tools/random-startup-idea',
  '/tools/random-tech-stack',
  '/tools/random-task',
  '/tools/random-object-generator',
  '/tools/random-superhero-name',
  '/tools/pdf-merger',
  '/tools/pdf-splitter',
  '/tools/pdf-compressor',
  '/tools/pdf-rotator',
  '/tools/pdf-to-image',
  '/tools/image-to-pdf',
  '/tools/html-to-pdf',
  '/tools/excel-to-pdf',
  '/tools/pdf-watermark-adder',
  '/tools/pdf-watermark-remover',
  '/tools/pdf-password-remover',
  '/tools/image-blur-tool',
  '/tools/image-darken-tool',
  '/tools/image-lighten-tool',
  '/tools/image-grayscale-tool',
  '/tools/image-invert-tool',
  '/tools/image-mirror-tool',
  '/tools/image-rotate-tool',
  '/tools/image-pixelator',
  '/tools/image-upscaler',
  '/tools/background-remover',
  '/tools/exif-remover',
  '/tools/dominant-color-finder',
  '/tools/jpg-to-png',
  '/tools/png-to-jpg',
  '/tools/heic-to-jpg',
  '/tools/gif-compressor',
  '/tools/gif-to-mp4',
  '/tools/video-to-gif',
  '/tools/audio-to-mp3',
  '/tools/mp4-to-mp3',
  '/tools/mp3-cutter',
  '/tools/video-compressor',
  '/tools/audio-noise-remover',
  '/tools/text-to-speech',
  '/tools/speech-to-text',
  '/tools/word-frequency-counter',
  '/tools/keyword-density-checker',
  '/tools/palindrome-checker',
  '/tools/emoji-counter',
  '/tools/character-paragraph-counter',
  '/tools/extract-numbers',
  '/tools/remove-numbers',
  '/tools/remove-punctuation',
  '/tools/remove-duplicate-lines',
  '/tools/remove-duplicate-words',
  '/tools/remove-extra-tabs',
  '/tools/line-break-remover',
  '/tools/line-number-adder',
  '/tools/text-reverser',
  '/tools/text-rotator',
  '/tools/word-shuffler',
  '/tools/word-splitter',
  '/tools/sentence-sorter',
  '/tools/case-randomizer',
  '/tools/case-mixer',
  '/tools/title-case-converter',
  '/tools/text-spacer',
  '/tools/prefix-suffix-tool',
  '/tools/text-cleaner',
  '/tools/silent-text',
  '/tools/superscript-generator',
  '/tools/subscript-generator',
  '/tools/fancy-text-styler',
  '/tools/gradient-text-generator',
  '/tools/glitch-text-generator',
  '/tools/ascii-art-generator',
  '/tools/ascii-converter',
  '/tools/symbol-combiner',
  '/tools/morse-code-translator',
  '/tools/nato-phonetic-converter',
  '/tools/text-encrypt-decrypt',
  '/tools/text-highlight-marker',
  '/tools/hash-generator',
  '/tools/uuid-generator',
  '/tools/slug-generator',
  '/tools/url-parser',
  '/tools/html-minifier',
  '/tools/html-table-generator',
  '/tools/css-animation-generator',
  '/tools/css-clamp-generator',
  '/tools/css-grid-generator',
  '/tools/flexbox-playground',
  '/tools/button-css-generator',
  '/tools/outline-css-generator',
  '/tools/advanced-text-shadow',
  '/tools/hex-color-picker-tool',
  '/tools/color-palette-shuffler',
  '/tools/json-tree-viewer',
  '/tools/text-diff',
  '/tools/excel-viewer',
  '/tools/screen-resolution-checker',
  '/tools/variable-font-viewer',
  '/tools/character-map',
  '/tools/signature-pad-tool',
  '/tools/instagram-caption-generator',
  '/tools/funny-roast-generator',
  '/tools/panagram-generator',
  '/tools/countdown-timer',
  '/tools/stopwatch',
  '/tools/days-calculator',
  '/tools/time-difference-calculator',
  '/tools/notes-app',
  '/tools/todo-list',
  '/tools/expense-tracker'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...STATIC_ASSETS, ...TOOL_ROUTES]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  if (event.request.url.includes('/api/')) {
    return;
  }

  if (event.request.url.startsWith('http')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match(OFFLINE_URL);
          }
          return new Response('Offline', { status: 503 });
        });
      })
    );
  }
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
