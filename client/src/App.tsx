import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import TempMail from "@/pages/tools/TempMail";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";
import QRMaker from "@/pages/tools/QRMaker";
import ImageCompressor from "@/pages/tools/ImageCompressor";
import TextCaseConverter from "@/pages/tools/TextCaseConverter";
import WordCounter from "@/pages/tools/WordCounter";
import JSONFormatter from "@/pages/tools/JSONFormatter";
import URLEncoder from "@/pages/tools/URLEncoder";
import ColorPicker from "@/pages/tools/ColorPicker";
import UsernameGenerator from "@/pages/tools/UsernameGenerator";
import PasswordStrengthChecker from "@/pages/tools/PasswordStrengthChecker";
import TextSummarizer from "@/pages/tools/TextSummarizer";
import ImageResizer from "@/pages/tools/ImageResizer";
import Base64Encoder from "@/pages/tools/Base64Encoder";
import BarcodeGenerator from "@/pages/tools/BarcodeGenerator";
import JSONCSVConverter from "@/pages/tools/JSONCSVConverter";
import JSONYAMLConverter from "@/pages/tools/JSONYAMLConverter";
import CodeBeautifier from "@/pages/tools/CodeBeautifier";
import CSSMinifier from "@/pages/tools/CSSMinifier";
import JSMinifier from "@/pages/tools/JSMinifier";
import HTMLBeautifier from "@/pages/tools/HTMLBeautifier";
import RegexTester from "@/pages/tools/RegexTester";
import MarkdownEditor from "@/pages/tools/MarkdownEditor";
import APISnippetBuilder from "@/pages/tools/APISnippetBuilder";
import TextDiffer from "@/pages/tools/TextDiffer";
import Blogs from "@/pages/Blogs";
import BlogPost from "@/pages/BlogPost";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/temp-mail" component={TempMail} />
        <Route path="/tools/password-generator" component={PasswordGenerator} />
        <Route path="/tools/qr-maker" component={QRMaker} />
        <Route path="/tools/image-compressor" component={ImageCompressor} />
        <Route path="/tools/text-case-converter" component={TextCaseConverter} />
        <Route path="/tools/word-counter" component={WordCounter} />
        <Route path="/tools/json-formatter" component={JSONFormatter} />
        <Route path="/tools/url-encoder" component={URLEncoder} />
        <Route path="/tools/color-picker" component={ColorPicker} />
        <Route path="/tools/username-generator" component={UsernameGenerator} />
        <Route path="/tools/password-strength-checker" component={PasswordStrengthChecker} />
        <Route path="/tools/text-summarizer" component={TextSummarizer} />
        <Route path="/tools/image-resizer" component={ImageResizer} />
        <Route path="/tools/base64-encoder" component={Base64Encoder} />
        <Route path="/tools/barcode-generator" component={BarcodeGenerator} />
        <Route path="/tools/json-csv-converter" component={JSONCSVConverter} />
        <Route path="/tools/json-yaml-converter" component={JSONYAMLConverter} />
        <Route path="/tools/code-beautifier" component={CodeBeautifier} />
        <Route path="/tools/css-minifier" component={CSSMinifier} />
        <Route path="/tools/js-minifier" component={JSMinifier} />
        <Route path="/tools/html-beautifier" component={HTMLBeautifier} />
        <Route path="/tools/regex-tester" component={RegexTester} />
        <Route path="/tools/markdown-editor" component={MarkdownEditor} />
        <Route path="/tools/api-snippet-builder" component={APISnippetBuilder} />
        <Route path="/tools/text-differ" component={TextDiffer} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blogs/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
