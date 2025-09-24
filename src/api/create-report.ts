import { api } from '@/lib/axios'

interface AnalysisResults {
  [key: string]: string
}

export interface CreateReportPayload {
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
}

export async function createReport(payload: CreateReportPayload) {
  const response = await api.post('/reports', {
    ...payload,
    entryDate: new Date(payload.entryDate).toISOString(),
    collectionDate: new Date(payload.collectionDate).toISOString(),
  })

  return response.data
}
