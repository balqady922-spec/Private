const fs = require('fs');

let code = fs.readFileSync('src/services/pdfService.ts', 'utf8');

if (!code.includes('@capacitor/filesystem')) {
  code = code.replace(
    "import { jsPDF } from 'jspdf';",
    "import { jsPDF } from 'jspdf';\nimport { Filesystem, Directory } from '@capacitor/filesystem';\nimport { Share } from '@capacitor/share';\nimport { Capacitor } from '@capacitor/core';"
  );
}

const newExportPDF = `export const exportPDF = async (htmlContent: string, filename: string, mode: 'share' | 'download' = 'share') => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  document.body.appendChild(container);

  const element = document.createElement('div');
  element.style.width = '800px';
  element.style.padding = '20px';
  element.style.backgroundColor = 'white';
  element.innerHTML = htmlContent;

  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (img.src.includes('qrserver.com')) {
      img.style.display = 'none';
      img.crossOrigin = 'anonymous';
    }
  });

  container.appendChild(element);

  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const dataUrl = await toPng(element, { 
      quality: 0.95, 
      pixelRatio: 2, 
      skipFonts: false 
    });
    
    const StandardPDF = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = StandardPDF.internal.pageSize.getWidth();
    const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [pdfWidth, Math.max(pdfHeight, StandardPDF.internal.pageSize.getHeight())]
    });
    
    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    if (Capacitor.isNativePlatform()) {
      const pdfBase64 = pdf.output('datauristring').split(',')[1];
      const safeName = filename.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '_');
      
      const writeResult = await Filesystem.writeFile({
        path: safeName + '.pdf',
        data: pdfBase64,
        directory: Directory.Cache
      });
      
      await Share.share({
        title: safeName,
        text: 'مرفق لكم كشف من نظام القاضي',
        url: writeResult.uri,
        dialogTitle: 'مشاركة PDF'
      });
      
    } else {
      const pdfBlob = pdf.output('blob');
      
      if (mode === 'share' && navigator.share && navigator.canShare) {
        const file = new File([pdfBlob], filename + '.pdf', { type: 'application/pdf' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: filename,
              text: 'مرفق لكم كشف من نظام القاضي',
              files: [file]
            });
            return;
          } catch (e) { console.log('Share failed', e); }
        }
      }
      
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
  } catch (error) {
    console.error('PDF generation error:', error);
    alert('حدث خطأ أثناء توليد أو مشاركة ملف PDF.');
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};`;

code = code.replace(/export const exportPDF = async[^]*?finally\s*\{[^]*?\}\s*};/, newExportPDF);
fs.writeFileSync('src/services/pdfService.ts', code);
console.log('PDF Service Updated');
