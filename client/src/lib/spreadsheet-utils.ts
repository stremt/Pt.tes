import * as XLSX from 'xlsx';

export interface SheetData {
  name: string;
  data: any[][];
  headers: string[];
}

export async function readExcelFile(file: File): Promise<SheetData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        const sheets: SheetData[] = workbook.SheetNames.map(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
          
          const headers = jsonData[0] || [];
          const rows = jsonData.slice(1);
          
          return {
            name: sheetName,
            data: rows,
            headers: headers.map((h: any) => String(h || '')),
          };
        });
        
        resolve(sheets);
      } catch (error) {
        reject(new Error('Failed to read Excel file'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

export async function convertExcelToHTML(file: File): Promise<string> {
  const sheets = await readExcelFile(file);
  
  let html = '<html><head><style>';
  html += 'body { font-family: Arial, sans-serif; padding: 20px; }';
  html += 'table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }';
  html += 'th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }';
  html += 'th { background-color: #f2f2f2; font-weight: bold; }';
  html += 'h2 { margin-top: 20px; }';
  html += '</style></head><body>';
  
  sheets.forEach(sheet => {
    html += `<h2>${sheet.name}</h2>`;
    html += '<table>';
    
    if (sheet.headers.length > 0) {
      html += '<thead><tr>';
      sheet.headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
      html += '</tr></thead>';
    }
    
    html += '<tbody>';
    sheet.data.forEach(row => {
      html += '<tr>';
      row.forEach((cell: any) => {
        html += `<td>${cell !== undefined && cell !== null ? cell : ''}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody>';
    
    html += '</table>';
  });
  
  html += '</body></html>';
  return html;
}

export function createExcelFromData(data: any[][], sheetName: string = 'Sheet1'): Blob {
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}
