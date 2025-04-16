import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const signInSchema = z.object({
  reportId: z.string().min(1, 'Informe a chave do laudo'),
})

type SignInData = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSearch(data: SignInData) {
    try {
      const response = await fetch(
        `https://labmoura-api-production-c06f.up.railway.app/reports/${data.reportId}`,
      )
      const result = await response.json()

      if (!response.ok || !result?.report?.signedPdfUrl) {
        throw new Error('Laudo não encontrado')
      }

      // Redireciona para a visualização pública do laudo
      navigate(`/reports/${data.reportId}`)
    } catch (error) {
      toast.error('Laudo não encontrado. Verifique a chave digitada.')
    }
  }

  return (
    <>
      <Helmet title="Consultar Laudo" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <form onSubmit={handleSubmit(handleSearch)} className="space-y-4">
            <div className="text-center mb-4">
              <h1 className="text-xl font-semibold">Consultar Laudo</h1>
              <p className="text-sm text-muted-foreground">
                Digite a chave de validação para acessar o PDF do laudo
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportId">Chave do Laudo</Label>
              <Input id="reportId" {...register('reportId')} />
              {errors.reportId && (
                <p className="text-sm text-red-500">
                  {errors.reportId.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Buscando...' : 'Acessar Laudo'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
