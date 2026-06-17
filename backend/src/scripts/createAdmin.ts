import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin'
import dotenv from 'dotenv'

dotenv.config()

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    console.log('✅ Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@littlelearners.com' })
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!')
      process.exit(0)
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = new Admin({
      email: 'admin@littlelearners.com',
      passwordHash: hashedPassword,
      role: 'admin'
    })

    await admin.save()
    
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@littlelearners.com')
    console.log('🔑 Password: admin123')
    console.log('⚠️  CHANGE THIS PASSWORD IN PRODUCTION!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

createAdminUser()