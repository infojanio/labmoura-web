// src/api/upload-only-pdf.ts

import { env } from '@/env'

export async function uploadOnlyPdf(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(
      `${env.VITE_API_URL}/reports/upload-pdf`,
      //'https://labmoura-api-production-9089.up.railway.app/reports/upload-pdf',
      {
        method: 'POST',
        body: formData,
        // 👇 Não defina Content-Type manualmente aqui!
        // headers: {
        //   'Content-Type': 'multipart/form-data' ← NÃO USE com FormData!
        // },
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error('❌ Erro ao enviar PDF:', errorBody)
      throw new Error('Falha ao enviar PDF')
    }

    return await response.json()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('❌ Erro na requisição uploadOnlyPdf:', message)
    throw new Error(message)
  }
}
