export function collectPageStyles(): string {
  try {
    return Array.from(document.styleSheets)
      .map(styleSheet => {
        try {
          return Array.from(styleSheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n')
        } catch (e) {
          console.warn('Could not access stylesheet:', e)
          return ''
        }
      })
      .join('\n')
  } catch (e) {
    console.error('Error collecting styles:', e)
    return ''
  }
}

export function createHtmlDocument(htmlContent: string, styles: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>${styles}</style>
      </head>
      <body style="margin: 0; padding: 0;">
        ${htmlContent}
      </body>
    </html>
  `
}

export function downloadPdfFromBase64(base64Data: string, fileName: string = 'resume.pdf'): void {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: 'application/pdf' })
  
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export function getResumePreviewHtml(selector: string = '.resume-preview'): string {
  const previewElement = document.querySelector(selector)
  
  if (!previewElement) {
    throw new Error('Resume preview not found')
  }
  
  return previewElement.outerHTML
}

export const pdfExportConfig = {
  defaultFileName: 'resume.pdf',
  previewSelector: '.resume-preview',
  includePageStyles: true,
}
