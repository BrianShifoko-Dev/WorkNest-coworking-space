// Currency conversion service with real-time exchange rates
// Uses exchangerate-api.com (free tier: 1,500 requests/month)

export type Currency = 'KES' | 'USD' | 'EUR' | 'GBP';

export interface ExchangeRates {
  KES: number; // Base currency (always 1)
  USD: number;
  EUR: number;
  GBP: number;
  lastUpdated: number; // Timestamp
}

// Currency mapping by language
export const currencyByLanguage: Record<string, Currency> = {
  en: 'KES', // English - Kenyan Shilling
  sw: 'KES', // Swahili - Kenyan Shilling
  fr: 'EUR', // French - Euro
  es: 'EUR', // Spanish - Euro
  de: 'EUR', // German - Euro
  pt: 'EUR', // Portuguese - Euro
};

// Currency symbols and formatting
export const currencyInfo: Record<Currency, { symbol: string; name: string; locale: string }> = {
  KES: { symbol: 'KES', name: 'Kenyan Shilling', locale: 'en-KE' },
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { symbol: '€', name: 'Euro', locale: 'en-EU' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
};

// Cache for exchange rates (1 hour)
let cachedRates: ExchangeRates | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch latest exchange rates from API
 * Falls back to cached rates or default rates if API fails
 */
export async function fetchExchangeRates(): Promise<ExchangeRates> {
  // Check cache first
  if (cachedRates && Date.now() - cachedRates.lastUpdated < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    // Using exchangerate-api.com free tier
    // Alternative: You can use fixer.io, exchangerate.host, or any other free API
    const response = await fetch(
      'https://api.exchangerate-api.com/v4/latest/KES',
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    
    const rates: ExchangeRates = {
      KES: 1, // Base currency
      USD: data.rates?.USD || 0.0077, // Fallback rate
      EUR: data.rates?.EUR || 0.0071, // Fallback rate
      GBP: data.rates?.GBP || 0.0061, // Fallback rate
      lastUpdated: Date.now(),
    };

    // Cache the rates
    cachedRates = rates;
    return rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Return cached rates if available, otherwise use fallback rates
    if (cachedRates) {
      return cachedRates;
    }

    // Fallback rates (approximate as of 2025)
    return {
      KES: 1,
      USD: 0.0077, // 1 KES = 0.0077 USD (approx 130 KES = 1 USD)
      EUR: 0.0071, // 1 KES = 0.0071 EUR (approx 141 KES = 1 EUR)
      GBP: 0.0061, // 1 KES = 0.0061 GBP (approx 164 KES = 1 GBP)
      lastUpdated: Date.now(),
    };
  }
}

/**
 * Convert amount from KES to target currency
 */
export function convertCurrency(
  amountKES: number,
  targetCurrency: Currency,
  rates: ExchangeRates
): number {
  if (targetCurrency === 'KES') {
    return amountKES;
  }
  
  const rate = rates[targetCurrency];
  if (!rate || rate === 0) {
    return amountKES; // Fallback to original amount
  }
  
  return amountKES * rate;
}

/**
 * Format currency amount with proper symbol and locale
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number }
): string {
  const info = currencyInfo[currency];
  const formatter = new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: options?.minimumFractionDigits ?? (currency === 'KES' ? 0 : 2),
    maximumFractionDigits: options?.maximumFractionDigits ?? (currency === 'KES' ? 0 : 2),
  });

  return formatter.format(amount);
}

/**
 * Format price string (e.g., "From KES 2,500/day")
 */
export function formatPriceString(
  amountKES: number,
  currency: Currency,
  period: string = '',
  rates: ExchangeRates
): string {
  const convertedAmount = convertCurrency(amountKES, currency, rates);
  const formatted = formatCurrency(convertedAmount, currency);
  
  if (period) {
    return `${formatted}/${period}`;
  }
  
  return formatted;
}

