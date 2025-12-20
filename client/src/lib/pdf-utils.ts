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

  // Remove all metadata for maximum size reduction
  try {
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    pdfDoc.setCreationDate(new Date(0));
    pdfDoc.setModificationDate(new Date(0));
  } catch (e) {
    // Continue if metadata removal fails
  }

  // Configure save options - use aggressive compression for maximum level
  const saveOptions: any = {
    addDefaultPage: false,
    useObjectStreams: level === 'maximum',
  };

  let pdfBytes = await pdfDoc.save(saveOptions);

  // Apply gzip compression for maximum level
  if (level === 'maximum') {
    try {
      if (typeof CompressionStream !== 'undefined') {
        const cs = new CompressionStream('gzip');
        const writer = cs.writable.getWriter();
        writer.write(pdfBytes);
        writer.close();

        const compressedArrayBuffer = await new Response(cs.readable).arrayBuffer();
        pdfBytes = new Uint8Array(compressedArrayBuffer);
      }
    } catch (e) {
      // Compression not available, use original
    }
  }

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export type WatermarkPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-center' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'mosaic';

export type WatermarkFont = 'Helvetica' | 'HelveticaBold' | 'TimesRoman' | 'TimesRomanBold' | 'Courier' | 'CourierBold';

export type WatermarkLayer = 'over' | 'below';

export interface AdvancedWatermarkOptions {
  type: 'text' | 'image';
  text?: string;
  imageData?: ArrayBuffer;
  imageMimeType?: 'image/png' | 'image/jpeg';
  font?: WatermarkFont;
  fontSize?: number;
  opacity?: number;
  rotation?: number;
  color?: { r: number; g: number; b: number };
  position?: WatermarkPosition;
  layer?: WatermarkLayer;
  pageRange?: { from: number; to: number } | 'all';
  mosaicSpacing?: number;
}

const fontMap: Record<WatermarkFont, typeof StandardFonts[keyof typeof StandardFonts]> = {
  'Helvetica': StandardFonts.Helvetica,
  'HelveticaBold': StandardFonts.HelveticaBold,
  'TimesRoman': StandardFonts.TimesRoman,
  'TimesRomanBold': StandardFonts.TimesRomanBold,
  'Courier': StandardFonts.Courier,
  'CourierBold': StandardFonts.CourierBold,
};

function getPositionCoordinates(
  position: WatermarkPosition,
  pageWidth: number,
  pageHeight: number,
  contentWidth: number,
  contentHeight: number,
  padding: number = 50
): { x: number; y: number } {
  switch (position) {
    case 'top-left':
      return { x: padding, y: pageHeight - padding - contentHeight };
    case 'top-center':
      return { x: (pageWidth - contentWidth) / 2, y: pageHeight - padding - contentHeight };
    case 'top-right':
      return { x: pageWidth - padding - contentWidth, y: pageHeight - padding - contentHeight };
    case 'middle-left':
      return { x: padding, y: (pageHeight - contentHeight) / 2 };
    case 'middle-center':
      return { x: (pageWidth - contentWidth) / 2, y: (pageHeight - contentHeight) / 2 };
    case 'middle-right':
      return { x: pageWidth - padding - contentWidth, y: (pageHeight - contentHeight) / 2 };
    case 'bottom-left':
      return { x: padding, y: padding };
    case 'bottom-center':
      return { x: (pageWidth - contentWidth) / 2, y: padding };
    case 'bottom-right':
      return { x: pageWidth - padding - contentWidth, y: padding };
    default:
      return { x: (pageWidth - contentWidth) / 2, y: (pageHeight - contentHeight) / 2 };
  }
}

export async function addAdvancedWatermarkToPDF(
  file: File,
  options: AdvancedWatermarkOptions
): Promise<Blob> {
  const {
    type = 'text',
    text = 'WATERMARK',
    imageData,
    imageMimeType = 'image/png',
    font = 'HelveticaBold',
    fontSize = 50,
    opacity = 0.3,
    rotation = 0,
    color = { r: 0.5, g: 0.5, b: 0.5 },
    position = 'middle-center',
    layer = 'over',
    pageRange = 'all',
    mosaicSpacing = 150,
  } = options;

  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  
  const startPage = pageRange === 'all' ? 0 : Math.max(0, pageRange.from - 1);
  const endPage = pageRange === 'all' ? pages.length - 1 : Math.min(pages.length - 1, pageRange.to - 1);

  let embeddedFont: any = null;
  let embeddedImage: any = null;
  let imageWidth = 0;
  let imageHeight = 0;

  if (type === 'text') {
    embeddedFont = await pdfDoc.embedFont(fontMap[font]);
  } else if (type === 'image' && imageData) {
    if (imageMimeType === 'image/png') {
      embeddedImage = await pdfDoc.embedPng(imageData);
    } else {
      embeddedImage = await pdfDoc.embedJpg(imageData);
    }
    const scale = fontSize / 50;
    imageWidth = embeddedImage.width * scale * 0.5;
    imageHeight = embeddedImage.height * scale * 0.5;
  }

  for (let i = startPage; i <= endPage; i++) {
    const page = pages[i];
    const { width: pageWidth, height: pageHeight } = page.getSize();

    if (position === 'mosaic') {
      const spacingX = mosaicSpacing + (type === 'text' ? fontSize * 2 : imageWidth);
      const spacingY = mosaicSpacing + (type === 'text' ? fontSize : imageHeight);
      
      for (let y = mosaicSpacing / 2; y < pageHeight; y += spacingY) {
        for (let x = mosaicSpacing / 2; x < pageWidth; x += spacingX) {
          if (type === 'text' && embeddedFont) {
            page.drawText(text, {
              x,
              y,
              size: fontSize,
              font: embeddedFont,
              color: rgb(color.r, color.g, color.b),
              opacity,
              rotate: degrees(rotation),
            });
          } else if (type === 'image' && embeddedImage) {
            page.drawImage(embeddedImage, {
              x,
              y,
              width: imageWidth,
              height: imageHeight,
              opacity,
              rotate: degrees(rotation),
            });
          }
        }
      }
    } else {
      let contentWidth: number;
      let contentHeight: number;

      if (type === 'text' && embeddedFont) {
        contentWidth = embeddedFont.widthOfTextAtSize(text, fontSize);
        contentHeight = fontSize;
      } else {
        contentWidth = imageWidth;
        contentHeight = imageHeight;
      }

      const { x, y } = getPositionCoordinates(position, pageWidth, pageHeight, contentWidth, contentHeight);

      if (type === 'text' && embeddedFont) {
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font: embeddedFont,
          color: rgb(color.r, color.g, color.b),
          opacity,
          rotate: degrees(rotation),
        });
      } else if (type === 'image' && embeddedImage) {
        page.drawImage(embeddedImage, {
          x,
          y,
          width: imageWidth,
          height: imageHeight,
          opacity,
          rotate: degrees(rotation),
        });
      }
    }
  }

  const pdfBytes = await pdfDoc.save();
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
