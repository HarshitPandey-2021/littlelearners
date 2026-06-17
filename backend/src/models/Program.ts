import mongoose, { Schema, Document } from 'mongoose'

export interface IProgram extends Document {
  title: string
  description: string
  ageRange: string
  duration: string
  modes: ('online' | 'in-person' | 'hybrid')[]
  includes: string[]
  icon: string
  isActive: boolean
  createdAt: Date
}

const ProgramSchema = new Schema<IProgram>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ageRange: { type: String, required: true },
  duration: { type: String, required: true },
  modes: [{ type: String, enum: ['online', 'in-person', 'hybrid'] }],
  includes: [{ type: String }],
  icon: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model<IProgram>('Program', ProgramSchema)