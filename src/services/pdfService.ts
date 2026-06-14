/**
 * Reporting and Download Utility Functions
 */

import { Worker, WageRecord, AdvanceRecord, CompanySettings } from '../core/types';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';

export const exportPDF = async (htmlContent: string, filename: string, mode: 'share' | 'download' = 'share') => {
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
      const safeName = filename.replace(/[^a-zA-Z0-9_]/g, '_');
      
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
          } catch (e) { console.error('Share failed', e); }
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
    const tempError = document.createElement('div');
    tempError.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-50 text-sm font-bold';
    tempError.innerText = 'حدث خطأ أثناء توليد أو مشاركة ملف PDF.';
    document.body.appendChild(tempError);
    setTimeout(() => document.body.removeChild(tempError), 3500);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
};

export function downloadCSV<T>(
  data: T[],
  headers: string[],
  rowMapper: (item: T) => (string | number)[],
  filename: string
) {
  const contentRows = data.map(item => rowMapper(item).map(val => {
    const str = String(val ?? '').replace(/"/g, '""');
    return `"${str}"`;
  }).join(','));

  const csvContent = [
    headers.map(h => `"${h}"`).join(','),
    ...contentRows
  ].join('\n');

  // Excel needs UTF-8 BOM (\uFEFF) to display Arabic characters properly
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function printDocument(elementId: string, title?: string) {
  const printContent = document.getElementById(elementId);
  if (!printContent) return;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>${title || 'القاضي لإدارة الأجور والعمال'}</title>
          <style>
            body { 
              font-family: 'system-ui', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              padding: 40px; 
              color: #111827;
              background-color: #fff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              border: 1px solid #d1d5db;
              padding: 12px;
              text-align: right;
            }
            th {
              background-color: #f3f4f6;
              font-weight: bold;
            }
            .no-print { display: none; }
            .flex { display: flex; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .mt-8 { margin-top: 32px; }
            .border-b-2 { border-bottom: 2px solid #10b981; }
            .text-center { text-align: center; }
            .text-emerald { color: #047857; }
            .text-sm { font-size: 14px; }
            .font-bold { font-weight: bold; }
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .gap-4 { gap: 16px; }
            .mt-12 { margin-top: 48px; }
            .border-dashed { border-style: dashed; }
            .signature-box { border: 1px solid #d1d5db; padding: 24px; border-radius: 8px; text-align: center; }
          </style>
        </head>
        <body>
          <div style="border-bottom: 4px solid #047857; padding-bottom: 20px; margin-bottom: 30px;">
            <div class="flex justify-between items-center">
              <div>
                <h1 style="margin: 0; color: #047857; font-size: 28px;">مؤسسة القاضي للمقاولات العامة</h1>
                <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 14px;">إدارة الأجور وعمال المقاولات • المحاسبة الذكية واليدوية</p>
              </div>
              <div style="text-align: left;">
                <h2 style="margin: 0; color: #d97706; font-size: 18px;">المكتب المحاسبي الرئيسي</h2>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
          </div>
          
          ${printContent.innerHTML}

          <div class="mt-12 grid grid-cols-2 gap-4" style="margin-top: 80px;">
            <div class="signature-box">
              <p class="font-bold" style="margin: 0 0 40px 0;">توقيع محاسب النظام</p>
              <p style="margin: 0; border-top: 1px dashed #9ca3af; width: 60%; margin: 0 auto;"></p>
            </div>
            <div class="signature-box">
              <p class="font-bold" style="margin: 0 0 40px 0;">توقيع واعتماد المدير العام</p>
              <p style="margin: 0; border-top: 1px dashed #9ca3af; width: 60%; margin: 0 auto;"></p>
            </div>
          </div>
          
          <div class="text-center text-sm" style="margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 15px; color: #9ca3af;">
            تم توليد هذا التقرير المستند ماليًا من خلال نظام القاضي المحوسب © 2026 م. جميع الحقوق محفوظة.
          </div>

          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    // Elegant non-blocking check fallback
    console.warn("Popup blocked. Attempting local print dialog fallback.");
    const originalContent = document.body.innerHTML;
    const printSection = document.createElement('div');
    printSection.id = 'temp-print-section';
    printSection.style.position = 'absolute';
    printSection.style.right = '0';
    printSection.style.top = '0';
    printSection.style.width = '100vw';
    printSection.style.minHeight = '100vh';
    printSection.style.backgroundColor = '#fff';
    printSection.style.zIndex = '99999';
    printSection.style.padding = '40px';
    printSection.style.direction = 'rtl';
    printSection.innerHTML = `
      <div style="border-bottom: 4px solid #047857; padding-bottom: 20px; margin-bottom: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="text-align: right;">
            <h1 style="margin: 0; color: #047857; font-size: 28px;">مؤسسة القاضي للمقاولات العامة</h1>
            <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 14px;">إدارة الأجور وعمال المقاولات • المحاسبة الذكية واليدوية</p>
          </div>
          <div style="text-align: left;">
            <h2 style="margin: 0; color: #d97706; font-size: 18px;">المكتب المحاسبي الرئيسي</h2>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 12px;">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-EG')}</p>
          </div>
        </div>
      </div>
      <div>${printContent.innerHTML}</div>
      <div style="margin-top: 80px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px;">
        <div style="border: 1px solid #d1d5db; padding: 24px; border-radius: 8px; text-align: center;">
          <p style="font-weight: bold; margin: 0 0 40px 0;">توقيع محاسب النظام</p>
          <p style="margin: 0; border-top: 1px dashed #9ca3af; width: 60%; margin: 0 auto;"></p>
        </div>
        <div style="border: 1px solid #d1d5db; padding: 24px; border-radius: 8px; text-align: center;">
          <p style="font-weight: bold; margin: 0 0 40px 0;">توقيع واعتماد المدير العام</p>
          <p style="margin: 0; border-top: 1px dashed #9ca3af; width: 60%; margin: 0 auto;"></p>
        </div>
      </div>
      <div style="text-align: center; font-size: 14px; margin-top: 60px; border-top: 1px solid #e5e7eb; padding-top: 15px; color: #9ca3af;">
        تم توليد هذا التقرير المستند ماليًا من خلال نظام القاضي المحوسب © 2026 م. جميع الحقوق محفوظة.
      </div>
    `;
    document.body.appendChild(printSection);
    window.print();
    setTimeout(() => {
      document.body.removeChild(printSection);
    }, 500);
  }
}

export function getQRCodeUrl(data: string): string {
  const enc = encodeURIComponent(data);
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${enc}`;
}

export function generateMonthlyReportHTML(params: {
  periodLabel: string;
  totalWages: number;
  totalAdvances: number;
  currency: string;
  activeWorkersCount: number;
  wages: WageRecord[];
  advances: AdvanceRecord[];
}): string {
  const { periodLabel, totalWages, totalAdvances, currency, activeWorkersCount, wages, advances } = params;
  const netOperatingCost = totalWages - totalAdvances;
  const qrData = `AL-QADY-MONTHLY-REPORT-PERIOD:${periodLabel}-WAGES:${totalWages}-ADVANCES:${totalAdvances}-NET:${netOperatingCost}`;
  const qrCodeUrl = getQRCodeUrl(qrData);

  const wagesRows = wages.length === 0 
    ? `<tr><td colspan="7" style="text-align: center; padding: 20px; color: #6b7280;">لا توجد سجلات أجور مسجلة لهذه الفترة</td></tr>`
    : wages.map(w => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-family: monospace;">${w.date}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">${w.workerName}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">${w.daysWorked} يوم</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: left; font-family: monospace;">${w.rate.toLocaleString()} ${currency}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: left; font-family: monospace; font-weight: bold; color: #047857;">${w.totalEarned.toLocaleString()} ${currency}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; color: #4b5563;">${w.notes || '-'}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; color: #6b7280; font-size: 11px;">${w.registeredBy}</td>
        </tr>
      `).join('');

  const advancesRows = advances.length === 0
    ? `<tr><td colspan="6" style="text-align: center; padding: 20px; color: #6b7280;">لا توجد سجلات سلف أو مسحوبات مسجلة لهذه الفترة</td></tr>`
    : advances.map(a => `
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-family: monospace;">${a.date}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-weight: bold;">${a.workerName}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: center;">
            <span style="padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: bold; ${
              a.type === 'advance' ? 'background-color: #fef3c7; color: #92400e;' : 'background-color: #fee2e2; color: #991b1b;'
            }">
              ${a.type === 'advance' ? 'سلفة مالية' : 'سحب نقدي'}
            </span>
          </td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; text-align: left; font-family: monospace; font-weight: bold; color: #b91c1c;">-${a.amount.toLocaleString()} ${currency}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; color: #4b5563;">${a.notes || '-'}</td>
          <td style="padding: 10px; border: 1px solid #e5e7eb; color: #6b7280; font-size: 11px;">${a.registeredBy}</td>
        </tr>
      `).join('');

  return `
    <div style="font-family: system-ui, -apple-system, sans-serif; direction: rtl; text-align: right; color: #111827; padding: 20px; background-color: #fff;">
      
      <!-- Report Header -->
      <div style="border-bottom: 4px solid #047857; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
        <div style="text-align: right;">
          <h1 style="margin: 0; color: #047857; font-size: 26px; font-weight: 800;">مؤسسة القاضي للمقاولات العامة</h1>
          <p style="margin: 5px 0 0 0; color: #4b5563; font-size: 13px; font-weight: 500;">النظام المحوسب لإدارة الأجور والعهد المالية والعمال</p>
        </div>
        <div style="text-align: left;">
          <h2 style="margin: 0; color: #d97706; font-size: 16px; font-weight: 750;">التقرير المالي الدوري العام</h2>
          <p style="margin: 4px 0 0 0; color: #10b981; font-size: 13px; font-weight: bold;">الفترة: ${periodLabel}</p>
          <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 11px;">تاريخ التوليد: ${new Date().toLocaleDateString('ar-YE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <!-- Main Statistics Grid -->
      <div style="margin-bottom: 30px;">
        <h3 style="color: #111827; font-size: 15px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px;">أولاً: الملخص الإحصائي للموازنة التشغيلية</h3>
        
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
          
          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 15px; text-align: center;">
            <span style="color: #6b7280; font-size: 11px; font-weight: bold; display: block; margin-bottom: 5px;">أجور مستحقة الصرف</span>
            <span style="font-size: 16px; font-weight: 800; color: #111827; font-family: monospace;">${totalWages.toLocaleString()} <span style="font-size: 11px; font-family: sans-serif; font-weight: normal;">${currency}</span></span>
          </div>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 15px; text-align: center;">
            <span style="color: #6b7280; font-size: 11px; font-weight: bold; display: block; margin-bottom: 5px;">سلفيات ومسحوبات مقتطعة</span>
            <span style="font-size: 16px; font-weight: 800; color: #b91c1c; font-family: monospace;">${totalAdvances.toLocaleString()} <span style="font-size: 11px; font-family: sans-serif; font-weight: normal;">${currency}</span></span>
          </div>

          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 15px; text-align: center;">
            <span style="color: #065f46; font-size: 11px; font-weight: bold; display: block; margin-bottom: 5px;">صافي تكلفة التشغيل الفعلية</span>
            <span style="font-size: 16px; font-weight: 800; color: #047857; font-family: monospace;">${netOperatingCost.toLocaleString()} <span style="font-size: 11px; font-family: sans-serif; font-weight: normal;">${currency}</span></span>
          </div>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 15px; text-align: center;">
            <span style="color: #6b7280; font-size: 11px; font-weight: bold; display: block; margin-bottom: 5px;">عدد العمال المشاركين</span>
            <span style="font-size: 16px; font-weight: 800; color: #111827;">${activeWorkersCount} عمال</span>
          </div>

        </div>
      </div>

      <!-- Wages Sections Table -->
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h3 style="color: #111827; font-size: 15px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px;">ثانياً: رواتب الأجور والتعويضات المسجلة للعمال</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: right;">
          <thead>
            <tr style="background-color: #f3f4f6; border-bottom: 2px solid #d1d5db;">
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">التاريخ</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">اسم العامل</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold; text-align: center;">أيام العمل</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold; text-align: left;">معدل اليومية</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold; text-align: left;">المبلغ الكلي</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">البيان والملاحظات</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">المنظم المالي</th>
            </tr>
          </thead>
          <tbody>
            ${wagesRows}
          </tbody>
        </table>
      </div>

      <!-- Advances Sections Table -->
      <div style="margin-bottom: 30px; page-break-inside: avoid;">
        <h3 style="color: #111827; font-size: 15px; font-weight: bold; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 12px;">ثالثاً: السلف النقدية والمسحوبات المنصرفة</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: right;">
          <thead>
            <tr style="background-color: #f3f4f6; border-bottom: 2px solid #d1d5db;">
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">التاريخ</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">اسم العامل</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold; text-align: center;">نوع القيد</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold; text-align: left;">المبلغ المقتطع</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">البيان والملاحظات</th>
              <th style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">المنظم المالي</th>
            </tr>
          </thead>
          <tbody>
            ${advancesRows}
          </tbody>
        </table>
      </div>

      <!-- Footer Signatures & Audit Controls -->
      <div style="margin-top: 50px; page-break-inside: avoid;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          
          <div style="text-align: right; font-size: 12px; color: #4b5563; max-width: 350px;">
            <p style="font-weight: bold; margin: 0 0 10px 0; color: #047857;">تأكيد التدقيق والرقابة المالية:</p>
            <p style="margin: 5px 0; font-size: 11px;">نقر بصحة وأمانة كافة البيانات المحاسبية المدرجة أصولياً في هذا التقرير الدوري، وجاهزيتها مراجعة وتدقيقاً واعتماداً تاماً.</p>
            <div style="margin-top: 25px; display: flex; gap: 40px;">
              <div>
                <p style="font-weight: bold; margin-bottom: 30px;">توقيع محاسب النظام:</p>
                <p style="border-top: 1px dashed #9ca3af; width: 120px;"></p>
              </div>
              <div>
                <p style="font-weight: bold; margin-bottom: 30px;">توقيع واعتماد المدير المالي:</p>
                <p style="border-top: 1px dashed #9ca3af; width: 120px;"></p>
              </div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <img 
              src="${qrCodeUrl}" 
              alt="Verification QR Code" 
              style="width: 100px; height: 100px; border: 1px solid #e5e7eb; padding: 4px; border-radius: 6px;"
              referrerpolicy="no-referrer"
            />
            <span style="font-size: 9px; color: #9ca3af; margin-top: 5px; display: block; max-width: 150px; line-height: 1.3;">كود التحقق المشفر ومطابقة الأرصدة والعهد المالية</span>
          </div>

        </div>
      </div>

      <!-- Bottom Footer -->
      <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center; font-size: 11px; color: #9ca3af;">
        تم توليد هذا التقرير الدوري آلياً من المكتب المالي الرئيسي لمؤسسة القاضي للمقاولات العامة © 2026 م. جميع الحقوق محفوظة.
      </div>
    </div>
  `;
}

export function printMonthlyReport(params: {
  periodLabel: string;
  totalWages: number;
  totalAdvances: number;
  currency: string;
  activeWorkersCount: number;
  wages: WageRecord[];
  advances: AdvanceRecord[];
}) {
  const htmlContent = generateMonthlyReportHTML(params);

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>تقرير تكاليف التشغيل - ${params.periodLabel}</title>
          <style>
            body { 
              padding: 20px; 
              background-color: #fff;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    // Elegant fallback if popups are blocked
    console.warn("Popup blocked. Attempting local print dialog fallback.");
    const printSection = document.createElement('div');
    printSection.id = 'temp-print-section-monthly';
    printSection.style.position = 'absolute';
    printSection.style.right = '0';
    printSection.style.top = '0';
    printSection.style.width = '100vw';
    printSection.style.minHeight = '100vh';
    printSection.style.backgroundColor = '#fff';
    printSection.style.zIndex = '99999';
    printSection.style.padding = '20px';
    printSection.style.direction = 'rtl';
    printSection.innerHTML = htmlContent;

    document.body.appendChild(printSection);
    window.print();
    setTimeout(() => {
      document.body.removeChild(printSection);
    }, 500);
  }
}

export function exportStructuredWorkerReport(params: {
  workerName: string;
  workerProfession: string;
  dailyWage: number;
  startDate: string;
  totalWages: number;
  totalAdvances: number;
  currency: string;
  wages: WageRecord[];
  advances: AdvanceRecord[];
  mode: 'share' | 'download';
}) {
  const { workerName, workerProfession, dailyWage, startDate, totalWages, totalAdvances, currency, wages, advances, mode } = params;

  const htmlContent = generateMonthlyReportHTML({
    periodLabel: `كشف حساب وحركة مالية مستقلة للعامل: ${workerName} (${workerProfession}) • اليومية: ${dailyWage.toLocaleString()} ${currency} • تاريخ البدء: ${startDate}`,
    totalWages,
    totalAdvances,
    currency,
    activeWorkersCount: 1,
    wages,
    advances
  });

  exportPDF(htmlContent, `كشف_حساب_${workerName.replace(/\s+/g, '_')}`, mode);
}

export function exportMonthlyReport(params: {
  periodLabel: string;
  totalWages: number;
  totalAdvances: number;
  currency: string;
  activeWorkersCount: number;
  wages: WageRecord[];
  advances: AdvanceRecord[];
  mode: 'share' | 'download';
}) {
  const { mode, ...reportParams } = params;
  const htmlContent = generateMonthlyReportHTML(reportParams);
  exportPDF(htmlContent, `التقرير_الشهري_${new Date().getTime()}`, mode);
}

export function printStructuredWorkerReport(params: {
  workerName: string;
  workerProfession: string;
  dailyWage: number;
  startDate: string;
  totalWages: number;
  totalAdvances: number;
  currency: string;
  wages: WageRecord[];
  advances: AdvanceRecord[];
}) {
  const { workerName, workerProfession, dailyWage, startDate, totalWages, totalAdvances, currency, wages, advances } = params;

  const htmlContent = generateMonthlyReportHTML({
    periodLabel: `كشف حساب وحركة مالية مستقلة للعامل: ${workerName} (${workerProfession}) • اليومية: ${dailyWage.toLocaleString()} ${currency} • تاريخ البدء: ${startDate}`,
    totalWages,
    totalAdvances,
    currency,
    activeWorkersCount: 1,
    wages,
    advances
  });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html dir="rtl" lang="ar">
        <head>
          <title>كشف حساب منظم - ${workerName}</title>
          <style>
            body { 
              padding: 20px; 
              background-color: #fff;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  } else {
    console.warn("Popup blocked. Attempting local print dialog fallback.");
    const printSection = document.createElement('div');
    printSection.id = 'temp-print-section-worker-structured';
    printSection.style.position = 'absolute';
    printSection.style.right = '0';
    printSection.style.top = '0';
    printSection.style.width = '100vw';
    printSection.style.minHeight = '100vh';
    printSection.style.backgroundColor = '#fff';
    printSection.style.zIndex = '99999';
    printSection.style.padding = '20px';
    printSection.style.direction = 'rtl';
    printSection.innerHTML = htmlContent;

    document.body.appendChild(printSection);
    window.print();
    setTimeout(() => {
      document.body.removeChild(printSection);
    }, 500);
  }
}

export interface Wage {
  id?: string;
  workerId?: string;
  workerName?: string;
  date: string;
  daysWorked?: number;
  rate?: number;
  amount: number;
  totalEarned?: number;
  notes?: string;
  registeredBy?: string;
  createdAt?: string;
}

export interface Advance {
  id?: string;
  workerId?: string;
  workerName?: string;
  date: string;
  amount: number;
  type?: 'advance' | 'withdrawal';
  notes?: string;
  registeredBy?: string;
  createdAt?: string;
}

export const generateStatementPDF = (
  worker: any,
  wages: any[],
  advances: any[],
  settings: CompanySettings
) => {
  // تجميع الحركات وترتيبها زمنيًا لعمل كشف حساب دقيق
  const ledgerItems = [
    ...wages.map(w => ({ 
      date: w.date, 
      type: 'راتب/أجر', 
      amount: w.amount ?? w.totalEarned ?? 0, 
      notes: w.notes || 'أجر يومي' 
    })),
    ...advances.map(a => ({ 
      date: a.date, 
      type: 'سلفة', 
      amount: a.amount, 
      notes: a.notes || 'سلفة مقدمة' 
    }))
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const totalWages = wages.reduce((sum: number, w: any) => sum + (w.amount ?? w.totalEarned ?? 0), 0);
  const totalAdvances = advances.reduce((sum: number, a: any) => sum + a.amount, 0);
  const finalBalance = totalWages - totalAdvances;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    const tempError = document.createElement('div');
    tempError.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-4 py-2 rounded shadow-lg z-[999999] text-sm font-bold';
    tempError.innerText = 'الرجاء السماح بالنوافذ المنبثقة (Popups) لتتمكن من تحميل الـ PDF';
    document.body.appendChild(tempError);
    setTimeout(() => document.body.removeChild(tempError), 3500);
    return;
  }

  const workerName = worker.name || worker.fullName || 'عامل غير محدد';
  const workerRole = worker.role || worker.profession || 'عامل يومي';

  // بناء واجهة الكشف بتنسيق HTML متوافق مع الطباعة والتصدير لـ PDF
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>كشف حساب - ${workerName}</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #333; }
        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        .header-logo { max-height: 80px; max-width: 150px; }
        .company-info { text-align: right; font-size: 14px; line-height: 1.6; }
        .title-area { text-align: center; margin: 20px 0; border-bottom: 2px solid #0056b3; padding-bottom: 10px; }
        .statement-details { width: 100%; margin-bottom: 20px; font-size: 14px; }
        .main-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        .main-table th, .main-table td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .main-table th { background-color: #f4f6f9; color: #333; font-weight: bold; }
        .summary-box { margin-top: 20px; float: left; width: 300px; border: 1px solid #0056b3; border-radius: 5px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid #eee; }
        .summary-row.total { font-weight: bold; background: #0056b3; color: white; }
        .footer-signatures { width: 100%; margin-top: 60px; border-collapse: collapse; page-break-inside: avoid; }
        .signature-cell { width: 33%; text-align: center; font-size: 14px; vertical-align: top; }
        .sig-image { max-height: 60px; display: block; margin: 10px auto; }
        @media print { .no-print { display: none; } }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: left;">
        <button onclick="window.print()" style="padding: 10px 20px; background: #0056b3; color: white; border: none; border-radius: 4px; cursor: pointer;">إخراج واصدار (PDF / طباعة)</button>
      </div>

      <!-- ترويسة الشركة الديناميكية -->
      <table class="header-table">
        <tr>
          <td class="company-info">
            <h2>${settings.companyName || 'وكالة القاضي'}</h2>
            <p><b>العنوان:</b> ${settings.companyAddress || 'غير محدد'}</p>
            <p><b>التلفون:</b> ${settings.phoneNumbers || 'غير محدد'}</p>
            <p style="font-size: 11px; color: #666;"><b>خدماتنا:</b> ${settings.servicesOrProducts || 'إدارة المقاولات والعمالة'}</p>
          </td>
          <td style="text-align: left;">
            ${settings.companyLogo ? `<img src="${settings.companyLogo}" class="header-logo" alt="شعار الشركة" />` : ''}
          </td>
        </tr>
      </table>

      <div class="title-area">
        <h3>كشف حساب مستحقات ومسحوبات عامل</h3>
      </div>

      <table class="statement-details">
        <tr>
          <td><b>اسم العامل:</b> ${workerName}</td>
          <td style="text-align: left;"><b>تاريخ الإصدار:</b> ${new Date().toLocaleDateString('ar-YE')}</td>
        </tr>
        <tr>
          <td><b>المسمى الوظيفي:</b> ${workerRole}</td>
          <td style="text-align: left;"><b>حالة الحساب:</b> ${finalBalance >= 0 ? 'مستحق له' : 'مستحق عليه'}</td>
        </tr>
      </table>

      <!-- جدول الحركات -->
      <table class="main-table">
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>البيان / الحركة</th>
            <th>ملاحظات</th>
            <th>المبلغ (YER)</th>
          </tr>
        </thead>
        <tbody>
          ${ledgerItems.map(item => `
            <tr>
              <td>${new Date(item.date).toLocaleDateString('ar-YE')}</td>
              <td>${item.type}</td>
              <td>${item.notes}</td>
              <td style="font-weight: bold; ${item.type === 'سلفة' ? 'color: #dc3545;' : 'color: #28a745;'}">
                ${item.amount.toLocaleString()} ريال
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <!-- ملخص الحساب -->
      <div class="summary-box">
        <div class="summary-row"><span>إجمالي الأجور:</span> <b>${totalWages.toLocaleString()} ريال</b></div>
        <div class="summary-row"><span>إجمالي السلف:</span> <span style="color: #dc3545;">${totalAdvances.toLocaleString()} ريال</span></div>
        <div class="summary-row total"><span>الرصيد المتبقي:</span> <span>${finalBalance.toLocaleString()} ريال</span></div>
      </div>

      <div style="clear: both;"></div>

      <!-- التوقيعات والختم -->
      <table class="footer-signatures">
        <tr>
          <td class="signature-cell">
            <b>توقيع وإقرار العامل</b>
            <div style="margin-top: 50px; border-bottom: 1px dashed #ccc; width: 150px; margin-left: auto; margin-right: auto;"></div>
          </td>
          <td class="signature-cell">
            <b>ختم الوكالة / الشركة</b>
            ${settings.companyStamp ? `<img src="${settings.companyStamp}" class="sig-image" alt="الختم" />` : '<div style="margin-top: 50px;"></div>'}
          </td>
          <td class="signature-cell">
            <b>توقيع المدير العام</b>
            ${settings.managerSignature ? `<img src="${settings.managerSignature}" class="sig-image" alt="التوقيع" />` : '<div style="margin-top: 50px;"></div>'}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `);

  printWindow.document.close();
};
