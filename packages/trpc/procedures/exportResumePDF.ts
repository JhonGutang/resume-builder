import { z } from 'zod';
import { publicProcedure } from '../trpc';
import puppeteer from 'puppeteer';

export const exportResumePDF = publicProcedure
  .input(
    z.object({
      html: z.string(),
      fileName: z.string().optional().default('resume.pdf'),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const { html, fileName } = input;
    
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      await browser.close();

      const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

      return {
        success: true,
        message: 'PDF generated successfully',
        pdf: pdfBase64,
        fileName,
      };
    } catch (error) {
      console.error('Error generating PDF:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate PDF',
        pdf: null,
        fileName: null,
      };
    }
  });
