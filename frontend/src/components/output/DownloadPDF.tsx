'use client';
import { useState } from 'react';

export default function DownloadPDF() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const el = document.getElementById('question-paper');
      if (!el) return;

      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      // Measure section positions using absolute document coordinates (scroll-safe)
      const elAbsTop = el.getBoundingClientRect().top + window.scrollY;
      const elHeight = el.offsetHeight;
      const sectionFractions: number[] = [];
      el.querySelectorAll('[data-pdf-section]').forEach((s) => {
        const fraction = (s.getBoundingClientRect().top + window.scrollY - elAbsTop) / elHeight;
        if (fraction > 0.01) sectionFractions.push(fraction);
      });

      const scale = 2;
      const canvas = await html2canvas(el, { scale, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');

      const sectionTopsPx = sectionFractions.map((f) => f * canvas.height);

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();   // 210mm
      const pageH = pdf.internal.pageSize.getHeight();  // 297mm
      const margin = 14; // mm — top & bottom margin on every page

      const mmPerPx = pageW / canvas.width;
      const totalImgH = canvas.height * mmPerPx;

      // Content height per page = pageH minus top and bottom margins.
      // We place the image at (margin - yPx*mmPerPx), which causes the next page's
      // image to start margin/mmPerPx pixels before the break point (overlap).
      // We mask this overlap by painting white rectangles over both margin zones.
      const contentHpx = (pageH - 2 * margin) / mmPerPx;

      // Build smart page breaks — push section headers out of the bottom 30% of each page
      const breaks: number[] = [0];
      let pageStart = 0;
      while (pageStart < canvas.height) {
        const naturalEnd = pageStart + contentHpx;
        if (naturalEnd >= canvas.height) break;

        const orphanStart = pageStart + contentHpx * 0.70;
        let breakAt = naturalEnd;
        for (const top of sectionTopsPx) {
          if (top > orphanStart && top < naturalEnd) {
            breakAt = top;
            break;
          }
        }
        breaks.push(breakAt);
        pageStart = breakAt;
      }

      // Render each page:
      // 1. Place the full image shifted so this page's content starts at y=margin
      // 2. Paint white over top margin zone (hides any overlap from prior page)
      // 3. Paint white over bottom margin zone (hides any bleed into next page)
      breaks.forEach((yPx, i) => {
        if (i > 0) pdf.addPage();
        const yMm = yPx * mmPerPx;
        pdf.addImage(imgData, 'PNG', 0, margin - yMm, pageW, totalImgH);
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, pageW, margin, 'F');                    // top mask
        pdf.rect(0, pageH - margin, pageW, margin + 1, 'F');  // bottom mask
      });

      pdf.save('VedaAI-Question-Paper.pdf');
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 shadow-sm transition-colors"
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
      ) : (
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )}
      {loading ? 'Exporting...' : 'Download as PDF'}
    </button>
  );
}
