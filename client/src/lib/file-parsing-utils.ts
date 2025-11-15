import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface TextExtractionResult {
  text: string;
  wordCount: number;
  characterCount: number;
}

/**
 * Extract text from a TXT file
 */
export async function extractTextFromTXT(file: File): Promise<TextExtractionResult> {
  const text = await file.text();
  return {
    text,
    wordCount: text.trim().split(/\s+/).filter(w => w.length > 0).length,
    characterCount: text.length,
  };
}

/**
 * Extract text from a Markdown file
 */
export async function extractTextFromMarkdown(file: File): Promise<TextExtractionResult> {
  const text = await file.text();
  // Remove markdown syntax for accurate word count
  const plainText = text
    .replace(/^#{1,6}\s+/gm, '') // Remove headers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.+?)\*/g, '$1') // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
    .replace(/`{1,3}[^`]+`{1,3}/g, ''); // Remove code blocks
  
  return {
    text: plainText,
    wordCount: plainText.trim().split(/\s+/).filter(w => w.length > 0).length,
    characterCount: plainText.length,
  };
}

/**
 * Extract text from a PDF file using pdf.js
 */
export async function extractTextFromPDF(file: File): Promise<TextExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return {
    text: fullText,
    wordCount: fullText.trim().split(/\s+/).filter(w => w.length > 0).length,
    characterCount: fullText.length,
  };
}

/**
 * Extract text from a DOCX file using mammoth
 */
export async function extractTextFromDOCX(file: File): Promise<TextExtractionResult> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;
  
  return {
    text,
    wordCount: text.trim().split(/\s+/).filter(w => w.length > 0).length,
    characterCount: text.length,
  };
}

/**
 * Extract text from any supported file type
 */
export async function extractTextFromFile(file: File): Promise<TextExtractionResult> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'txt':
      return extractTextFromTXT(file);
    case 'md':
    case 'markdown':
      return extractTextFromMarkdown(file);
    case 'pdf':
      return extractTextFromPDF(file);
    case 'docx':
      return extractTextFromDOCX(file);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

/**
 * Get supported file types for text extraction
 */
export function getSupportedTextFileTypes(): string[] {
  return ['.txt', '.pdf', '.docx', '.md', '.markdown'];
}

/**
 * Get MIME types for file input accept attribute
 */
export function getSupportedTextFileMimeTypes(): string {
  return 'text/plain,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/markdown';
}
