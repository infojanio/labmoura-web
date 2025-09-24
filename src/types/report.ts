export interface ReportRequest {
  id: string
  customerName: string
  address: string
  document: string
  phone: string
  email: string
  technicianName: string
  sampleOrigin: string
  sampleType: string
  identification?: string
  entryDate: string
  collectionDate: string
  collectionTime: string
  collectionAgent: string
  notes?: string
  analysisResults: Record<string, string>
  signedPdfUrl?: string
}
