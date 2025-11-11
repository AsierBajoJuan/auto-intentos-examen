// src/utils/pdf.ts
import * as pdfjsLib from 'pdfjs-dist'
import 'pdfjs-dist/build/pdf.worker.mjs'
import { createWorker as _createWorker } from 'tesseract.js'

// Worker de pdf.js para Vite
;(pdfjsLib as any).GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

export async function pdfToText(file: File): Promise<string> {
  const buf = await file.arrayBuffer()
  const pdf = await (pdfjsLib as any).getDocument({ data: buf }).promise

  let text = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    const pageText = (content.items as any[]).map((it: any) => it.str).join(' ')

    if (pageText.trim().length > 10) {
      // Texto seleccionable
      text += `\n[PAGE ${i}]\n${pageText}\n`
    } else {
      // OCR fallback
      const viewport = page.getViewport({ scale: 2 })
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      canvas.width = viewport.width
      canvas.height = viewport.height
      await (page as any).render({ canvasContext: ctx, viewport } as any).promise

      // 👇 cast a any para permitir logger sin que TS se queje
      const createWorker: any = _createWorker as any
      const worker: any = await createWorker({
        logger: (m: any) => {
          if (m.status === 'recognizing text') {
            console.log(`OCR ${i}: ${Math.round(m.progress * 100)}%`)
          }
        }
      })

      await worker.loadLanguage('spa+eng')
      await worker.initialize('spa+eng')
      const { data } = await worker.recognize(canvas)
      await worker.terminate()

      text += `\n[PAGE ${i} OCR]\n${data.text}\n`
    }
  }
  return text
}
