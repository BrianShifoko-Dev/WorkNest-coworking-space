# Icons & Favicons Setup

## Current Status
✅ Using `logo.svg` for all icons (temporary solution - no 404 errors)

## To Add Proper Icons Later

### 📱 Recommended Icon Sizes

1. **Favicon**: `favicon.ico` (16x16, 32x32, 48x48 in one file)
2. **Apple Touch Icon**: `apple-touch-icon.png` (180x180)
3. **Android Chrome Icons**:
   - `android-chrome-192x192.png` (192x192)
   - `android-chrome-512x512.png` (512x512)
4. **Standard Favicons**:
   - `favicon-16x16.png` (16x16)
   - `favicon-32x32.png` (32x32)

### 🛠️ How to Generate Icons

#### Option 1: Online Tools (Easiest)
1. **Favicon Generator**: https://realfavicongenerator.net/
   - Upload your logo
   - Download all icon sizes
   - Replace files in `/public` folder

2. **Favicon.io**: https://favicon.io/
   - Convert PNG to all icon formats
   - Free and fast

#### Option 2: Design Tools
- Use **Figma**, **Photoshop**, or **Canva**
- Export at exact dimensions listed above
- Save as PNG (use transparent background)

#### Option 3: Command Line (Advanced)
```bash
# Install ImageMagick
npm install -g sharp-cli

# Generate from logo
sharp -i logo.png -o favicon-16x16.png resize 16 16
sharp -i logo.png -o favicon-32x32.png resize 32 32
sharp -i logo.png -o apple-touch-icon.png resize 180 180
sharp -i logo.png -o android-chrome-192x192.png resize 192 192
sharp -i logo.png -o android-chrome-512x512.png resize 512 512
```

### 📝 After Adding Icons

Once you have the icon files, update:

1. **`app/layout.tsx`**:
```typescript
icons: {
  icon: '/favicon.ico',
  shortcut: '/favicon-16x16.png',
  apple: '/apple-touch-icon.png',
},
```

2. **`public/site.webmanifest`**:
```json
"icons": [
  {
    "src": "/android-chrome-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/android-chrome-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
  },
  {
    "src": "/apple-touch-icon.png",
    "sizes": "180x180",
    "type": "image/png"
  }
]
```

3. **Add to `<head>` in `app/layout.tsx`**:
```typescript
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

### 🎨 Icon Design Tips

For WorkNest brand:
- **Background**: Gold (#D4AF37) or Cream (#FFFFF0)
- **Icon**: Simple logo mark (not full text)
- **Style**: Minimalist, professional
- **Format**: PNG with transparency for best results
- **Keep it simple**: Icons are small, avoid complex details

### ✅ Why This Matters

Proper icons improve:
- 📱 **Mobile experience** (Add to Home Screen)
- 🔖 **Browser tabs** (Professional appearance)
- 💼 **Brand recognition** (Consistent identity)
- 🔍 **SEO** (Search engines prefer complete metadata)
- 📲 **PWA functionality** (Progressive Web App features)

---

**For now, the site works perfectly with `logo.svg` and no 404 errors!** 🎉

