import { generatePageMetadata } from '@/lib/seo'
import { PaymentMethodsClient } from './payment-methods-client'

export const metadata = generatePageMetadata({
  title: 'Payment Methods - The WorkNest Eldoret',
  description: 'Convenient payment options at The WorkNest including M-Pesa, card payments, and bank transfers. Secure and flexible payment for all our coworking services.',
  keywords: [
    'payment methods Eldoret',
    'M-Pesa coworking',
    'WorkNest payments',
    'pay for workspace Kenya',
    'coworking payment options',
  ],
  path: '/payment-methods',
})

export default function PaymentMethodsPage() {
  return <PaymentMethodsClient />
}

