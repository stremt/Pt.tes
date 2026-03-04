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
  html += 'body { font-family: "Helvetica", "Arial", sans-serif; padding: 20px; color: #333; }';
  html += 'table { border-collapse: collapse; width: 100%; margin-bottom: 30px; table-layout: fixed; word-wrap: break-word; }';
  html += 'th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 10pt; min-width: 50px; overflow: hidden; }';
  html += 'th { background-color: #f8f9fa; font-weight: bold; border-bottom: 2px solid #aaa; }';
  html += 'h2 { margin-top: 20px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; }';
  html += '.sheet-container { page-break-after: always; }';
  html += '.sheet-container:last-child { page-break-after: auto; }';
  html += '</style></head><body>';
  
  sheets.forEach(sheet => {
    html += `<div class="sheet-container">`;
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
      // Skip empty rows
      if (row.length === 0 || row.every(cell => cell === undefined || cell === null || cell === '')) {
        return;
      }
      html += '<tr>';
      // Ensure we iterate based on headers length to maintain structure
      const colCount = Math.max(sheet.headers.length, row.length);
      for (let i = 0; i < colCount; i++) {
        const cell = row[i];
        html += `<td>${cell !== undefined && cell !== null ? cell : ''}</td>`;
      }
      html += '</tr>';
    });
    html += '</tbody>';
    
    html += '</table>';
    html += `</div>`;
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
