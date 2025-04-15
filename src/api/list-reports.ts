import { api } from '@/lib/axios'

interface ReportListItem {
  id: string
  customerName: string
  technicianName: string
  sampleOrigin: string
  createdAt: string
}

export async function listReports(params?: {
  page?: number
  limit?: number
  search?: string
}): Promise<ReportListItem[]> {
  const response = await api.get('/reports', { params })

  return response.data
}
