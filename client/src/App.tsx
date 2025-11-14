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
import TitleCaseConverter from "@/pages/tools/TitleCaseConverter";
import SlugGenerator from "@/pages/tools/SlugGenerator";
import MorseCodeTranslator from "@/pages/tools/MorseCodeTranslator";
import NATOPhoneticConverter from "@/pages/tools/NATOPhoneticConverter";
import SuperscriptGenerator from "@/pages/tools/SuperscriptGenerator";
import SubscriptGenerator from "@/pages/tools/SubscriptGenerator";
import GlitchTextGenerator from "@/pages/tools/GlitchTextGenerator";
import WordFrequencyCounter from "@/pages/tools/WordFrequencyCounter";
import TextSpacer from "@/pages/tools/TextSpacer";
import RandomEmojiGenerator from "@/pages/tools/RandomEmojiGenerator";
import DominantColorFinder from "@/pages/tools/DominantColorFinder";
import ImagePixelator from "@/pages/tools/ImagePixelator";
import ImageBlurTool from "@/pages/tools/ImageBlurTool";
import ExifRemover from "@/pages/tools/ExifRemover";
import GradientTextGenerator from "@/pages/tools/GradientTextGenerator";
import ButtonCSSGenerator from "@/pages/tools/ButtonCSSGenerator";
import FlexboxPlayground from "@/pages/tools/FlexboxPlayground";
import CSSGridGenerator from "@/pages/tools/CSSGridGenerator";
import OutlineCSSGenerator from "@/pages/tools/OutlineCSSGenerator";
import VariableFontViewer from "@/pages/tools/VariableFontViewer";
import RandomHexColor from "@/pages/tools/RandomHexColor";
import ColorPaletteShuffler from "@/pages/tools/ColorPaletteShuffler";
import AdvancedTextShadow from "@/pages/tools/AdvancedTextShadow";
import TextHighlightMarker from "@/pages/tools/TextHighlightMarker";
import FancyTextStyler from "@/pages/tools/FancyTextStyler";
import ASCIIArtGenerator from "@/pages/tools/ASCIIArtGenerator";
import SymbolCombiner from "@/pages/tools/SymbolCombiner";
import TextRotator from "@/pages/tools/TextRotator";
import PangramGenerator from "@/pages/tools/PangramGenerator";
import RandomWordGenerator from "@/pages/tools/RandomWordGenerator";
import JSONTreeViewer from "@/pages/tools/JSONTreeViewer";
import CSSClampGenerator from "@/pages/tools/CSSClampGenerator";
import CSSAnimationGenerator from "@/pages/tools/CSSAnimationGenerator";
import HTMLMinifier from "@/pages/tools/HTMLMinifier";
import ExtractNumbers from "@/pages/tools/ExtractNumbers";
import RemoveNumbers from "@/pages/tools/RemoveNumbers";
import ImageDarkenTool from "@/pages/tools/ImageDarkenTool";
import ImageLightenTool from "@/pages/tools/ImageLightenTool";
import ImageMirrorTool from "@/pages/tools/ImageMirrorTool";
import ImageInvertTool from "@/pages/tools/ImageInvertTool";
import ImageGrayscaleTool from "@/pages/tools/ImageGrayscaleTool";
import ImageRotateTool from "@/pages/tools/ImageRotateTool";
import SignaturePadTool from "@/pages/tools/SignaturePadTool";
import PrimeNumberChecker from "@/pages/tools/PrimeNumberChecker";
import PrimeNumberGenerator from "@/pages/tools/PrimeNumberGenerator";
import PrimeFactorization from "@/pages/tools/PrimeFactorization";
import LCMHCFCalculator from "@/pages/tools/LCMHCFCalculator";
import RatioSimplifier from "@/pages/tools/RatioSimplifier";
import PercentageChangeCalculator from "@/pages/tools/PercentageChangeCalculator";
import MeanMedianModeCalculator from "@/pages/tools/MeanMedianModeCalculator";
import TriangleAreaCalculator from "@/pages/tools/TriangleAreaCalculator";
import CircleCalculator from "@/pages/tools/CircleCalculator";
import FibonacciGenerator from "@/pages/tools/FibonacciGenerator";
import QuadraticSolver from "@/pages/tools/QuadraticSolver";
import ModuloCalculator from "@/pages/tools/ModuloCalculator";
import ExponentCalculator from "@/pages/tools/ExponentCalculator";
import SimpleInterestCalculator from "@/pages/tools/SimpleInterestCalculator";
import CompoundInterestCalculator from "@/pages/tools/CompoundInterestCalculator";
import AgeGapCalculator from "@/pages/tools/AgeGapCalculator";
import HeightConverter from "@/pages/tools/HeightConverter";
import RandomAnimalGenerator from "@/pages/tools/RandomAnimalGenerator";
import RandomObjectGenerator from "@/pages/tools/RandomObjectGenerator";
import RandomFakeAddress from "@/pages/tools/RandomFakeAddress";
import RandomMovieSuggestion from "@/pages/tools/RandomMovieSuggestion";
import RandomHindiName from "@/pages/tools/RandomHindiName";
import RandomTechStack from "@/pages/tools/RandomTechStack";
import RandomStartupIdea from "@/pages/tools/RandomStartupIdea";
import RandomRiddle from "@/pages/tools/RandomRiddle";
import RandomTask from "@/pages/tools/RandomTask";
import RandomSuperheroName from "@/pages/tools/RandomSuperheroName";
import RandomTruthDare from "@/pages/tools/RandomTruthDare";
import RandomMotivationalQuote from "@/pages/tools/RandomMotivationalQuote";
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
        <Route path="/tools/title-case-converter" component={TitleCaseConverter} />
        <Route path="/tools/slug-generator" component={SlugGenerator} />
        <Route path="/tools/morse-code-translator" component={MorseCodeTranslator} />
        <Route path="/tools/nato-phonetic-converter" component={NATOPhoneticConverter} />
        <Route path="/tools/superscript-generator" component={SuperscriptGenerator} />
        <Route path="/tools/subscript-generator" component={SubscriptGenerator} />
        <Route path="/tools/glitch-text-generator" component={GlitchTextGenerator} />
        <Route path="/tools/word-frequency-counter" component={WordFrequencyCounter} />
        <Route path="/tools/text-spacer" component={TextSpacer} />
        <Route path="/tools/random-emoji-generator" component={RandomEmojiGenerator} />
        <Route path="/tools/dominant-color-finder" component={DominantColorFinder} />
        <Route path="/tools/image-pixelator" component={ImagePixelator} />
        <Route path="/tools/image-blur-tool" component={ImageBlurTool} />
        <Route path="/tools/exif-remover" component={ExifRemover} />
        <Route path="/tools/gradient-text-generator" component={GradientTextGenerator} />
        <Route path="/tools/button-css-generator" component={ButtonCSSGenerator} />
        <Route path="/tools/flexbox-playground" component={FlexboxPlayground} />
        <Route path="/tools/css-grid-generator" component={CSSGridGenerator} />
        <Route path="/tools/outline-css-generator" component={OutlineCSSGenerator} />
        <Route path="/tools/variable-font-viewer" component={VariableFontViewer} />
        <Route path="/tools/random-hex-color" component={RandomHexColor} />
        <Route path="/tools/color-palette-shuffler" component={ColorPaletteShuffler} />
        <Route path="/tools/advanced-text-shadow" component={AdvancedTextShadow} />
        <Route path="/tools/text-highlight-marker" component={TextHighlightMarker} />
        <Route path="/tools/fancy-text-styler" component={FancyTextStyler} />
        <Route path="/tools/ascii-art-generator" component={ASCIIArtGenerator} />
        <Route path="/tools/symbol-combiner" component={SymbolCombiner} />
        <Route path="/tools/text-rotator" component={TextRotator} />
        <Route path="/tools/pangram-generator" component={PangramGenerator} />
        <Route path="/tools/random-word-generator" component={RandomWordGenerator} />
        <Route path="/tools/json-tree-viewer" component={JSONTreeViewer} />
        <Route path="/tools/css-clamp-generator" component={CSSClampGenerator} />
        <Route path="/tools/css-animation-generator" component={CSSAnimationGenerator} />
        <Route path="/tools/html-minifier" component={HTMLMinifier} />
        <Route path="/tools/extract-numbers" component={ExtractNumbers} />
        <Route path="/tools/remove-numbers" component={RemoveNumbers} />
        <Route path="/tools/image-darken-tool" component={ImageDarkenTool} />
        <Route path="/tools/image-lighten-tool" component={ImageLightenTool} />
        <Route path="/tools/image-mirror-tool" component={ImageMirrorTool} />
        <Route path="/tools/image-invert-tool" component={ImageInvertTool} />
        <Route path="/tools/image-grayscale-tool" component={ImageGrayscaleTool} />
        <Route path="/tools/image-rotate-tool" component={ImageRotateTool} />
        <Route path="/tools/signature-pad-tool" component={SignaturePadTool} />
        <Route path="/tools/prime-number-checker" component={PrimeNumberChecker} />
        <Route path="/tools/prime-number-generator" component={PrimeNumberGenerator} />
        <Route path="/tools/prime-factorization" component={PrimeFactorization} />
        <Route path="/tools/lcm-hcf-calculator" component={LCMHCFCalculator} />
        <Route path="/tools/ratio-simplifier" component={RatioSimplifier} />
        <Route path="/tools/percentage-change-calculator" component={PercentageChangeCalculator} />
        <Route path="/tools/mean-median-mode-calculator" component={MeanMedianModeCalculator} />
        <Route path="/tools/triangle-area-calculator" component={TriangleAreaCalculator} />
        <Route path="/tools/circle-calculator" component={CircleCalculator} />
        <Route path="/tools/fibonacci-generator" component={FibonacciGenerator} />
        <Route path="/tools/quadratic-solver" component={QuadraticSolver} />
        <Route path="/tools/modulo-calculator" component={ModuloCalculator} />
        <Route path="/tools/exponent-calculator" component={ExponentCalculator} />
        <Route path="/tools/simple-interest-calculator" component={SimpleInterestCalculator} />
        <Route path="/tools/compound-interest-calculator" component={CompoundInterestCalculator} />
        <Route path="/tools/age-gap-calculator" component={AgeGapCalculator} />
        <Route path="/tools/height-converter" component={HeightConverter} />
        <Route path="/tools/random-animal-generator" component={RandomAnimalGenerator} />
        <Route path="/tools/random-object-generator" component={RandomObjectGenerator} />
        <Route path="/tools/random-fake-address" component={RandomFakeAddress} />
        <Route path="/tools/random-movie-suggestion" component={RandomMovieSuggestion} />
        <Route path="/tools/random-hindi-name" component={RandomHindiName} />
        <Route path="/tools/random-tech-stack" component={RandomTechStack} />
        <Route path="/tools/random-startup-idea" component={RandomStartupIdea} />
        <Route path="/tools/random-riddle" component={RandomRiddle} />
        <Route path="/tools/random-task" component={RandomTask} />
        <Route path="/tools/random-superhero-name" component={RandomSuperheroName} />
        <Route path="/tools/random-truth-dare" component={RandomTruthDare} />
        <Route path="/tools/random-motivational-quote" component={RandomMotivationalQuote} />
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
