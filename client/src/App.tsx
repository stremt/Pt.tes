import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { SearchDialog } from "@/components/SearchDialog";
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
import RandomNumberGenerator from "@/pages/tools/RandomNumberGenerator";
import HexRgbConverter from "@/pages/tools/HexRgbConverter";
import ColorPaletteGenerator from "@/pages/tools/ColorPaletteGenerator";
import GradientGenerator from "@/pages/tools/GradientGenerator";
import BoxShadowGenerator from "@/pages/tools/BoxShadowGenerator";
import BorderRadiusGenerator from "@/pages/tools/BorderRadiusGenerator";
import ImageToBase64 from "@/pages/tools/ImageToBase64";
import Base64ToImage from "@/pages/tools/Base64ToImage";
import ImageCropper from "@/pages/tools/ImageCropper";
import FaviconGenerator from "@/pages/tools/FaviconGenerator";
import FileToBase64 from "@/pages/tools/FileToBase64";
import HTMLEncoderDecoder from "@/pages/tools/HTMLEncoderDecoder";
import EmojiRemover from "@/pages/tools/EmojiRemover";
import TextRepeater from "@/pages/tools/TextRepeater";
import SentenceCaseConverter from "@/pages/tools/SentenceCaseConverter";
import UTMBuilder from "@/pages/tools/UTMBuilder";
import MetaTagGenerator from "@/pages/tools/MetaTagGenerator";
import OGPreview from "@/pages/tools/OGPreview";
import TimerStopwatch from "@/pages/tools/TimerStopwatch";
import InvoiceGenerator from "@/pages/tools/InvoiceGenerator";
import ReceiptGenerator from "@/pages/tools/ReceiptGenerator";
import QuotationGenerator from "@/pages/tools/QuotationGenerator";
import AreaConverter from "@/pages/tools/AreaConverter";
import CommissionCalculator from "@/pages/tools/CommissionCalculator";
import EMICalculator from "@/pages/tools/EMICalculator";
import PercentageCalculator from "@/pages/tools/PercentageCalculator";
import AgeCalculator from "@/pages/tools/AgeCalculator";
import TimeDifferenceCalculator from "@/pages/tools/TimeDifferenceCalculator";
import ExpenseTracker from "@/pages/tools/ExpenseTracker";
import TextToSpeech from "@/pages/tools/TextToSpeech";
import SpeechToText from "@/pages/tools/SpeechToText";
import UnitConverter from "@/pages/tools/UnitConverter";
import ASCIIConverter from "@/pages/tools/ASCIIConverter";
import CharacterMap from "@/pages/tools/CharacterMap";
import AverageCalculator from "@/pages/tools/AverageCalculator";
import RandomStringGenerator from "@/pages/tools/RandomStringGenerator";
import TipCalculator from "@/pages/tools/TipCalculator";
import CurrencyFormatter from "@/pages/tools/CurrencyFormatter";
import DaysCalculator from "@/pages/tools/DaysCalculator";
import Stopwatch from "@/pages/tools/Stopwatch";
import CountdownTimer from "@/pages/tools/CountdownTimer";
import LoanCalculator from "@/pages/tools/LoanCalculator";
import MortgageCalculator from "@/pages/tools/MortgageCalculator";
import TextDiff from "@/pages/tools/TextDiff";
import PDFMerger from "@/pages/tools/PDFMerger";
import PDFSplitter from "@/pages/tools/PDFSplitter";
import PDFRotator from "@/pages/tools/PDFRotator";
import PDFToImage from "@/pages/tools/PDFToImage";
import ImageToPDF from "@/pages/tools/ImageToPDF";
import FractionCalculator from "@/pages/tools/FractionCalculator";
import RomanNumeralConverter from "@/pages/tools/RomanNumeralConverter";
import TextCleaner from "@/pages/tools/TextCleaner";
import TextEncryptDecrypt from "@/pages/tools/TextEncryptDecrypt";
import HashGenerator from "@/pages/tools/HashGenerator";
import NumberSorter from "@/pages/tools/NumberSorter";
import PaySplitCalculator from "@/pages/tools/PaySplitCalculator";
import MatrixCalculator from "@/pages/tools/MatrixCalculator";
import CaseRandomizer from "@/pages/tools/CaseRandomizer";
import BMICalculator from "@/pages/tools/BMICalculator";
import CalorieCalculator from "@/pages/tools/CalorieCalculator";
import HexColorPickerTool from "@/pages/tools/HexColorPickerTool";
import ScreenResolutionChecker from "@/pages/tools/ScreenResolutionChecker";
import UUIDGenerator from "@/pages/tools/UUIDGenerator";
import WordShuffler from "@/pages/tools/WordShuffler";
import RemoveDuplicateWords from "@/pages/tools/RemoveDuplicateWords";
import RemoveDuplicateLines from "@/pages/tools/RemoveDuplicateLines";
import LineBreakRemover from "@/pages/tools/LineBreakRemover";
import SilentText from "@/pages/tools/SilentText";
import RandomDateGenerator from "@/pages/tools/RandomDateGenerator";
import RandomCountryGenerator from "@/pages/tools/RandomCountryGenerator";
import TodoList from "@/pages/tools/TodoList";
import NotesApp from "@/pages/tools/NotesApp";
import CharacterParagraphCounter from "@/pages/tools/CharacterParagraphCounter";
import KeywordDensityChecker from "@/pages/tools/KeywordDensityChecker";
import HTMLTableGenerator from "@/pages/tools/HTMLTableGenerator";
import TextReverser from "@/pages/tools/TextReverser";
import PalindromeChecker from "@/pages/tools/PalindromeChecker";
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
        <Route path="/tools/random-number-generator" component={RandomNumberGenerator} />
        <Route path="/tools/hex-rgb-converter" component={HexRgbConverter} />
        <Route path="/tools/color-palette-generator" component={ColorPaletteGenerator} />
        <Route path="/tools/gradient-generator" component={GradientGenerator} />
        <Route path="/tools/box-shadow-generator" component={BoxShadowGenerator} />
        <Route path="/tools/border-radius-generator" component={BorderRadiusGenerator} />
        <Route path="/tools/image-to-base64" component={ImageToBase64} />
        <Route path="/tools/base64-to-image" component={Base64ToImage} />
        <Route path="/tools/image-cropper" component={ImageCropper} />
        <Route path="/tools/favicon-generator" component={FaviconGenerator} />
        <Route path="/tools/file-to-base64" component={FileToBase64} />
        <Route path="/tools/html-encoder-decoder" component={HTMLEncoderDecoder} />
        <Route path="/tools/emoji-remover" component={EmojiRemover} />
        <Route path="/tools/text-repeater" component={TextRepeater} />
        <Route path="/tools/sentence-case-converter" component={SentenceCaseConverter} />
        <Route path="/tools/utm-builder" component={UTMBuilder} />
        <Route path="/tools/meta-tag-generator" component={MetaTagGenerator} />
        <Route path="/tools/og-preview" component={OGPreview} />
        <Route path="/tools/timer-stopwatch" component={TimerStopwatch} />
        <Route path="/tools/invoice-generator" component={InvoiceGenerator} />
        <Route path="/tools/receipt-generator" component={ReceiptGenerator} />
        <Route path="/tools/quotation-generator" component={QuotationGenerator} />
        <Route path="/tools/area-converter" component={AreaConverter} />
        <Route path="/tools/commission-calculator" component={CommissionCalculator} />
        <Route path="/tools/emi-calculator" component={EMICalculator} />
        <Route path="/tools/percentage-calculator" component={PercentageCalculator} />
        <Route path="/tools/age-calculator" component={AgeCalculator} />
        <Route path="/tools/time-difference-calculator" component={TimeDifferenceCalculator} />
        <Route path="/tools/expense-tracker" component={ExpenseTracker} />
        <Route path="/tools/text-to-speech" component={TextToSpeech} />
        <Route path="/tools/speech-to-text" component={SpeechToText} />
        <Route path="/tools/unit-converter" component={UnitConverter} />
        <Route path="/tools/ascii-converter" component={ASCIIConverter} />
        <Route path="/tools/character-map" component={CharacterMap} />
        <Route path="/tools/average-calculator" component={AverageCalculator} />
        <Route path="/tools/random-string-generator" component={RandomStringGenerator} />
        <Route path="/tools/tip-calculator" component={TipCalculator} />
        <Route path="/tools/currency-formatter" component={CurrencyFormatter} />
        <Route path="/tools/days-calculator" component={DaysCalculator} />
        <Route path="/tools/stopwatch" component={Stopwatch} />
        <Route path="/tools/countdown-timer" component={CountdownTimer} />
        <Route path="/tools/loan-calculator" component={LoanCalculator} />
        <Route path="/tools/mortgage-calculator" component={MortgageCalculator} />
        <Route path="/tools/text-diff" component={TextDiff} />
        <Route path="/tools/pdf-merger" component={PDFMerger} />
        <Route path="/tools/pdf-splitter" component={PDFSplitter} />
        <Route path="/tools/pdf-rotator" component={PDFRotator} />
        <Route path="/tools/pdf-to-image" component={PDFToImage} />
        <Route path="/tools/image-to-pdf" component={ImageToPDF} />
        <Route path="/tools/fraction-calculator" component={FractionCalculator} />
        <Route path="/tools/roman-numeral-converter" component={RomanNumeralConverter} />
        <Route path="/tools/text-cleaner" component={TextCleaner} />
        <Route path="/tools/text-encrypt-decrypt" component={TextEncryptDecrypt} />
        <Route path="/tools/hash-generator" component={HashGenerator} />
        <Route path="/tools/number-sorter" component={NumberSorter} />
        <Route path="/tools/pay-split-calculator" component={PaySplitCalculator} />
        <Route path="/tools/matrix-calculator" component={MatrixCalculator} />
        <Route path="/tools/case-randomizer" component={CaseRandomizer} />
        <Route path="/tools/bmi-calculator" component={BMICalculator} />
        <Route path="/tools/calorie-calculator" component={CalorieCalculator} />
        <Route path="/tools/hex-color-picker-tool" component={HexColorPickerTool} />
        <Route path="/tools/screen-resolution-checker" component={ScreenResolutionChecker} />
        <Route path="/tools/uuid-generator" component={UUIDGenerator} />
        <Route path="/tools/word-shuffler" component={WordShuffler} />
        <Route path="/tools/remove-duplicate-words" component={RemoveDuplicateWords} />
        <Route path="/tools/remove-duplicate-lines" component={RemoveDuplicateLines} />
        <Route path="/tools/line-break-remover" component={LineBreakRemover} />
        <Route path="/tools/silent-text" component={SilentText} />
        <Route path="/tools/random-date-generator" component={RandomDateGenerator} />
        <Route path="/tools/random-country-generator" component={RandomCountryGenerator} />
        <Route path="/tools/todo-list" component={TodoList} />
        <Route path="/tools/notes-app" component={NotesApp} />
        <Route path="/tools/character-paragraph-counter" component={CharacterParagraphCounter} />
        <Route path="/tools/keyword-density-checker" component={KeywordDensityChecker} />
        <Route path="/tools/html-table-generator" component={HTMLTableGenerator} />
        <Route path="/tools/text-reverser" component={TextReverser} />
        <Route path="/tools/palindrome-checker" component={PalindromeChecker} />
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
        <SearchProvider>
          <TooltipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <SearchDialog />
            <Toaster />
          </TooltipProvider>
        </SearchProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
