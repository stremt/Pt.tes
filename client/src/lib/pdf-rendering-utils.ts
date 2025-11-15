import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface PDFPageImage {
  pageNumber: number;
  imageUrl: string;
  width: number;
  height: number;
}

export interface PDFRenderOptions {
  scale?: number;
  format?: 'png' | 'jpeg';
  quality?: number;
}

/**
 * Render a single PDF page to canvas and return as image URL
 */
export async function renderPDFPageToImage(
  pdf: pdfjsLib.PDFDocumentProxy,
  pageNumber: number,
  options: PDFRenderOptions = {}
): Promise<PDFPageImage> {
  const { scale = 2, format = 'png', quality = 0.95 } = options;
  
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  if (!context) {
    throw new Error('Failed to get canvas context');
  }
  
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  
  await page.render({
    canvasContext: context,
    viewport,
    canvas,
  }).promise;
  
  const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const imageUrl = canvas.toDataURL(mimeType, quality);
  
  return {
    pageNumber,
    imageUrl,
    width: viewport.width,
    height: viewport.height,
  };
}

/**
 * Render all pages of a PDF to images
 */
export async function renderPDFToImages(
  file: File,
  options: PDFRenderOptions = {},
  onProgress?: (current: number, total: number) => void
): Promise<PDFPageImage[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const images: PDFPageImage[] = [];
  const totalPages = pdf.numPages;
  
  for (let i = 1; i <= totalPages; i++) {
    const pageImage = await renderPDFPageToImage(pdf, i, options);
    images.push(pageImage);
    
    if (onProgress) {
      onProgress(i, totalPages);
    }
  }
  
  return images;
}

/**
 * Download a single page image
 */
export function downloadPageImage(pageImage: PDFPageImage, filename: string): void {
  const link = document.createElement('a');
  link.href = pageImage.imageUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download all page images as a ZIP (simple sequential download)
 */
export function downloadAllPageImages(images: PDFPageImage[], baseFilename: string): void {
  images.forEach((pageImage, index) => {
    const format = pageImage.imageUrl.includes('image/jpeg') ? 'jpg' : 'png';
    const filename = `${baseFilename}_page_${pageImage.pageNumber}.${format}`;
    
    // Add slight delay between downloads to avoid browser blocking
    setTimeout(() => {
      downloadPageImage(pageImage, filename);
    }, index * 100);
  });
}

/**
 * Get PDF information
 */
export async function getPDFMetadata(file: File): Promise<{
  numPages: number;
  fileSize: number;
  fileSizeFormatted: string;
}> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  return {
    numPages: pdf.numPages,
    fileSize: file.size,
    fileSizeFormatted: formatSize(file.size),
  };
}
