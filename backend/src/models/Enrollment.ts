import mongoose, { Schema, Document } from 'mongoose'

export interface IEnrollment extends Document {
  childName: string
  childAge: number
  parentName: string
  phone: string
  email: string
  program: mongoose.Types.ObjectId
  classMode: 'online' | 'in-person' | 'hybrid'
  preferredBatch?: string
  status: 'new' | 'contacted' | 'enrolled' | 'closed'
  createdAt: Date
}

const EnrollmentSchema = new Schema<IEnrollment>({
  childName: { type: String, required: true },
  childAge: { type: Number, required: true, min: 5, max: 8 },
  parentName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  classMode: { 
    type: String, 
    enum: ['online', 'in-person', 'hybrid'], 
    required: true 
  },
  preferredBatch: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'enrolled', 'closed'],
    default: 'new'
  },
  createdAt: { type: Date, default: Date.now },
})

// Indexes for common queries
EnrollmentSchema.index({ status: 1, createdAt: -1 })
EnrollmentSchema.index({ email: 1 })

export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema)