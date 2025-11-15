// Translation system - Simple and efficient

export type Language = 'en' | 'sw' | 'fr' | 'es' | 'de' | 'pt'

export const languages = {
  en: { code: 'en', name: 'English', flag: 'GB' },
  sw: { code: 'sw', name: 'Swahili', flag: 'KE' },
  fr: { code: 'fr', name: 'Français', flag: 'FR' },
  es: { code: 'es', name: 'Español', flag: 'ES' },
  de: { code: 'de', name: 'Deutsch', flag: 'DE' },
  pt: { code: 'pt', name: 'Português', flag: 'PT' },
}

// Translation dictionaries
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.discover': 'Discover Us',
    'nav.products': 'Products & Book',
    'nav.restaurant': 'Restaurant',
    'nav.events': 'Events',
    'nav.magazine': 'Magazine',
    'nav.getStarted': 'Get Started',
    'nav.login': 'Login',
    
    // Common
    'common.bookNow': 'Book Now',
    'common.learnMore': 'Learn More',
    'common.contactUs': 'Contact Us',
    'common.comingSoon': 'Coming Soon',
    'common.readMore': 'Read More',
    'common.viewAll': 'View All',
    'common.getStarted': 'Get Started',
    
    // Hero Section
    'hero.title': 'Premium Coworking Space in Eldoret',
    'hero.subtitle': 'Where Ideas Take Flight',
    'hero.description': 'Professional workspace, vibrant community, endless possibilities',
    
    // Footer
    'footer.tagline': 'Where Ideas Take Flight',
    'footer.hours': 'Opening Hours',
    'footer.contact': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.quickLinks': 'Quick Links',
    'footer.spaces': 'Spaces',
    'footer.copyright': '© 2025 The WorkNest Eldoret. All rights reserved.',
    
    // Booking
    'booking.fullName': 'Full Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.spaceType': 'Space Type',
    'booking.date': 'Start Date',
    'booking.time': 'Time',
    'booking.paymentPlan': 'Payment Plan',
    'booking.submit': 'Complete Booking',
    'booking.selectSpace': 'Select space type',
    'booking.selectPlan': 'Select plan',
    'booking.selectSpaceFirst': 'Select space type first',
    
    // Spaces
    'spaces.hotDesk': 'Hot Desk',
    'spaces.dedicatedDesk': 'Dedicated Desk',
    'spaces.privateOffice': 'Private Office',
    'spaces.meetingRoom': 'Meeting Room',
    'spaces.boardroom': 'Executive Boardroom',
    'spaces.callPod': 'Call Pod',
    'spaces.eventSpace': 'Event Space',
  },
  
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.discover': 'Gundua',
    'nav.products': 'Bidhaa & Hifadhi',
    'nav.restaurant': 'Mkahawa',
    'nav.events': 'Matukio',
    'nav.magazine': 'Jarida',
    'nav.getStarted': 'Anza',
    'nav.login': 'Ingia',
    
    // Common
    'common.bookNow': 'Hifadhi Sasa',
    'common.learnMore': 'Jifunze Zaidi',
    'common.contactUs': 'Wasiliana Nasi',
    'common.comingSoon': 'Inakuja Hivi Karibuni',
    'common.readMore': 'Soma Zaidi',
    'common.viewAll': 'Tazama Zote',
    'common.getStarted': 'Anza',
    
    // Hero Section
    'hero.title': 'Nafasi ya Kazi ya Juu Eldoret',
    'hero.subtitle': 'Mahali Mawazo Yanapaa',
    'hero.description': 'Nafasi ya kazi ya kitaaluma, jamii hai, fursa zisizo na kikomo',
    
    // Footer
    'footer.tagline': 'Mahali Mawazo Yanapaa',
    'footer.hours': 'Masaa ya Kufungua',
    'footer.contact': 'Wasiliana Nasi',
    'footer.followUs': 'Tufuate',
    'footer.quickLinks': 'Viungo vya Haraka',
    'footer.spaces': 'Nafasi',
    'footer.copyright': '© 2025 The WorkNest Eldoret. Haki zote zimehifadhiwa.',
    
    // Booking
    'booking.fullName': 'Jina Kamili',
    'booking.email': 'Barua Pepe',
    'booking.phone': 'Simu',
    'booking.spaceType': 'Aina ya Nafasi',
    'booking.date': 'Tarehe ya Kuanza',
    'booking.time': 'Muda',
    'booking.paymentPlan': 'Mpango wa Malipo',
    'booking.submit': 'Kamilisha Uhifadhi',
    'booking.selectSpace': 'Chagua aina ya nafasi',
    'booking.selectPlan': 'Chagua mpango',
    'booking.selectSpaceFirst': 'Chagua aina ya nafasi kwanza',
    
    // Spaces
    'spaces.hotDesk': 'Dawati la Moto',
    'spaces.dedicatedDesk': 'Dawati Mahususi',
    'spaces.privateOffice': 'Ofisi Binafsi',
    'spaces.meetingRoom': 'Chumba cha Mikutano',
    'spaces.boardroom': 'Boardroom ya Utendaji',
    'spaces.callPod': 'Kitengo cha Simu',
    'spaces.eventSpace': 'Nafasi ya Matukio',
  },
  
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.discover': 'Découvrir',
    'nav.products': 'Produits & Réserver',
    'nav.restaurant': 'Restaurant',
    'nav.events': 'Événements',
    'nav.magazine': 'Magazine',
    'nav.getStarted': 'Commencer',
    'nav.login': 'Connexion',
    
    // Common
    'common.bookNow': 'Réserver',
    'common.learnMore': 'En savoir plus',
    'common.contactUs': 'Contactez-nous',
    'common.comingSoon': 'Bientôt disponible',
    'common.readMore': 'Lire la suite',
    'common.viewAll': 'Voir tout',
    'common.getStarted': 'Commencer',
    
    // Hero Section
    'hero.title': 'Espace de Coworking Premium à Eldoret',
    'hero.subtitle': 'Où les Idées Prennent Leur Envol',
    'hero.description': 'Espace de travail professionnel, communauté dynamique, possibilités infinies',
    
    // Footer
    'footer.tagline': 'Où les Idées Prennent Leur Envol',
    'footer.hours': 'Heures d\'ouverture',
    'footer.contact': 'Contactez-nous',
    'footer.followUs': 'Suivez-nous',
    'footer.quickLinks': 'Liens rapides',
    'footer.spaces': 'Espaces',
    'footer.copyright': '© 2025 The WorkNest Eldoret. Tous droits réservés.',
    
    // Booking
    'booking.fullName': 'Nom complet',
    'booking.email': 'Email',
    'booking.phone': 'Téléphone',
    'booking.spaceType': 'Type d\'espace',
    'booking.date': 'Date de début',
    'booking.time': 'Heure',
    'booking.paymentPlan': 'Plan de paiement',
    'booking.submit': 'Finaliser la réservation',
    'booking.selectSpace': 'Sélectionner le type d\'espace',
    'booking.selectPlan': 'Sélectionner le plan',
    'booking.selectSpaceFirst': 'Sélectionner d\'abord le type d\'espace',
    
    // Spaces
    'spaces.hotDesk': 'Bureau partagé',
    'spaces.dedicatedDesk': 'Bureau dédié',
    'spaces.privateOffice': 'Bureau privé',
    'spaces.meetingRoom': 'Salle de réunion',
    'spaces.boardroom': 'Salle du conseil',
    'spaces.callPod': 'Cabine téléphonique',
    'spaces.eventSpace': 'Espace événementiel',
  },
  
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.discover': 'Descubrir',
    'nav.products': 'Productos y Reservar',
    'nav.restaurant': 'Restaurante',
    'nav.events': 'Eventos',
    'nav.magazine': 'Revista',
    'nav.getStarted': 'Comenzar',
    'nav.login': 'Iniciar sesión',
    
    // Common
    'common.bookNow': 'Reservar ahora',
    'common.learnMore': 'Más información',
    'common.contactUs': 'Contáctenos',
    'common.comingSoon': 'Próximamente',
    'common.readMore': 'Leer más',
    'common.viewAll': 'Ver todo',
    'common.getStarted': 'Comenzar',
    
    // Hero Section
    'hero.title': 'Espacio de Coworking Premium en Eldoret',
    'hero.subtitle': 'Donde las Ideas Despegan',
    'hero.description': 'Espacio de trabajo profesional, comunidad vibrante, posibilidades infinitas',
    
    // Footer
    'footer.tagline': 'Donde las Ideas Despegan',
    'footer.hours': 'Horario de apertura',
    'footer.contact': 'Contáctenos',
    'footer.followUs': 'Síguenos',
    'footer.quickLinks': 'Enlaces rápidos',
    'footer.spaces': 'Espacios',
    'footer.copyright': '© 2025 The WorkNest Eldoret. Todos los derechos reservados.',
    
    // Booking
    'booking.fullName': 'Nombre completo',
    'booking.email': 'Correo electrónico',
    'booking.phone': 'Teléfono',
    'booking.spaceType': 'Tipo de espacio',
    'booking.date': 'Fecha de inicio',
    'booking.time': 'Hora',
    'booking.paymentPlan': 'Plan de pago',
    'booking.submit': 'Completar reserva',
    'booking.selectSpace': 'Seleccionar tipo de espacio',
    'booking.selectPlan': 'Seleccionar plan',
    'booking.selectSpaceFirst': 'Seleccionar primero el tipo de espacio',
    
    // Spaces
    'spaces.hotDesk': 'Escritorio compartido',
    'spaces.dedicatedDesk': 'Escritorio dedicado',
    'spaces.privateOffice': 'Oficina privada',
    'spaces.meetingRoom': 'Sala de reuniones',
    'spaces.boardroom': 'Sala de juntas',
    'spaces.callPod': 'Cabina telefónica',
    'spaces.eventSpace': 'Espacio para eventos',
  },
  
  de: {
    // Navigation
    'nav.home': 'Startseite',
    'nav.discover': 'Entdecken',
    'nav.products': 'Produkte & Buchen',
    'nav.restaurant': 'Restaurant',
    'nav.events': 'Veranstaltungen',
    'nav.magazine': 'Magazin',
    'nav.getStarted': 'Loslegen',
    'nav.login': 'Anmelden',
    
    // Common
    'common.bookNow': 'Jetzt buchen',
    'common.learnMore': 'Mehr erfahren',
    'common.contactUs': 'Kontaktieren Sie uns',
    'common.comingSoon': 'Demnächst',
    'common.readMore': 'Weiterlesen',
    'common.viewAll': 'Alle anzeigen',
    'common.getStarted': 'Loslegen',
    
    // Hero Section
    'hero.title': 'Premium Coworking Space in Eldoret',
    'hero.subtitle': 'Wo Ideen Abheben',
    'hero.description': 'Professioneller Arbeitsbereich, lebendige Gemeinschaft, endlose Möglichkeiten',
    
    // Footer
    'footer.tagline': 'Wo Ideen Abheben',
    'footer.hours': 'Öffnungszeiten',
    'footer.contact': 'Kontaktieren Sie uns',
    'footer.followUs': 'Folgen Sie uns',
    'footer.quickLinks': 'Schnelllinks',
    'footer.spaces': 'Räume',
    'footer.copyright': '© 2025 The WorkNest Eldoret. Alle Rechte vorbehalten.',
    
    // Booking
    'booking.fullName': 'Vollständiger Name',
    'booking.email': 'E-Mail',
    'booking.phone': 'Telefon',
    'booking.spaceType': 'Raumtyp',
    'booking.date': 'Startdatum',
    'booking.time': 'Zeit',
    'booking.paymentPlan': 'Zahlungsplan',
    'booking.submit': 'Buchung abschließen',
    'booking.selectSpace': 'Raumtyp auswählen',
    'booking.selectPlan': 'Plan auswählen',
    'booking.selectSpaceFirst': 'Zuerst Raumtyp auswählen',
    
    // Spaces
    'spaces.hotDesk': 'Hot Desk',
    'spaces.dedicatedDesk': 'Fester Schreibtisch',
    'spaces.privateOffice': 'Privates Büro',
    'spaces.meetingRoom': 'Besprechungsraum',
    'spaces.boardroom': 'Vorstandszimmer',
    'spaces.callPod': 'Telefonkabine',
    'spaces.eventSpace': 'Veranstaltungsraum',
  },
  
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.discover': 'Descobrir',
    'nav.products': 'Produtos e Reservar',
    'nav.restaurant': 'Restaurante',
    'nav.events': 'Eventos',
    'nav.magazine': 'Revista',
    'nav.getStarted': 'Começar',
    'nav.login': 'Entrar',
    
    // Common
    'common.bookNow': 'Reservar agora',
    'common.learnMore': 'Saiba mais',
    'common.contactUs': 'Fale conosco',
    'common.comingSoon': 'Em breve',
    'common.readMore': 'Leia mais',
    'common.viewAll': 'Ver tudo',
    'common.getStarted': 'Começar',
    
    // Hero Section
    'hero.title': 'Espaço de Coworking Premium em Eldoret',
    'hero.subtitle': 'Onde as Ideias Decolam',
    'hero.description': 'Espaço de trabalho profissional, comunidade vibrante, possibilidades infinitas',
    
    // Footer
    'footer.tagline': 'Onde as Ideias Decolam',
    'footer.hours': 'Horário de funcionamento',
    'footer.contact': 'Fale conosco',
    'footer.followUs': 'Siga-nos',
    'footer.quickLinks': 'Links rápidos',
    'footer.spaces': 'Espaços',
    'footer.copyright': '© 2025 The WorkNest Eldoret. Todos os direitos reservados.',
    
    // Booking
    'booking.fullName': 'Nome completo',
    'booking.email': 'E-mail',
    'booking.phone': 'Telefone',
    'booking.spaceType': 'Tipo de espaço',
    'booking.date': 'Data de início',
    'booking.time': 'Hora',
    'booking.paymentPlan': 'Plano de pagamento',
    'booking.submit': 'Concluir reserva',
    'booking.selectSpace': 'Selecionar tipo de espaço',
    'booking.selectPlan': 'Selecionar plano',
    'booking.selectSpaceFirst': 'Selecionar primeiro o tipo de espaço',
    
    // Spaces
    'spaces.hotDesk': 'Mesa compartilhada',
    'spaces.dedicatedDesk': 'Mesa dedicada',
    'spaces.privateOffice': 'Escritório privado',
    'spaces.meetingRoom': 'Sala de reuniões',
    'spaces.boardroom': 'Sala de diretoria',
    'spaces.callPod': 'Cabine telefônica',
    'spaces.eventSpace': 'Espaço para eventos',
  },
}

// Helper function to get translation
export function getTranslation(key: string, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key] || key
}

