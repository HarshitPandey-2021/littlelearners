import mongoose, { Schema, Document } from 'mongoose'

export interface IAdmin extends Document {
  email: string
  passwordHash: string
  role: 'admin'
  createdAt: Date
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IAdmin>('Admin', AdminSchema)