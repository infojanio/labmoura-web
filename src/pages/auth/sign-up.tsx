import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export function SignUp() {
  const navigate = useNavigate()
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleUploadPdf() {
    if (!pdfFile) {
      toast.error('Por favor, selecione um arquivo PDF para enviar.')
      return
    }

    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('file', pdfFile)

      const response = await fetch(
        'https://labmoura-api-production-9089.up.railway.app/reports/upload-pdf',
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error('Erro ao enviar o PDF')
      }

      const { id } = await response.json()

      toast.success('Laudo enviado com sucesso!', {
        action: {
          label: 'Ver Laudo',
          onClick: () => navigate(`/reports/${id}`),
        },
      })

      setPdfFile(null)
    } catch (error) {
      toast.error('Erro ao enviar o PDF.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Helmet title="Cadastro de Laudo" />

      <div className="p-8 min-h-screen flex items-center justify-center bg-muted/40">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-sm border space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Enviar Laudo em PDF
            </h1>
            <p className="text-sm text-muted-foreground">
              Faça o upload do laudo em PDF para validação e assinatura digital!
            </p>
          </div>

          <div>
            <Label
              htmlFor="upload"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Arquivo PDF do Laudo
            </Label>

            <label
              htmlFor="upload"
              className="flex items-center justify-center h-32 w-full border border-dashed border-gray-400 rounded-md text-gray-500 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer"
            >
              {pdfFile ? (
                <span className="text-sm">{pdfFile.name}</span>
              ) : (
                <span className="text-sm">
                  Clique aqui para selecionar o PDF
                </span>
              )}
            </label>

            <input
              id="upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPdfFile(e.target.files[0])
                }
              }}
            />
          </div>

          <Button
            className="w-full"
            disabled={isSubmitting || !pdfFile}
            onClick={handleUploadPdf}
          >
            {isSubmitting ? 'Enviando...' : 'Salvar Laudo'}
          </Button>

          <Link to="/reports/list">
            <Button variant="outline" className="w-full mt-2">
              📄 Ver todos os laudos
            </Button>
          </Link>

          <p className="px-6 text-center text-sm text-muted-foreground">
            Já possui uma chave?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Buscar resultado
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
