import { api } from '@/lib/axios'

interface AnalysisResults {
  [key: string]: string
}

interface ReportResponse {
  id: string
  // ... todos os outros campos do relatório
  customerName: string
  address: string
  document: string
  phone: string
  email: string
  technicianName: string
  sampleOrigin: string
  sampleType: string
  entryDate: string
  collectionDate: string
  collectionTime: string
  collectionAgent: string
  notes?: string
  analysisResults: AnalysisResults
  createdAt: string
  updatedAt: string
}

export async function findByReport(id: string): Promise<ReportResponse> {
  const response = await api.get(`/reports/${id}`)
  return response.data
}
