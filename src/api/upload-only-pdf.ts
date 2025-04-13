// src/api/upload-only-pdf.ts
export async function uploadOnlyPdf(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('http://localhost:3333/reports/upload-pdf', {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Falha ao enviar PDF')
  }

  return response.json() // Ex: { reportId: 'uuid', signedPdfUrl: '...' }
}
