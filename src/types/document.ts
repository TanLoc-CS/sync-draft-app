export interface Document {
  _id?: string,
  ownerId: string,
  title: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
  merges: string[]
}