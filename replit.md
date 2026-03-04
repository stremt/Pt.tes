# Password Security Tools Project

## Overview
A comprehensive suite of password security tools built with privacy as a core principle. All tools run 100% in the browser using the Web Crypto API, ensuring no sensitive data ever leaves the user's device.

## Core Features
- **Password Generator**: High-entropy random password generation with customizable lengths (12-32 characters).
- **Password Strength Checker**: Entropy-based analysis with crack-time estimates and security recommendations.
- **Specialized Landing Pages**: SEO-optimized pages for Gmail, Instagram, Facebook, Banking, and Apple ID.
- **Privacy First**: No server-side storage, no tracking, and fully offline capable.

## Technical Implementation
- **Frontend**: React with Vite, Tailwind CSS, and Shadcn UI.
- **Security**: `window.crypto.getRandomValues()` for CSPRNG.
- **SEO**: Dynamic metadata, FAQ structured data, and Breadcrumb schemas using `react-helmet-async`.
- **Entropy Calculation**:
  - <40: Weak
  - 40-70: Moderate
  - 70-100: Strong
  - 100-150: Very Strong
  - 150+: Uncrackable

## Project Structure
- `client/src/components/tools/`: Reusable tool components.
- `client/src/pages/tools/`: Main tool pages.
- `client/src/pages/tools/longtail/`: SEO-focused specialized pages.
- `client/src/lib/seo.ts`: SEO and Structured Data utilities.
