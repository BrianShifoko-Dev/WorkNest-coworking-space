# 🌍 How to Use Multi-Language Translations

## ✅ Translation System is Now ACTIVE!

Your website now supports **6 languages**:
- 🇬🇧 English (en)
- 🇰🇪 Swahili (sw)
- 🇫🇷 Français (fr)
- 🇪🇸 Español (es)
- 🇩🇪 Deutsch (de)
- 🇵🇹 Português (pt)

---

## 📝 How to Use in Your Components

### **1. Import the Hook**
```tsx
import { useLanguage } from '@/components/providers/LanguageProvider'
```

### **2. Use the Translation Function**
```tsx
export function MyComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>  
      {/* Shows: "Home" or "Nyumbani" or "Accueil" etc. */}
      
      <button>{t('common.bookNow')}</button>
      {/* Shows: "Book Now" or "Hifadhi Sasa" etc. */}
    </div>
  )
}
```

### **3. Get Current Language**
```tsx
const { language, setLanguage } = useLanguage()

console.log(language) // 'en', 'sw', 'fr', etc.

// Change language programmatically
setLanguage('sw') // Switch to Swahili
```

---

## 🔑 Available Translation Keys

### **Navigation**
- `nav.home` - "Home" / "Nyumbani"
- `nav.discover` - "Discover Us" / "Gundua Sisi"
- `nav.products` - "Products & Book" / "Bidhaa na Hifadhi"
- `nav.restaurant` - "Restaurant" / "Mkahawa"
- `nav.events` - "Events" / "Matukio"
- `nav.magazine` - "Magazine" / "Jarida"
- `nav.getstarted` - "Get Started" / "Anza"

### **Common Words**
- `common.bookNow` - "Book Now" / "Hifadhi Sasa"
- `common.learnMore` - "Learn More" / "Jifunze Zaidi"
- `common.contactUs` - "Contact Us" / "Wasiliana Nasi"
- `common.submit` - "Submit" / "Wasilisha"
- `common.subscribe` - "Subscribe" / "Jiandikishe"

### **Hero Section**
- `hero.title1` - "Premium Workspace in Eldoret"
- `hero.subtitle1` - "Elevate your work experience..."

### **Booking**
- `booking.selectSpace` - "Select Space" / "Chagua Nafasi"
- `booking.checkIn` - "Check-in Date"
- `booking.checkOut` - "Check-out Date"
- `booking.guests` - "Guests" / "Wageni"

### **Footer**
- `footer.copyright` - "© 2025 WorkNest..."
- `footer.termsOfService` - "Terms of Service"
- `footer.privacyPolicy` - "Privacy Policy"

---

## ➕ How to Add New Translations

### **Step 1: Open the Provider File**
```bash
components/providers/LanguageProvider.tsx
```

### **Step 2: Add Your Translation Key**
```tsx
const translations: Translations = {
  // ... existing translations ...
  
  // Add your new key here
  "spaces.hotDesk": { 
    en: "Hot Desk", 
    sw: "Dawati la Moto", 
    fr: "Bureau partagé", 
    es: "Escritorio compartido", 
    de: "Hot Desk", 
    pt: "Mesa compartilhada" 
  },
}
```

### **Step 3: Use It in Your Component**
```tsx
<h2>{t('spaces.hotDesk')}</h2>
```

---

## 🎯 Example: Translating a Button

### **Before (Hardcoded English):**
```tsx
<button>Book Now</button>
```

### **After (Multi-language):**
```tsx
import { useLanguage } from '@/components/providers/LanguageProvider'

function MyButton() {
  const { t } = useLanguage()
  
  return <button>{t('common.bookNow')}</button>
}
```

**Result:**
- English: "Book Now"
- Swahili: "Hifadhi Sasa"
- French: "Réserver maintenant"
- Spanish: "Reservar ahora"
- German: "Jetzt buchen"
- Portuguese: "Reservar agora"

---

## 💾 How Language Selection Works

1. **User clicks language dropdown** in top menu
2. **Selects a language** (e.g., Swahili)
3. **Language is saved** to `localStorage`
4. **Entire website updates** instantly
5. **Language persists** on page reload

---

## 🧪 How to Test

1. **Open your website**
2. **Click the language dropdown** (top-right, shows flags)
3. **Select "Swahili" (🇰🇪)**
4. **Watch the text change** instantly
5. **Reload the page** - language stays selected!

---

## 🚀 Quick Wins - Add These Next

### **Most Used Pages to Translate:**
1. **Homepage Hero** - `hero.title`, `hero.subtitle`
2. **Booking Form** - All form labels
3. **Footer** - Links and copyright
4. **Navigation Menu** - All menu items
5. **Call-to-Action Buttons** - "Book Now", "Learn More", etc.

---

## 📦 What You Have Now

✅ **6 languages** fully set up
✅ **Language switcher** working (with flags!)
✅ **localStorage** persistence (remembers choice)
✅ **Translation system** ready to use
✅ **Example translations** for common words

---

## 🎨 Where to Find More Translations

If you need professional translations:
- **Swahili**: You probably know this! 😊
- **Other languages**: Use [DeepL](https://www.deepl.com) (better than Google Translate)
- **Professional**: Hire translators on Upwork/Fiverr

---

## ❓ Need Help?

Just tell me:
1. **What text** you want to translate
2. **What page** it's on
3. I'll add it to the translation file for you!

**Example:** 
> "I want the homepage hero title to be translated"

I'll add the keys and show you how to use them.

---

**Translation system is LIVE! 🌍✨**

