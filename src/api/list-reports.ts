import { api } from '@/lib/axios'

interface ReportListItem {
  id: string
  customerName: string
  technicianName: string
  sampleOrigin: string
  createdAt: string
}

// src/api/list-reports.ts
export async function listReports(params?: {
  startDate?: string
  endDate?: string
}) {
  const response = await api.get('/reports', { params })
  return response.data.reports
}
