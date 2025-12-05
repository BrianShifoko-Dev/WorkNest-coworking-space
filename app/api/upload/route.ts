import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: Request) {
  try {
    // Get form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const path = formData.get('path') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('📤 Uploading file:', file.name, 'to:', path)

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Determine upload directory (public folder for cPanel)
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    const filePath = path || `gallery/${Date.now()}-${file.name}`
    const fullPath = join(uploadDir, filePath)

    // Create directory if it doesn't exist
    const dirPath = join(fullPath, '..')
    if (!existsSync(dirPath)) {
      await mkdir(dirPath, { recursive: true })
    }

    // Write file to disk
    await writeFile(fullPath, buffer)

    // Generate public URL (relative to public folder)
    const publicUrl = `/uploads/${filePath}`

    console.log('✅ Upload successful:', publicUrl)

    return NextResponse.json({ 
      url: publicUrl,
      path: filePath 
    })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Upload failed' }, { status: 500 })
  }
}

