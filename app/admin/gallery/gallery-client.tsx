'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Image as ImageIcon, Search, Loader2, Edit, Trash2, Star, Upload, Save } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface GalleryImage {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  tags: string[]
  is_featured: boolean
  display_order: number
  created_at: string
}

export function GalleryClient() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'spaces',
    is_featured: false,
  })
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchImages()
  }, [categoryFilter])

  useEffect(() => {
    if (editingImage) {
      setFormData({
        title: editingImage.title || '',
        description: editingImage.description || '',
        image_url: editingImage.image_url,
        category: editingImage.category,
        is_featured: editingImage.is_featured,
      })
      setShowDialog(true)
    }
  }, [editingImage])

  const fetchImages = async () => {
    setLoading(true)
    try {
      let url = '/api/gallery'
      if (categoryFilter !== 'all') url += `?category=${categoryFilter}`

      const response = await fetch(url)
      const data = await response.json()
      setImages(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Error loading images')
    } finally {
      setLoading(false)
    }
  }

  const uploadFileToSupabase = async (file: File): Promise<string | null> => {
    try {
      setUploading(true)
      
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `gallery/${fileName}`

      // Create FormData
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('path', filePath)

      // Upload via API
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload file')
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let imageUrl = formData.image_url

      // If uploading a file, upload it first
      if (uploadMethod === 'file' && selectedFile) {
        const uploadedUrl = await uploadFileToSupabase(selectedFile)
        if (!uploadedUrl) {
          toast.error('Failed to upload file')
          return
        }
        imageUrl = uploadedUrl
      }

      // Validate URL
      if (!imageUrl) {
        toast.error('Please provide an image URL or upload a file')
        return
      }

      const url = editingImage ? `/api/gallery/${editingImage.id}` : '/api/gallery'
      const method = editingImage ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_url: imageUrl,
        }),
      })

      if (response.ok) {
        toast.success(editingImage ? 'Image updated!' : 'Image uploaded!')
        setShowDialog(false)
        setEditingImage(null)
        resetForm()
        fetchImages()
      } else {
        toast.error('Failed to save image')
      }
    } catch (error) {
      toast.error('Error saving image')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return

    try {
      const response = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Image deleted!')
        fetchImages()
      }
    } catch (error) {
      toast.error('Error deleting image')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'spaces',
      is_featured: false,
    })
    setSelectedFile(null)
    setUploadMethod('url')
  }

  const filteredImages = images.filter(image =>
    (image.title?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Gallery Management</h1>
          <p className="text-[#5C4033]/60 mt-1">Upload and manage workspace images</p>
        </div>
        {/* Temporarily disabled - Add images via SQL first */}
        {/* <Button
          onClick={() => { resetForm(); setShowDialog(true); setEditingImage(null) }}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Image
        </Button> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Total Images</div>
          <div className="text-2xl font-bold text-[#5C4033]">{images.length}</div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Featured</div>
          <div className="text-2xl font-bold text-[#D4AF37]">
            {images.filter(i => i.is_featured).length}
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Categories</div>
          <div className="text-2xl font-bold text-blue-600">6</div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">This Month</div>
          <div className="text-2xl font-bold text-green-600">
            {images.filter(i => {
              const imgDate = new Date(i.created_at)
              const now = new Date()
              return imgDate.getMonth() === now.getMonth() && imgDate.getFullYear() === now.getFullYear()
            }).length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4033]/40" />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-[#D4AF37]/30"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="border-[#D4AF37]/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="spaces">Spaces</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="people">People</SelectItem>
              <SelectItem value="interior">Interior</SelectItem>
              <SelectItem value="exterior">Exterior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Images Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
      ) : filteredImages.length === 0 ? (
        <Card className="p-12 text-center border-[#D4AF37]/20">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/20" />
          <h3 className="text-lg font-semibold text-[#5C4033] mb-2">No images found</h3>
          <Button onClick={() => { resetForm(); setShowDialog(true) }} className="bg-[#D4AF37] hover:bg-[#B8941F]">
            <Plus className="w-4 h-4 mr-2" />
            Upload First Image
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <Card key={image.id} className="group overflow-hidden border-[#D4AF37]/20 hover:shadow-lg transition-all">
              <div className="relative h-64 overflow-hidden bg-[#5C4033]/5">
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {image.is_featured && (
                  <Badge className="absolute top-3 left-3 bg-[#D4AF37] text-white">
                    <Star className="w-3 h-3 mr-1 fill-white" />
                    Featured
                  </Badge>
                )}
                <Badge className="absolute top-3 right-3 bg-white/90 text-[#5C4033] text-xs">
                  {image.category}
                </Badge>
                
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setEditingImage(image)}
                    className="bg-white text-[#5C4033] hover:bg-[#D4AF37] hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {image.title && (
                <div className="p-3">
                  <h4 className="font-semibold text-sm text-[#5C4033] truncate">{image.title}</h4>
                  {image.description && (
                    <p className="text-xs text-[#5C4033]/60 mt-1 line-clamp-2">{image.description}</p>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => { setShowDialog(open); if (!open) { setEditingImage(null); resetForm() } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="pb-4 border-b border-[#D4AF37]/20">
            <DialogTitle className="text-2xl font-bold text-[#5C4033] flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-[#D4AF37]" />
              {editingImage ? 'Edit Image' : 'Upload Image'}
            </DialogTitle>
            <p className="text-sm text-[#5C4033]/60 mt-2">
              {editingImage ? 'Update image details' : 'Add a new image to your gallery'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Upload Method Toggle */}
            <div className="bg-[#FFFFF0] p-4 rounded-lg border border-[#D4AF37]/20">
              <Label className="text-base font-semibold text-[#5C4033] mb-3 block">
                Upload Method
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  onClick={() => {setUploadMethod('url'); setSelectedFile(null)}}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    uploadMethod === 'url' 
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8941F]' 
                      : 'bg-white border-2 border-[#D4AF37]/30 text-[#5C4033] hover:bg-[#FFFFF0]'
                  }`}
                >
                  <ImageIcon className="w-5 h-5" />
                  <span className="font-semibold">Image URL</span>
                  <span className="text-xs opacity-80">From web link</span>
                </Button>
                <Button
                  type="button"
                  onClick={() => {setUploadMethod('file'); setFormData({...formData, image_url: ''})}}
                  className={`h-auto py-4 flex flex-col items-center gap-2 ${
                    uploadMethod === 'file' 
                      ? 'bg-[#D4AF37] text-white hover:bg-[#B8941F]' 
                      : 'bg-white border-2 border-[#D4AF37]/30 text-[#5C4033] hover:bg-[#FFFFF0]'
                  }`}
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-semibold">Upload File</span>
                  <span className="text-xs opacity-80">From computer</span>
                </Button>
              </div>
            </div>

            {/* URL Input */}
            {uploadMethod === 'url' && (
              <div className="space-y-2">
                <Label htmlFor="image_url" className="text-base font-semibold text-[#5C4033]">
                  Image URL *
                </Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  required={uploadMethod === 'url'}
                  className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] h-11"
                />
                <p className="text-xs text-[#5C4033]/60 flex items-start gap-1">
                  <span>💡</span>
                  <span>Use Unsplash, Pexels, or any public image URL</span>
                </p>
              </div>
            )}

            {/* File Upload */}
            {uploadMethod === 'file' && (
              <div className="space-y-2">
                <Label htmlFor="image_file" className="text-base font-semibold text-[#5C4033]">
                  Select Image File *
                </Label>
                <div className="border-2 border-dashed border-[#D4AF37]/30 rounded-lg p-6 hover:border-[#D4AF37] transition-colors">
                  <Input
                    id="image_file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    required={uploadMethod === 'file' && !editingImage}
                    className="border-none p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#D4AF37] file:text-white hover:file:bg-[#B8941F] cursor-pointer"
                  />
                  {selectedFile && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-[#5C4033]/60 flex items-start gap-1">
                  <span>📁</span>
                  <span>Supported formats: PNG, JPG, JPEG, WEBP (Max 10MB)</span>
                </p>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold text-[#5C4033]">
                Image Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Modern Office Space"
                className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] h-11"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold text-[#5C4033]">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the image..."
                rows={3}
                className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] resize-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base font-semibold text-[#5C4033]">
                Category *
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="border-[#D4AF37]/30 focus:ring-[#D4AF37] h-11 bg-white">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white z-[9999]">
                  <SelectItem value="spaces">🏢 Spaces</SelectItem>
                  <SelectItem value="events">🎉 Events</SelectItem>
                  <SelectItem value="restaurant">🍽️ Restaurant</SelectItem>
                  <SelectItem value="people">👥 People</SelectItem>
                  <SelectItem value="interior">🏠 Interior</SelectItem>
                  <SelectItem value="exterior">🌆 Exterior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-3 p-4 bg-[#FFFFF0] rounded-lg border border-[#D4AF37]/20">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="w-5 h-5 rounded border-[#D4AF37] text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
              />
              <div className="flex-1">
                <Label htmlFor="is_featured" className="font-semibold cursor-pointer text-[#5C4033] flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#D4AF37]" />
                  Mark as Featured
                </Label>
                <p className="text-xs text-[#5C4033]/60 mt-1">
                  Featured images appear prominently on the gallery page
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[#D4AF37]/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setShowDialog(false); setEditingImage(null); resetForm() }}
                disabled={uploading}
                className="px-6 h-11 border-[#D4AF37]/30 text-[#5C4033] hover:bg-[#FFFFF0]"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="px-6 h-11 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    {editingImage ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Image
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

