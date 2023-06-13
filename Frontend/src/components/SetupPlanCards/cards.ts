import { isMobile } from 'react-device-detect'

export interface PlanCard {
  id: number
  title: string
  price: string
  services: Array<{ id: number; name: string }>
  buttonText: string
  type: string
  linkText?: string
  recommended: number
}

export const plans: PlanCard[] = [
  {
    buttonText: 'Get started',
    id: 1,
    price: '$29.99',
    recommended: 1,
    services: [
      {
        id: 1,
        name: 'Unlimited Affirmation per month',
      },
    ],
    title: 'Mindmail Chill Journey',
    type: 'chill',
  },
  {
    buttonText: 'Try free for 14 days',
    id: 2,
    linkText: 'Purchase now',
    price: '$49.99',
    recommended: isMobile ? 2 : 1,
    services: [
      {
        id: 1,
        name: 'Unlimited Affirmation per month',
      },
      {
        id: 2,
        name: 'Unlimited Gratitude per month',
      },
    ],
    title: 'Mindmail Powerful Jump In',
    type: 'powerful',
  },
  {
    buttonText: 'Get started',
    id: 3,
    price: '$69.99',
    recommended: 1,
    services: [
      {
        id: 1,
        name: 'Unlimited Affirmation per month',
      },
      {
        id: 2,
        name: 'Unlimited Gratitude per month',
      },
      {
        id: 3,
        name: 'Unlimited Visualization per month',
      },
      {
        id: 4,
        name: 'No ads',
      },
    ],
    title: 'Mindmail Deep Focus',
    type: 'deep',
  },
]
