import { Atom } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-muted antialiased">
      {/* Cabeçalho horizontal compacto */}
      <header className="w-full border-b border-foreground/5 bg-muted">
        <div className="container flex items-center justify-between p-4 mx-auto">
          <div className="flex items-center gap-3">
            <Atom className="h-6 w-6 text-foreground" />
            <span className="font-semibold text-foreground">LabMoura</span>
          </div>

          <div className="flex items-center gap-24">
            <img
              src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=340,fit=crop,q=95/d95KwnkManf7ykL4/logo-YKb6OnZnwpijWEZr.jpeg"
              alt="Lab Moura"
              className="h-14 w-auto object-contain"
            />
            <span className="text-xs text-muted-foreground">
              Desenvolvido por: iaki.com.br &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </header>

      {/* Área do formulário expandida */}
      <main className="flex-1 p-8">
        <div className="w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
