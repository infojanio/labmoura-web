// src/pages/admin/reports-list.tsx
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Helmet } from 'react-helmet-async'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Report {
  id: string
  createdAt: string
  signedPdfUrl?: string
}

export function ReportsList() {
  const [reports, setReports] = useState<Report[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  async function fetchReports() {
    let url = 'https://labmoura-api-production-9089.up.railway.app/reports'
    const params = new URLSearchParams()

    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const res = await fetch(url)
    const data = await res.json()
    setReports(data)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet title="Todos os Laudos" />
      <h1 className="text-xl font-bold mb-4">📄 Lista de Laudos</h1>

      <div className="flex items-center gap-4 mb-6">
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Data inicial"
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="Data final"
        />
        <Button onClick={fetchReports}>Filtrar</Button>
      </div>

      {reports.length === 0 ? (
        <p className="text-gray-500">Nenhum laudo encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {reports.map((report) => (
            <li
              key={report.id}
              className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <p className="font-mono text-sm text-gray-700">
                  <strong>ID:</strong> {report.id}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Data:</strong>{' '}
                  {format(new Date(report.createdAt), 'dd/MM/yyyy')}
                </p>
              </div>
              {report.signedPdfUrl && (
                <a
                  href={report.signedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Ver PDF
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
