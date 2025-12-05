'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, UtensilsCrossed, Search, Loader2, Edit, Trash2 } from 'lucide-react'
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

interface MenuItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
  is_available: boolean
  is_featured: boolean
}

export function MenuClient() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'lunch',
    price: '',
    image_url: '',
    is_available: true,
    is_featured: false,
  })

  useEffect(() => {
    fetchItems()
  }, [categoryFilter])

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        description: editingItem.description || '',
        category: editingItem.category,
        price: editingItem.price.toString(),
        image_url: editingItem.image_url || '',
        is_available: editingItem.is_available,
        is_featured: editingItem.is_featured,
      })
      setShowDialog(true)
    }
  }, [editingItem])

  const fetchItems = async () => {
    setLoading(true)
    try {
      let url = '/api/menu?available=true'
      if (categoryFilter !== 'all') url += `&category=${categoryFilter}`

      const response = await fetch(url)
      const data = await response.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      toast.error('Error loading menu items')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : '/api/menu'
      const method = editingItem ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      })

      if (response.ok) {
        toast.success(editingItem ? 'Item updated!' : 'Item created!')
        setShowDialog(false)
        setEditingItem(null)
        resetForm()
        fetchItems()
      } else {
        toast.error('Failed to save item')
      }
    } catch (error) {
      toast.error('Error saving item')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return

    try {
      const response = await fetch(`/api/menu/${id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Item deleted!')
        fetchItems()
      }
    } catch (error) {
      toast.error('Error deleting item')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'lunch',
      price: '',
      image_url: '',
      is_available: true,
      is_featured: false,
    })
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Menu Management</h1>
          <p className="text-[#5C4033]/60 mt-1">Manage restaurant menu items</p>
        </div>
        <Button
          onClick={() => { resetForm(); setShowDialog(true); setEditingItem(null) }}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Total Items</div>
          <div className="text-2xl font-bold text-[#5C4033]">{items.length}</div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Available</div>
          <div className="text-2xl font-bold text-green-600">
            {items.filter(i => i.is_available).length}
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Featured</div>
          <div className="text-2xl font-bold text-[#D4AF37]">
            {items.filter(i => i.is_featured).length}
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Categories</div>
          <div className="text-2xl font-bold text-blue-600">6</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4033]/40" />
            <Input
              placeholder="Search items..."
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
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Items Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
      ) : filteredItems.length === 0 ? (
        <Card className="p-12 text-center border-[#D4AF37]/20">
          <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/20" />
          <h3 className="text-lg font-semibold text-[#5C4033] mb-2">No items found</h3>
          <Button onClick={() => { resetForm(); setShowDialog(true) }} className="bg-[#D4AF37] hover:bg-[#B8941F]">
            <Plus className="w-4 h-4 mr-2" />
            Add First Item
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border-[#D4AF37]/20 hover:shadow-lg transition-shadow">
              {item.image_url && (
                <div className="relative h-48">
                  <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                  {item.is_featured && (
                    <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-white z-10">Featured</Badge>
                  )}
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-[#5C4033]">{item.name}</h3>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-[#5C4033]/70 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold text-[#D4AF37]">
                    KES {item.price.toLocaleString()}
                  </div>
                  <Badge className={item.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {item.is_available ? 'Available' : 'Unavailable'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingItem(item)}
                    className="flex-1 border-[#D4AF37]/50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Menu Item Dialog */}
      <Dialog open={showDialog} onOpenChange={(open) => { setShowDialog(open); if (!open) { setEditingItem(null); resetForm() } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="pb-4 border-b border-[#D4AF37]/20">
            <DialogTitle className="text-2xl font-bold text-[#5C4033] flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />
              {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            </DialogTitle>
            <p className="text-sm text-[#5C4033]/60 mt-2">
              {editingItem ? 'Update menu item details' : 'Add a new item to your restaurant menu'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            {/* Item Name */}
            <div className="space-y-2">
              <Label htmlFor="item_name" className="text-base font-semibold text-[#5C4033]">
                Item Name *
              </Label>
              <Input
                id="item_name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Grilled Chicken Salad"
                required
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
                placeholder="Brief description of the dish..."
                rows={3}
                className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] resize-none"
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold text-[#5C4033]">
                  Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="border-[#D4AF37]/30 focus:ring-[#D4AF37] h-11 bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[9999]">
                    <SelectItem value="breakfast">🍳 Breakfast</SelectItem>
                    <SelectItem value="lunch">🍽️ Lunch</SelectItem>
                    <SelectItem value="dinner">🌙 Dinner</SelectItem>
                    <SelectItem value="drinks">🥤 Drinks</SelectItem>
                    <SelectItem value="desserts">🍰 Desserts</SelectItem>
                    <SelectItem value="snacks">🍿 Snacks</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-base font-semibold text-[#5C4033]">
                  Price (KES) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C4033]/60 font-medium">
                    KES
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                    required
                    className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] h-11 pl-14"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image_url" className="text-base font-semibold text-[#5C4033]">
                Image URL
              </Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="border-[#D4AF37]/30 focus-visible:ring-[#D4AF37] h-11"
              />
              <p className="text-xs text-[#5C4033]/60 flex items-start gap-1">
                <span>💡</span>
                <span>Use Unsplash or any public food image URL</span>
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              {/* Available Toggle */}
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                  className="w-5 h-5 rounded border-green-500 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <div className="flex-1">
                  <Label htmlFor="is_available" className="font-semibold cursor-pointer text-green-900">
                    Available for Order
                  </Label>
                  <p className="text-xs text-green-700 mt-1">
                    Customers can order this item
                  </p>
                </div>
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
                    <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                    Featured Item
                  </Label>
                  <p className="text-xs text-[#5C4033]/60 mt-1">
                    Highlight this item on the menu
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-[#D4AF37]/20">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => { setShowDialog(false); setEditingItem(null); resetForm() }}
                className="px-6 h-11 border-[#D4AF37]/30 text-[#5C4033] hover:bg-[#FFFFF0]"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="px-6 h-11 bg-[#D4AF37] hover:bg-[#B8941F] text-white font-semibold"
              >
                {editingItem ? (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Update Item
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Item
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

