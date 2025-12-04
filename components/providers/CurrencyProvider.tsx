'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import {
  Currency,
  currencyByLanguage,
  fetchExchangeRates,
  ExchangeRates,
  formatPriceString,
  convertCurrency,
  formatCurrency,
} from '@/lib/currency-service';

interface CurrencyContextType {
  currency: Currency;
  rates: ExchangeRates | null;
  isLoading: boolean;
  formatPrice: (amountKES: number, period?: string) => string;
  convert: (amountKES: number) => number;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('KES');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Update currency when language changes
  useEffect(() => {
    const newCurrency = currencyByLanguage[language] || 'KES';
    setCurrency(newCurrency);
  }, [language]);

  // Fetch exchange rates on mount and when currency changes
  useEffect(() => {
    let isMounted = true;

    async function loadRates() {
      setIsLoading(true);
      try {
        const fetchedRates = await fetchExchangeRates();
        if (isMounted) {
          setRates(fetchedRates);
        }
      } catch (error) {
        console.error('Error loading exchange rates:', error);
        // Use fallback rates
        if (isMounted) {
          setRates({
            KES: 1,
            USD: 0.0077,
            EUR: 0.0071,
            GBP: 0.0061,
            lastUpdated: Date.now(),
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRates();

    // Refresh rates every hour
    const interval = setInterval(loadRates, 60 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const formatPrice = (amountKES: number, period: string = ''): string => {
    if (!rates) {
      // Fallback to KES if rates not loaded
      return `KES ${amountKES.toLocaleString()}${period ? `/${period}` : ''}`;
    }
    return formatPriceString(amountKES, currency, period, rates);
  };

  const convert = (amountKES: number): number => {
    if (!rates) {
      return amountKES;
    }
    return convertCurrency(amountKES, currency, rates);
  };

  const format = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        rates,
        isLoading,
        formatPrice,
        convert,
        format,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

