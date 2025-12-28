import { HelmetProvider } from "react-helmet-async";
import { useEffect, Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { SearchDialog } from "@/components/SearchDialog";
import { FeedbackButton } from "@/components/FeedbackButton";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/PageLoader";
import { checkAndHandleVersionChange } from "@/lib/versionManager";

// Eagerly load pages (non-tool pages)
import Home from "@/pages/Home";
import Tools from "@/pages/Tools";
import NotFound from "@/pages/not-found";
import PrivacyCategory from "@/pages/PrivacyCategory";
import TextCategory from "@/pages/TextCategory";
import ImageCategory from "@/pages/ImageCategory";
import PDFCategory from "@/pages/PDFCategory";
import MediaCategory from "@/pages/MediaCategory";
import DeveloperCategory from "@/pages/DeveloperCategory";
import MathCategory from "@/pages/MathCategory";
import RandomCategory from "@/pages/RandomCategory";
import ProductivityCategory from "@/pages/ProductivityCategory";
import ColorCategory from "@/pages/ColorCategory";
import AICategory from "@/pages/AICategory";
import TempMailFacebookSignup from "@/pages/TempMailFacebookSignup";
import TempMailInstagramVerification from "@/pages/TempMailInstagramVerification";
import TempMailOnlineShopping from "@/pages/TempMailOnlineShopping";
import TempMailTestingAccounts from "@/pages/TempMailTestingAccounts";
import PasswordGeneratorOnlineAccounts from "@/pages/PasswordGeneratorOnlineAccounts";
import PasswordGeneratorSecurity from "@/pages/PasswordGeneratorSecurity";
import PasswordGeneratorBusiness from "@/pages/PasswordGeneratorBusiness";
import PasswordGeneratorTesting from "@/pages/PasswordGeneratorTesting";
import PasswordStrengthCheckOnline from "@/pages/PasswordStrengthCheckOnline";
import PasswordSecurityChecker from "@/pages/PasswordSecurityChecker";
import IsMyPasswordStrong from "@/pages/IsMyPasswordStrong";
import PasswordStrengthValidation from "@/pages/PasswordStrengthValidation";
import RandomStringGeneratorApiKeys from "@/pages/RandomStringGeneratorApiKeys";
import RandomStringGeneratorOnline from "@/pages/RandomStringGeneratorOnline";
import SecureRandomStringGenerator from "@/pages/SecureRandomStringGenerator";
import RandomStringGeneratorTesting from "@/pages/RandomStringGeneratorTesting";
import TextEncryptPrivateMessages from "@/pages/TextEncryptPrivateMessages";
import TextEncryptionOnline from "@/pages/TextEncryptionOnline";
import SecureMessageEncryption from "@/pages/SecureMessageEncryption";
import TextEncryptionStorage from "@/pages/TextEncryptionStorage";
import RemoveExifPhotoPrivacy from "@/pages/RemoveExifPhotoPrivacy";
import RemoveExifOnline from "@/pages/RemoveExifOnline";
import RemoveExifBeforeSharing from "@/pages/RemoveExifBeforeSharing";
import RemoveExifSocialMedia from "@/pages/RemoveExifSocialMedia";
import WordCounterEssays from "@/pages/WordCounterEssays";
import WordCounterOnline from "@/pages/WordCounterOnline";
import WordCounterContentMarketing from "@/pages/WordCounterContentMarketing";
import WordCounterSocialMedia from "@/pages/WordCounterSocialMedia";
import CompressImagesWeb from "@/pages/CompressImagesWeb";
import CompressJpgImages from "@/pages/CompressJpgImages";
import ReduceImageFileSize from "@/pages/ReduceImageFileSize";
import CompressPhotosEmail from "@/pages/CompressPhotosEmail";
import ResizeImagesSocialMedia from "@/pages/ResizeImagesSocialMedia";
import ResizeImagesOnline from "@/pages/ResizeImagesOnline";
import BulkResizeImages from "@/pages/BulkResizeImages";
import ResizeImageDimensions from "@/pages/ResizeImageDimensions";
import ConvertPdfToImage from "@/pages/ConvertPdfToImage";
import ConvertPdfToImageOnline from "@/pages/ConvertPdfToImageOnline";
import ConvertPdfToJpg from "@/pages/ConvertPdfToJpg";
import ExtractImagesFromPdf from "@/pages/ExtractImagesFromPdf";
import ConvertImageToPdf from "@/pages/ConvertImageToPdf";
import ConvertImageToPdfOnline from "@/pages/ConvertImageToPdfOnline";
import ConvertJpgToPdf from "@/pages/ConvertJpgToPdf";
import CombineImagesToPdf from "@/pages/CombineImagesToPdf";

import ConvertJpgToPng from "@/pages/ConvertJpgToPng";
import ConvertJpgToPngOnline from "@/pages/ConvertJpgToPngOnline";
import ConvertJpgToPngTransparent from "@/pages/ConvertJpgToPngTransparent";
import BatchConvertJpgToPng from "@/pages/BatchConvertJpgToPng";

import ConvertPngToJpg from "@/pages/ConvertPngToJpg";
import ConvertPngToJpgOnline from "@/pages/ConvertPngToJpgOnline";
import ConvertPngToJpgHighQuality from "@/pages/ConvertPngToJpgHighQuality";
import BatchConvertPngToJpg from "@/pages/BatchConvertPngToJpg";

import DownloadInstagramDpFullSize from "@/pages/DownloadInstagramDpFullSize";
import InstagramProfilePictureViewerOnline from "@/pages/InstagramProfilePictureViewerOnline";
import ViewPrivateInstagramProfilePicture from "@/pages/ViewPrivateInstagramProfilePicture";
import AnonymousInstagramProfilePictureDownloader from "@/pages/AnonymousInstagramProfilePictureDownloader";

import FreeInvoiceGeneratorFreelancers from "@/pages/FreeInvoiceGeneratorFreelancers";
import ProfessionalOnlineInvoiceCreator from "@/pages/ProfessionalOnlineInvoiceCreator";
import SmallBusinessInvoiceMaker from "@/pages/SmallBusinessInvoiceMaker";
import SimpleBillingGeneratorNonTechnicalUsers from "@/pages/SimpleBillingGeneratorNonTechnicalUsers";

import CombinePdfFilesOnline from "@/pages/CombinePdfFilesOnline";
import MergePdfDocumentsFree from "@/pages/MergePdfDocumentsFree";
import JoinMultiplePdfFiles from "@/pages/JoinMultiplePdfFiles";
import ProfessionalPdfBinderTool from "@/pages/ProfessionalPdfBinderTool";

import SplitPdfOnlineFree from "@/pages/SplitPdfOnlineFree";
import ExtractPagesFromPdf from "@/pages/ExtractPagesFromPdf";
import SeparatePdfPagesOnline from "@/pages/SeparatePdfPagesOnline";
import ProfessionalPdfDividerTool from "@/pages/ProfessionalPdfDividerTool";

import CompressPdfOnlineFree from "@/pages/CompressPdfOnlineFree";
import ReducePdfFileSize from "@/pages/ReducePdfFileSize";
import CompressPdfTo100kb from "@/pages/CompressPdfTo100kb";
import OptimizePdfForEmail from "@/pages/OptimizePdfForEmail";

import AddWatermarkToPdfOnline from "@/pages/AddWatermarkToPdfOnline";
import ProtectPdfWithWatermark from "@/pages/ProtectPdfWithWatermark";
import CustomPdfWatermarkCreator from "@/pages/CustomPdfWatermarkCreator";
import ProfessionalPdfWatermarkingTool from "@/pages/ProfessionalPdfWatermarkingTool";

// Lazily load all tool components
const TempMail = lazy(() => import("@/pages/tools/TempMail"));
const PasswordGenerator = lazy(() => import("@/pages/tools/PasswordGenerator"));
const QRMaker = lazy(() => import("@/pages/tools/QRMaker"));
const QRMakerFreeOnline = lazy(() => import("@/pages/tools/longtail/QRMakerFreeOnline"));
const QRMakerWiFi = lazy(() => import("@/pages/tools/longtail/QRMakerWiFi"));
const QRMakerBusinessCards = lazy(() => import("@/pages/tools/longtail/QRMakerBusinessCards"));
const QRMakerLogo = lazy(() => import("@/pages/tools/longtail/QRMakerLogo"));
const QRMakerEvents = lazy(() => import("@/pages/tools/longtail/QRMakerEvents"));
const QRMakerSocialMedia = lazy(() => import("@/pages/tools/longtail/QRMakerSocialMedia"));
const QRMakerProductLinks = lazy(() => import("@/pages/tools/longtail/QRMakerProductLinks"));
const QRMakerDynamic = lazy(() => import("@/pages/tools/longtail/QRMakerDynamic"));
const ImageCompressor = lazy(() => import("@/pages/tools/ImageCompressor"));
const TextCaseConverter = lazy(() => import("@/pages/tools/TextCaseConverter"));
const WordCounter = lazy(() => import("@/pages/tools/WordCounter"));
const JSONFormatter = lazy(() => import("@/pages/tools/JSONFormatter"));
const URLEncoder = lazy(() => import("@/pages/tools/URLEncoder"));
const ColorPicker = lazy(() => import("@/pages/tools/ColorPicker"));
const UsernameGenerator = lazy(() => import("@/pages/tools/UsernameGenerator"));
const PasswordStrengthChecker = lazy(() => import("@/pages/tools/PasswordStrengthChecker"));
const TextSummarizer = lazy(() => import("@/pages/tools/TextSummarizer"));
const ImageResizer = lazy(() => import("@/pages/tools/ImageResizer"));
const Base64Encoder = lazy(() => import("@/pages/tools/Base64Encoder"));
const BarcodeGenerator = lazy(() => import("@/pages/tools/BarcodeGenerator"));
const JSONCSVConverter = lazy(() => import("@/pages/tools/JSONCSVConverter"));
const JSONYAMLConverter = lazy(() => import("@/pages/tools/JSONYAMLConverter"));
const CodeBeautifier = lazy(() => import("@/pages/tools/CodeBeautifier"));
const CSSMinifier = lazy(() => import("@/pages/tools/CSSMinifier"));
const JSMinifier = lazy(() => import("@/pages/tools/JSMinifier"));
const HTMLBeautifier = lazy(() => import("@/pages/tools/HTMLBeautifier"));
const RegexTester = lazy(() => import("@/pages/tools/RegexTester"));
const MarkdownEditor = lazy(() => import("@/pages/tools/MarkdownEditor"));
const APISnippetBuilder = lazy(() => import("@/pages/tools/APISnippetBuilder"));
const TextDiffer = lazy(() => import("@/pages/tools/TextDiffer"));
const RandomNumberGenerator = lazy(() => import("@/pages/tools/RandomNumberGenerator"));
const HexRgbConverter = lazy(() => import("@/pages/tools/HexRgbConverter"));
const ColorPaletteGenerator = lazy(() => import("@/pages/tools/ColorPaletteGenerator"));
const GradientGenerator = lazy(() => import("@/pages/tools/GradientGenerator"));
const BoxShadowGenerator = lazy(() => import("@/pages/tools/BoxShadowGenerator"));
const BorderRadiusGenerator = lazy(() => import("@/pages/tools/BorderRadiusGenerator"));
const ImageToBase64 = lazy(() => import("@/pages/tools/ImageToBase64"));
const Base64ToImage = lazy(() => import("@/pages/tools/Base64ToImage"));
const ImageCropper = lazy(() => import("@/pages/tools/ImageCropper"));
const FaviconGenerator = lazy(() => import("@/pages/tools/FaviconGenerator"));
const FileToBase64 = lazy(() => import("@/pages/tools/FileToBase64"));
const HTMLEncoderDecoder = lazy(() => import("@/pages/tools/HTMLEncoderDecoder"));
const EmojiRemover = lazy(() => import("@/pages/tools/EmojiRemover"));
const TextRepeater = lazy(() => import("@/pages/tools/TextRepeater"));
const SentenceCaseConverter = lazy(() => import("@/pages/tools/SentenceCaseConverter"));
const UTMBuilder = lazy(() => import("@/pages/tools/UTMBuilder"));
const MetaTagGenerator = lazy(() => import("@/pages/tools/MetaTagGenerator"));
const OGPreview = lazy(() => import("@/pages/tools/OGPreview"));
const TimerStopwatch = lazy(() => import("@/pages/tools/TimerStopwatch"));
const InvoiceGenerator = lazy(() => import("@/pages/tools/InvoiceGenerator"));
const ReceiptGenerator = lazy(() => import("@/pages/tools/ReceiptGenerator"));
const QuotationGenerator = lazy(() => import("@/pages/tools/QuotationGenerator"));
const AreaConverter = lazy(() => import("@/pages/tools/AreaConverter"));
const CommissionCalculator = lazy(() => import("@/pages/tools/CommissionCalculator"));
const EMICalculator = lazy(() => import("@/pages/tools/EMICalculator"));
const PercentageCalculator = lazy(() => import("@/pages/tools/PercentageCalculator"));
const AgeCalculator = lazy(() => import("@/pages/tools/AgeCalculator"));
const TimeDifferenceCalculator = lazy(() => import("@/pages/tools/TimeDifferenceCalculator"));
const ExpenseTracker = lazy(() => import("@/pages/tools/ExpenseTracker"));
const TextToSpeech = lazy(() => import("@/pages/tools/TextToSpeech"));
const SpeechToText = lazy(() => import("@/pages/tools/SpeechToText"));
const UnitConverter = lazy(() => import("@/pages/tools/UnitConverter"));
const ASCIIConverter = lazy(() => import("@/pages/tools/ASCIIConverter"));
const CharacterMap = lazy(() => import("@/pages/tools/CharacterMap"));
const AverageCalculator = lazy(() => import("@/pages/tools/AverageCalculator"));
const RandomStringGenerator = lazy(() => import("@/pages/tools/RandomStringGenerator"));
const TipCalculator = lazy(() => import("@/pages/tools/TipCalculator"));
const CurrencyFormatter = lazy(() => import("@/pages/tools/CurrencyFormatter"));
const DaysCalculator = lazy(() => import("@/pages/tools/DaysCalculator"));
const Stopwatch = lazy(() => import("@/pages/tools/Stopwatch"));
const CountdownTimer = lazy(() => import("@/pages/tools/CountdownTimer"));
const LoanCalculator = lazy(() => import("@/pages/tools/LoanCalculator"));
const MortgageCalculator = lazy(() => import("@/pages/tools/MortgageCalculator"));
const TextDiff = lazy(() => import("@/pages/tools/TextDiff"));
const PDFMerger = lazy(() => import("@/pages/tools/PDFMerger"));
const PDFSplitter = lazy(() => import("@/pages/tools/PDFSplitter"));
const PDFRotator = lazy(() => import("@/pages/tools/PDFRotator"));
const PDFToImage = lazy(() => import("@/pages/tools/PDFToImage"));
const ImageToPDF = lazy(() => import("@/pages/tools/ImageToPDF"));
const FractionCalculator = lazy(() => import("@/pages/tools/FractionCalculator"));
const RomanNumeralConverter = lazy(() => import("@/pages/tools/RomanNumeralConverter"));
const TextCleaner = lazy(() => import("@/pages/tools/TextCleaner"));
const TextEncryptDecrypt = lazy(() => import("@/pages/tools/TextEncryptDecrypt"));
const HashGenerator = lazy(() => import("@/pages/tools/HashGenerator"));
const NumberSorter = lazy(() => import("@/pages/tools/NumberSorter"));
const PaySplitCalculator = lazy(() => import("@/pages/tools/PaySplitCalculator"));
const MatrixCalculator = lazy(() => import("@/pages/tools/MatrixCalculator"));
const CaseRandomizer = lazy(() => import("@/pages/tools/CaseRandomizer"));
const BMICalculator = lazy(() => import("@/pages/tools/BMICalculator"));
const CalorieCalculator = lazy(() => import("@/pages/tools/CalorieCalculator"));
const HexColorPickerTool = lazy(() => import("@/pages/tools/HexColorPickerTool"));
const ScreenResolutionChecker = lazy(() => import("@/pages/tools/ScreenResolutionChecker"));
const UUIDGenerator = lazy(() => import("@/pages/tools/UUIDGenerator"));
const WordShuffler = lazy(() => import("@/pages/tools/WordShuffler"));
const RemoveDuplicateWords = lazy(() => import("@/pages/tools/RemoveDuplicateWords"));
const RemoveDuplicateLines = lazy(() => import("@/pages/tools/RemoveDuplicateLines"));
const LineBreakRemover = lazy(() => import("@/pages/tools/LineBreakRemover"));
const SilentText = lazy(() => import("@/pages/tools/SilentText"));
const RandomDateGenerator = lazy(() => import("@/pages/tools/RandomDateGenerator"));
const RandomCountryGenerator = lazy(() => import("@/pages/tools/RandomCountryGenerator"));
const TodoList = lazy(() => import("@/pages/tools/TodoList"));
const NotesApp = lazy(() => import("@/pages/tools/NotesApp"));
const CharacterParagraphCounter = lazy(() => import("@/pages/tools/CharacterParagraphCounter"));
const KeywordDensityChecker = lazy(() => import("@/pages/tools/KeywordDensityChecker"));
const HTMLTableGenerator = lazy(() => import("@/pages/tools/HTMLTableGenerator"));
const TextReverser = lazy(() => import("@/pages/tools/TextReverser"));
const PalindromeChecker = lazy(() => import("@/pages/tools/PalindromeChecker"));
const TitleCaseConverter = lazy(() => import("@/pages/tools/TitleCaseConverter"));
const SlugGenerator = lazy(() => import("@/pages/tools/SlugGenerator"));
const MorseCodeTranslator = lazy(() => import("@/pages/tools/MorseCodeTranslator"));
const NATOPhoneticConverter = lazy(() => import("@/pages/tools/NATOPhoneticConverter"));
const SuperscriptGenerator = lazy(() => import("@/pages/tools/SuperscriptGenerator"));
const SubscriptGenerator = lazy(() => import("@/pages/tools/SubscriptGenerator"));
const GlitchTextGenerator = lazy(() => import("@/pages/tools/GlitchTextGenerator"));
const WordFrequencyCounter = lazy(() => import("@/pages/tools/WordFrequencyCounter"));
const TextSpacer = lazy(() => import("@/pages/tools/TextSpacer"));
const RandomEmojiGenerator = lazy(() => import("@/pages/tools/RandomEmojiGenerator"));
const DominantColorFinder = lazy(() => import("@/pages/tools/DominantColorFinder"));
const ImagePixelator = lazy(() => import("@/pages/tools/ImagePixelator"));
const ImageBlurTool = lazy(() => import("@/pages/tools/ImageBlurTool"));
const ExifRemover = lazy(() => import("@/pages/tools/ExifRemover"));
const GradientTextGenerator = lazy(() => import("@/pages/tools/GradientTextGenerator"));
const ButtonCSSGenerator = lazy(() => import("@/pages/tools/ButtonCSSGenerator"));
const FlexboxPlayground = lazy(() => import("@/pages/tools/FlexboxPlayground"));
const CSSGridGenerator = lazy(() => import("@/pages/tools/CSSGridGenerator"));
const OutlineCSSGenerator = lazy(() => import("@/pages/tools/OutlineCSSGenerator"));
const VariableFontViewer = lazy(() => import("@/pages/tools/VariableFontViewer"));
const RandomHexColor = lazy(() => import("@/pages/tools/RandomHexColor"));
const ColorPaletteShuffler = lazy(() => import("@/pages/tools/ColorPaletteShuffler"));
const AdvancedTextShadow = lazy(() => import("@/pages/tools/AdvancedTextShadow"));
const TextHighlightMarker = lazy(() => import("@/pages/tools/TextHighlightMarker"));
const FancyTextStyler = lazy(() => import("@/pages/tools/FancyTextStyler"));
const ASCIIArtGenerator = lazy(() => import("@/pages/tools/ASCIIArtGenerator"));
const SymbolCombiner = lazy(() => import("@/pages/tools/SymbolCombiner"));
const TextRotator = lazy(() => import("@/pages/tools/TextRotator"));
const PangramGenerator = lazy(() => import("@/pages/tools/PangramGenerator"));
const RandomWordGenerator = lazy(() => import("@/pages/tools/RandomWordGenerator"));
const JSONTreeViewer = lazy(() => import("@/pages/tools/JSONTreeViewer"));
const CSSClampGenerator = lazy(() => import("@/pages/tools/CSSClampGenerator"));
const CSSAnimationGenerator = lazy(() => import("@/pages/tools/CSSAnimationGenerator"));
const HTMLMinifier = lazy(() => import("@/pages/tools/HTMLMinifier"));
const ExtractNumbers = lazy(() => import("@/pages/tools/ExtractNumbers"));
const RemoveNumbers = lazy(() => import("@/pages/tools/RemoveNumbers"));
const ImageDarkenTool = lazy(() => import("@/pages/tools/ImageDarkenTool"));
const ImageLightenTool = lazy(() => import("@/pages/tools/ImageLightenTool"));
const ImageMirrorTool = lazy(() => import("@/pages/tools/ImageMirrorTool"));
const ImageInvertTool = lazy(() => import("@/pages/tools/ImageInvertTool"));
const ImageGrayscaleTool = lazy(() => import("@/pages/tools/ImageGrayscaleTool"));
const ImageRotateTool = lazy(() => import("@/pages/tools/ImageRotateTool"));
const SignaturePadTool = lazy(() => import("@/pages/tools/SignaturePadTool"));
const PrimeNumberChecker = lazy(() => import("@/pages/tools/PrimeNumberChecker"));
const PrimeNumberGenerator = lazy(() => import("@/pages/tools/PrimeNumberGenerator"));
const PrimeFactorization = lazy(() => import("@/pages/tools/PrimeFactorization"));
const LCMHCFCalculator = lazy(() => import("@/pages/tools/LCMHCFCalculator"));
const RatioSimplifier = lazy(() => import("@/pages/tools/RatioSimplifier"));
const PercentageChangeCalculator = lazy(() => import("@/pages/tools/PercentageChangeCalculator"));
const MeanMedianModeCalculator = lazy(() => import("@/pages/tools/MeanMedianModeCalculator"));
const TriangleAreaCalculator = lazy(() => import("@/pages/tools/TriangleAreaCalculator"));
const CircleCalculator = lazy(() => import("@/pages/tools/CircleCalculator"));
const FibonacciGenerator = lazy(() => import("@/pages/tools/FibonacciGenerator"));
const QuadraticSolver = lazy(() => import("@/pages/tools/QuadraticSolver"));
const ModuloCalculator = lazy(() => import("@/pages/tools/ModuloCalculator"));
const ExponentCalculator = lazy(() => import("@/pages/tools/ExponentCalculator"));
const SimpleInterestCalculator = lazy(() => import("@/pages/tools/SimpleInterestCalculator"));
const CompoundInterestCalculator = lazy(() => import("@/pages/tools/CompoundInterestCalculator"));
const AgeGapCalculator = lazy(() => import("@/pages/tools/AgeGapCalculator"));
const HeightConverter = lazy(() => import("@/pages/tools/HeightConverter"));
const RandomAnimalGenerator = lazy(() => import("@/pages/tools/RandomAnimalGenerator"));
const RandomObjectGenerator = lazy(() => import("@/pages/tools/RandomObjectGenerator"));
const RandomFakeAddress = lazy(() => import("@/pages/tools/RandomFakeAddress"));
const RandomMovieSuggestion = lazy(() => import("@/pages/tools/RandomMovieSuggestion"));
const RandomHindiName = lazy(() => import("@/pages/tools/RandomHindiName"));
const RandomTechStack = lazy(() => import("@/pages/tools/RandomTechStack"));
const RandomStartupIdea = lazy(() => import("@/pages/tools/RandomStartupIdea"));
const RandomRiddle = lazy(() => import("@/pages/tools/RandomRiddle"));
const RandomTask = lazy(() => import("@/pages/tools/RandomTask"));
const RandomSuperheroName = lazy(() => import("@/pages/tools/RandomSuperheroName"));
const RandomTruthDare = lazy(() => import("@/pages/tools/RandomTruthDare"));
const RandomMotivationalQuote = lazy(() => import("@/pages/tools/RandomMotivationalQuote"));
const PDFCompressor = lazy(() => import("@/pages/tools/PDFCompressor"));
const PDFPasswordRemover = lazy(() => import("@/pages/tools/PDFPasswordRemover"));
const PDFWatermarkAdder = lazy(() => import("@/pages/tools/PDFWatermarkAdder"));
const PDFWatermarkRemover = lazy(() => import("@/pages/tools/PDFWatermarkRemover"));
const HEICtoJPG = lazy(() => import("@/pages/tools/HEICtoJPG"));
const JPGtoPNG = lazy(() => import("@/pages/tools/JPGtoPNG"));
const PNGtoJPG = lazy(() => import("@/pages/tools/PNGtoJPG"));
const VideoToGIF = lazy(() => import("@/pages/tools/VideoToGIF"));
const GIFCompressor = lazy(() => import("@/pages/tools/GIFCompressor"));
const MP3Cutter = lazy(() => import("@/pages/tools/MP3Cutter"));
const AudioToMP3 = lazy(() => import("@/pages/tools/AudioToMP3"));
const VideoCompressor = lazy(() => import("@/pages/tools/VideoCompressor"));
const BackgroundRemover = lazy(() => import("@/pages/tools/BackgroundRemover"));
const ImageUpscaler = lazy(() => import("@/pages/tools/ImageUpscaler"));
const CSVViewer = lazy(() => import("@/pages/tools/CSVViewer"));
const ExcelToPDF = lazy(() => import("@/pages/tools/ExcelToPDF"));
const ExcelViewer = lazy(() => import("@/pages/tools/ExcelViewer"));
const HTMLtoPDF = lazy(() => import("@/pages/tools/HTMLtoPDF"));
const AudioNoiseRemover = lazy(() => import("@/pages/tools/AudioNoiseRemover"));
const GIFtoMP4 = lazy(() => import("@/pages/tools/GIFtoMP4"));
const MP4toMP3 = lazy(() => import("@/pages/tools/MP4toMP3"));
const YouTubeThumbnailDownloader = lazy(() => import("@/pages/tools/YouTubeThumbnailDownloader"));
const YouTubeThumbnailDownloaderFree = lazy(() => import("@/pages/tools/longtail/YouTubeThumbnailDownloaderFree"));
const YouTubeThumbnailDownloaderOnline = lazy(() => import("@/pages/tools/longtail/YouTubeThumbnailDownloaderOnline"));
const YouTubeThumbnailDownloaderChannels = lazy(() => import("@/pages/tools/longtail/YouTubeThumbnailDownloaderChannels"));
const YouTubeThumbnailDownloaderBest = lazy(() => import("@/pages/tools/longtail/YouTubeThumbnailDownloaderBest"));
const InstagramProfilePictureDownloader = lazy(() => import("@/pages/tools/InstagramProfilePictureDownloader"));

// Lazily load blog pages
const Blogs = lazy(() => import("@/pages/Blogs"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const BlogCategory = lazy(() => import("@/pages/BlogCategory"));
const BlogTag = lazy(() => import("@/pages/BlogTag"));
const BlogEditor = lazy(() => import("@/pages/BlogEditor"));

// Lazily load other pages
const Sitemap = lazy(() => import("@/pages/Sitemap"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const QADashboard = lazy(() => import("@/pages/QADashboard"));
const LongTailToolPage = lazy(() => import("@/pages/LongTailToolPage"));

function VersionCheck() {
  useEffect(() => {
    checkAndHandleVersionChange();
  }, []);
  
  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <VersionCheck />
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/tools" component={Tools} />
        <Route path="/tools/privacy" component={PrivacyCategory} />
        <Route path="/tools/text" component={TextCategory} />
        <Route path="/tools/image" component={ImageCategory} />
        <Route path="/tools/pdf" component={PDFCategory} />
        <Route path="/tools/media" component={MediaCategory} />
        <Route path="/tools/developer" component={DeveloperCategory} />
        <Route path="/tools/math" component={MathCategory} />
        <Route path="/tools/random" component={RandomCategory} />
        <Route path="/tools/productivity" component={ProductivityCategory} />
        <Route path="/tools/color" component={ColorCategory} />
        <Route path="/tools/ai" component={AICategory} />
        <Route path="/tools/temp-mail/facebook-signup" component={TempMailFacebookSignup} />
        <Route path="/tools/temp-mail/instagram-verification" component={TempMailInstagramVerification} />
        <Route path="/tools/temp-mail/online-shopping" component={TempMailOnlineShopping} />
        <Route path="/tools/temp-mail/testing-accounts" component={TempMailTestingAccounts} />
        <Route path="/tools/password-generator/online-accounts" component={PasswordGeneratorOnlineAccounts} />
        <Route path="/tools/password-generator/security" component={PasswordGeneratorSecurity} />
        <Route path="/tools/password-generator/business" component={PasswordGeneratorBusiness} />
        <Route path="/tools/password-generator/testing" component={PasswordGeneratorTesting} />
        <Route path="/tools/password-strength-checker/check-online" component={PasswordStrengthCheckOnline} />
        <Route path="/tools/password-strength-checker/security" component={PasswordSecurityChecker} />
        <Route path="/tools/password-strength-checker/is-strong" component={IsMyPasswordStrong} />
        <Route path="/tools/password-strength-checker/validation" component={PasswordStrengthValidation} />
        <Route path="/tools/random-string-generator/api-keys" component={RandomStringGeneratorApiKeys} />
        <Route path="/tools/random-string-generator/online" component={RandomStringGeneratorOnline} />
        <Route path="/tools/random-string-generator/secure" component={SecureRandomStringGenerator} />
        <Route path="/tools/random-string-generator/testing" component={RandomStringGeneratorTesting} />
        <Route path="/tools/text-encrypt-decrypt/private-messages" component={TextEncryptPrivateMessages} />
        <Route path="/tools/text-encrypt-decrypt/online" component={TextEncryptionOnline} />
        <Route path="/tools/text-encrypt-decrypt/secure" component={SecureMessageEncryption} />
        <Route path="/tools/text-encrypt-decrypt/storage" component={TextEncryptionStorage} />
        <Route path="/tools/image-exif-remover/privacy" component={RemoveExifPhotoPrivacy} />
        <Route path="/tools/image-exif-remover/online" component={RemoveExifOnline} />
        <Route path="/tools/image-exif-remover/before-sharing" component={RemoveExifBeforeSharing} />
        <Route path="/tools/image-exif-remover/social-media" component={RemoveExifSocialMedia} />
        <Route path="/tools/word-counter/essays" component={WordCounterEssays} />
        <Route path="/tools/word-counter/online" component={WordCounterOnline} />
        <Route path="/tools/word-counter/content-marketing" component={WordCounterContentMarketing} />
        <Route path="/tools/word-counter/social-media" component={WordCounterSocialMedia} />
        <Route path="/tools/image-compressor/web" component={CompressImagesWeb} />
        <Route path="/tools/image-compressor/jpg" component={CompressJpgImages} />
        <Route path="/tools/image-compressor/reduce-file-size" component={ReduceImageFileSize} />
        <Route path="/tools/image-compressor/email" component={CompressPhotosEmail} />
        <Route path="/tools/image-resizer/social-media" component={ResizeImagesSocialMedia} />
        <Route path="/tools/image-resizer/online" component={ResizeImagesOnline} />
        <Route path="/tools/image-resizer/bulk" component={BulkResizeImages} />
        <Route path="/tools/image-resizer/dimensions" component={ResizeImageDimensions} />
        <Route path="/tools/pdf-to-image/convert" component={ConvertPdfToImage} />
        <Route path="/tools/pdf-to-image/online" component={ConvertPdfToImageOnline} />
        <Route path="/tools/pdf-to-image/jpg" component={ConvertPdfToJpg} />
        <Route path="/tools/pdf-to-image/extract" component={ExtractImagesFromPdf} />
        <Route path="/qa-dashboard" component={QADashboard} />
        <Route path="/tools/temp-mail" component={TempMail} />
        <Route path="/tools/password-generator" component={PasswordGenerator} />
        <Route path="/tools/qr-code-maker/free-online" component={QRMakerFreeOnline} />
        <Route path="/tools/qr-code-maker/wifi-network" component={QRMakerWiFi} />
        <Route path="/tools/qr-code-maker/business-cards" component={QRMakerBusinessCards} />
        <Route path="/tools/qr-code-maker/with-logo" component={QRMakerLogo} />
        <Route path="/tools/qr-code-maker/event-ticketing" component={QRMakerEvents} />
        <Route path="/tools/qr-code-maker/social-media" component={QRMakerSocialMedia} />
        <Route path="/tools/qr-code-maker/product-links" component={QRMakerProductLinks} />
        <Route path="/tools/qr-code-maker/dynamic" component={QRMakerDynamic} />
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
        <Route path="/tools/pdf-compressor" component={PDFCompressor} />
        <Route path="/tools/pdf-password-remover" component={PDFPasswordRemover} />
        <Route path="/tools/pdf-watermark-adder" component={PDFWatermarkAdder} />
        <Route path="/tools/pdf-watermark-remover" component={PDFWatermarkRemover} />
        <Route path="/tools/heic-to-jpg" component={HEICtoJPG} />
        <Route path="/tools/jpg-to-png" component={JPGtoPNG} />
        <Route path="/tools/png-to-jpg" component={PNGtoJPG} />
        <Route path="/tools/video-to-gif" component={VideoToGIF} />
        <Route path="/tools/gif-compressor" component={GIFCompressor} />
        <Route path="/tools/mp3-cutter" component={MP3Cutter} />
        <Route path="/tools/audio-to-mp3" component={AudioToMP3} />
        <Route path="/tools/video-compressor" component={VideoCompressor} />
        <Route path="/tools/background-remover" component={BackgroundRemover} />
        <Route path="/tools/image-upscaler" component={ImageUpscaler} />
        <Route path="/tools/csv-viewer" component={CSVViewer} />
        <Route path="/tools/excel-to-pdf" component={ExcelToPDF} />
        <Route path="/tools/excel-viewer" component={ExcelViewer} />
        <Route path="/tools/html-to-pdf" component={HTMLtoPDF} />
        <Route path="/tools/audio-noise-remover" component={AudioNoiseRemover} />
        <Route path="/tools/gif-to-mp4" component={GIFtoMP4} />
        <Route path="/tools/mp4-to-mp3" component={MP4toMP3} />
        <Route path="/tools/youtube-thumbnail-downloader/free-no-login" component={YouTubeThumbnailDownloaderFree} />
        <Route path="/tools/youtube-thumbnail-downloader/online" component={YouTubeThumbnailDownloaderOnline} />
        <Route path="/tools/youtube-thumbnail-downloader/channel-thumbnails" component={YouTubeThumbnailDownloaderChannels} />
        <Route path="/tools/youtube-thumbnail-downloader/best" component={YouTubeThumbnailDownloaderBest} />
        <Route path="/tools/youtube-thumbnail-downloader" component={YouTubeThumbnailDownloader} />
        <Route path="/tools/instagram-profile-picture-downloader" component={InstagramProfilePictureDownloader} />
        <Route path="/blogs" component={Blogs} />
        <Route path="/blog-editor" component={BlogEditor} />
        <Route path="/sitemap-generator" component={Sitemap} />
        <Route path="/blogs/category/:category" component={BlogCategory} />
        <Route path="/blogs/tag/:tag" component={BlogTag} />
        <Route path="/blogs/:slug" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/tools/:toolId/:useCaseSlug" component={LongTailToolPage} />
        <Route path="/tools/image-to-pdf/convert" component={ConvertImageToPdf} />
        <Route path="/tools/image-to-pdf/online" component={ConvertImageToPdfOnline} />
        <Route path="/tools/image-to-pdf/jpg-to-pdf" component={ConvertJpgToPdf} />
        <Route path="/tools/image-to-pdf/combine" component={CombineImagesToPdf} />
        <Route path="/tools/jpg-to-png/convert" component={ConvertJpgToPng} />
        <Route path="/tools/jpg-to-png/online" component={ConvertJpgToPngOnline} />
        <Route path="/tools/jpg-to-png/transparent" component={ConvertJpgToPngTransparent} />
        <Route path="/tools/jpg-to-png/batch" component={BatchConvertJpgToPng} />
        <Route path="/tools/png-to-jpg/convert" component={ConvertPngToJpg} />
        <Route path="/tools/png-to-jpg/online" component={ConvertPngToJpgOnline} />
        <Route path="/tools/png-to-jpg/high-quality" component={ConvertPngToJpgHighQuality} />
        <Route path="/tools/png-to-jpg/batch" component={BatchConvertPngToJpg} />
        <Route path="/tools/instagram-downloader/dp-full-size" component={DownloadInstagramDpFullSize} />
        <Route path="/tools/instagram-downloader/online-viewer" component={InstagramProfilePictureViewerOnline} />
        <Route path="/tools/instagram-downloader/private-profile" component={ViewPrivateInstagramProfilePicture} />
        <Route path="/tools/instagram-downloader/anonymous" component={AnonymousInstagramProfilePictureDownloader} />
        <Route path="/tools/invoice-generator/freelancers" component={FreeInvoiceGeneratorFreelancers} />
        <Route path="/tools/invoice-generator/online-creator" component={ProfessionalOnlineInvoiceCreator} />
        <Route path="/tools/invoice-generator/small-business" component={SmallBusinessInvoiceMaker} />
        <Route path="/tools/invoice-generator/simple-billing" component={SimpleBillingGeneratorNonTechnicalUsers} />
        <Route path="/tools/pdf-merger/combine" component={CombinePdfFilesOnline} />
        <Route path="/tools/pdf-merger/free" component={MergePdfDocumentsFree} />
        <Route path="/tools/pdf-merger/join" component={JoinMultiplePdfFiles} />
        <Route path="/tools/pdf-merger/professional" component={ProfessionalPdfBinderTool} />
        <Route path="/tools/pdf-splitter/online" component={SplitPdfOnlineFree} />
        <Route path="/tools/pdf-splitter/extract" component={ExtractPagesFromPdf} />
        <Route path="/tools/pdf-splitter/separate" component={SeparatePdfPagesOnline} />
        <Route path="/tools/pdf-splitter/professional" component={ProfessionalPdfDividerTool} />
        <Route path="/tools/pdf-compressor/online" component={CompressPdfOnlineFree} />
        <Route path="/tools/pdf-compressor/reduce-size" component={ReducePdfFileSize} />
        <Route path="/tools/pdf-compressor/100kb" component={CompressPdfTo100kb} />
        <Route path="/tools/pdf-compressor/email" component={OptimizePdfForEmail} />
        <Route path="/tools/pdf-watermark-adder/online" component={AddWatermarkToPdfOnline} />
        <Route path="/tools/pdf-watermark-adder/protect" component={ProtectPdfWithWatermark} />
        <Route path="/tools/pdf-watermark-adder/custom" component={CustomPdfWatermarkCreator} />
        <Route path="/tools/pdf-watermark-adder/professional" component={ProfessionalPdfWatermarkingTool} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
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
              <FeedbackButton />
              <Toaster />
            </TooltipProvider>
          </SearchProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
