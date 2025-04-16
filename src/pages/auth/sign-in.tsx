import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/lib/axios'

const signInForm = z.object({
  chave: z.string().min(1, 'A chave é obrigatória'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      // Valida se o laudo existe antes de redirecionar
      await api.get(`/reports/${data.chave}`)

      toast.success('Laudo encontrado com sucesso.')
      navigate(`/reports/${data.chave}`)
    } catch (error) {
      toast.error('Chave inválida ou laudo não encontrado.')
    }
  }

  return (
    <>
      <Helmet title="Validar Análise" />

      <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border">
          <div className="flex flex-col gap-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Resultado de Análise de Água
              </h1>
              <p className="text-sm text-muted-foreground">
                Valide sua análise pelo painel do LabMoura
              </p>
            </div>

            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chave">Chave de Validação</Label>
                <Input
                  id="chave"
                  type="text"
                  placeholder="Digite a chave do laudo"
                  {...register('chave')}
                />
                {errors.chave && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.chave.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Validando...' : 'Validar'}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Não tem uma chave?{' '}
              <Link to="/sign-up" className="text-blue-600 hover:underline">
                Cadastre um novo laudo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
