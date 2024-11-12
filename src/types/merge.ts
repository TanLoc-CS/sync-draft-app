export interface Merge {
  _id?: string,
  docId: string,
  mergedBy: string,
  before: string,
  after: string,
  mergedAt?: Date,
  description: string,
}