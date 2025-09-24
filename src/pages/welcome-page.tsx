import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Rocket, FileText, UploadCloud, Search } from 'lucide-react'

export function WelcomePage() {
  return (
    <motion.div
      className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-md rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">
        Bem-vindo ao Painel do Sistema LabMoura
      </h1>

      <p className="text-center text-muted-foreground mb-8 text-sm">
        Este sistema foi desenvolvido para emissão, consulta e validação de
        laudos laboratoriais de análise de água com rastreabilidade total.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Feature
          icon={<FileText className="h-6 w-6 text-blue-600" />}
          title="Cadastro de Laudos"
          description="Preencha os dados da amostra e gere laudos com QR Code e assinatura técnica."
        />

        <Feature
          icon={<UploadCloud className="h-6 w-6 text-green-600" />}
          title="Envio de PDF"
          description="Faça upload de PDFs para inserir QR Code e assinar com certificado digital A1 (opcional)."
        />

        <Feature
          icon={<Search className="h-6 w-6 text-purple-600" />}
          title="Consulta de Resultados"
          description="Clientes e órgãos podem acessar o PDF do laudo usando o código ou QR Code."
        />

        <Feature
          icon={<Rocket className="h-6 w-6 text-orange-500" />}
          title="Integração Moderna"
          description="Sistema rápido, seguro e 100% online, com autenticação JWT e banco de dados PostgreSQL."
        />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/sign-up">
          <Button className="w-full sm:w-auto">📄 Cadastrar Novo Laudo</Button>
        </Link>

        <Link to="/reports">
          <Button variant="outline" className="w-full sm:w-auto">
            🔍 Ver Todos os Laudos
          </Button>
        </Link>

        <Link to="/sign-in">
          <Button variant="ghost" className="w-full sm:w-auto text-blue-600">
            ✅ Validar um Laudo
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex gap-4 p-4 bg-muted rounded-lg border">
      <div>{icon}</div>
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
