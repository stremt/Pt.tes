import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

export type CompressionLevel = 'standard' | 'maximum';

export interface CompressPDFOptions {
  level?: CompressionLevel;
  removeMetadata?: boolean;
}

export async function compressPDF(
  file: File,
  options: CompressPDFOptions = {}
): Promise<Blob> {
  const { level = 'standard', removeMetadata = level === 'maximum' } = options;
  
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Configure save options based on compression level
  const saveOptions: any = {
    addDefaultPage: false,
  };

  if (level === 'maximum') {
    // Maximum compression with object streams
    saveOptions.useObjectStreams = true;
    
    // Remove all metadata for maximum compression
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(new Date(0));
    pdfDoc.setModificationDate(new Date(0));
  } else {
    // Standard compression
    saveOptions.useObjectStreams = true;
    
    // Only remove metadata if specified
    if (removeMetadata) {
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setSubject('');
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer('');
      pdfDoc.setCreator('');
    }
  }

  const pdfBytes = await pdfDoc.save(saveOptions);

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export interface WatermarkOptions {
  text: string;
  opacity?: number;
  fontSize?: number;
  rotation?: number;
  color?: { r: number; g: number; b: number };
  position?: 'center' | 'diagonal' | 'bottom' | 'top';
}

export async function addWatermarkToPDF(
  file: File,
  options: WatermarkOptions
): Promise<Blob> {
  const {
    text,
    opacity = 0.3,
    fontSize = 50,
    rotation = 45,
    color = { r: 0.5, g: 0.5, b: 0.5 },
    position = 'diagonal'
  } = options;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textHeight = fontSize;

    let x: number, y: number, rotationAngle: number;

    switch (position) {
      case 'center':
        x = (width - textWidth) / 2;
        y = height / 2;
        rotationAngle = 0;
        break;
      case 'diagonal':
        x = width / 2;
        y = height / 2;
        rotationAngle = rotation;
        break;
      case 'bottom':
        x = (width - textWidth) / 2;
        y = 50;
        rotationAngle = 0;
        break;
      case 'top':
        x = (width - textWidth) / 2;
        y = height - 50 - textHeight;
        rotationAngle = 0;
        break;
      default:
        x = width / 2;
        y = height / 2;
        rotationAngle = rotation;
    }

    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: degrees(rotationAngle),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function removePasswordFromPDF(
  file: File,
  _password: string
): Promise<Blob> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    });

    const pdfBytes = await pdfDoc.save();
    return new Blob([pdfBytes], { type: 'application/pdf' });
  } catch (error) {
    if (error instanceof Error && error.message.includes('encrypt')) {
      throw new Error('This PDF is encrypted and cannot be processed in the browser');
    }
    throw new Error('Failed to process PDF');
  }
}

export async function attemptWatermarkRemoval(file: File): Promise<Blob> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: false,
  });

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

export async function getPDFInfo(file: File): Promise<{
  pageCount: number;
  fileSize: string;
  isEncrypted: boolean;
}> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    });

    return {
      pageCount: pdfDoc.getPageCount(),
      fileSize: formatFileSize(file.size),
      isEncrypted: false,
    };
  } catch (error) {
    if (error instanceof Error && error.message.includes('encrypted')) {
      return {
        pageCount: 0,
        fileSize: formatFileSize(file.size),
        isEncrypted: true,
      };
    }
    throw error;
  }
}
