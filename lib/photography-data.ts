export type Spread =
  | { type: 'hero'; image: string; title: string; subtitle?: string }
  | { type: 'text-right'; image: string; title: string; text: string }
  | { type: 'text-left'; image: string; title: string; text: string }
  | { type: 'full-width'; image: string; caption?: string }
  | { type: 'grid-quote'; images: string[]; quote: string }
  | { type: 'duo'; images: [string, string]; caption?: string }

export const seoulSpreads: Spread[] = [
  {
    type: 'hero',
    image: '/photography-portfolio/seoul/card1.jpg',
    title: 'Seoul, South Korea',
    subtitle: 'A journey through tradition and modernity',
  },
  {
    type: 'text-right',
    image: '/photography-portfolio/seoul/card2.jpg',
    title: 'First Impressions',
    text: 'Landing in Seoul feels like stepping into the future while being surrounded by centuries of history. The city pulses with an energy that is uniquely Korean.',
  },
  {
    type: 'duo',
    images: ['/photography-portfolio/seoul/card3.jpg', '/photography-portfolio/seoul/card4.jpg'],
    caption: 'Where ancient palaces meet neon lights',
  },
  {
    type: 'text-left',
    image: '/photography-portfolio/seoul/card5.jpg',
    title: 'Street Life',
    text: 'The streets of Seoul tell their own stories. From the bustling markets of Myeongdong to the quiet alleys of Bukchon, every corner reveals something unexpected.',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/seoul/card6.jpg',
    caption: 'Golden hour over the Han River',
  },
  {
    type: 'grid-quote',
    images: [
      '/photography-portfolio/seoul/card7.jpg',
      '/photography-portfolio/seoul/card8.jpg',
      '/photography-portfolio/seoul/card9.jpg',
      '/photography-portfolio/seoul/card10.jpg',
    ],
    quote: 'In Seoul, tradition is not preserved — it is lived',
  },
  {
    type: 'text-right',
    image: '/photography-portfolio/seoul/card11.jpg',
    title: 'Temple Mornings',
    text: 'Waking up early to visit the temples before the crowds. The silence, broken only by distant chanting, creates a sense of peace that stays with you.',
  },
  {
    type: 'duo',
    images: ['/photography-portfolio/seoul/card12.jpg', '/photography-portfolio/seoul/card13.jpg'],
    caption: 'Details in the architecture',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/seoul/card14.jpg',
  },
  {
    type: 'text-left',
    image: '/photography-portfolio/seoul/card15.jpg',
    title: 'Night Falls',
    text: 'As darkness settles, Seoul transforms. The city lights up in ways that make you understand why they call it the city that never sleeps.',
  },
  {
    type: 'grid-quote',
    images: [
      '/photography-portfolio/seoul/card16.jpg',
      '/photography-portfolio/seoul/card17.jpg',
      '/photography-portfolio/seoul/card18.jpg',
      '/photography-portfolio/seoul/card19.jpg',
    ],
    quote: 'Every photograph is a memory I can revisit',
  },
  {
    type: 'full-width',
    image: '/photography-portfolio/seoul/card20.jpg',
    caption: 'Until next time, Seoul',
  },
]

export type Album = {
  slug: string
  title: string
  subtitle?: string
  thumbnail: string
  gradientColors: [string, string]
}

export const albums: Album[] = [
  {
    slug: 'seoul',
    title: "Seoul '19",
    subtitle: 'South Korea',
    thumbnail: '/photography-portfolio/seoul/card1.jpg',
    gradientColors: ['#e8b4b8', '#a7c7e7'],
  },
  {
    slug: 'japan',
    title: "Japan '24",
    subtitle: 'Japan',
    thumbnail: '/photography-portfolio/japan/card1.JPG',
    gradientColors: ['#dc5c5c', '#fff5f5'],
  },
  {
    slug: 'vietnam',
    title: "Vietnam '25",
    subtitle: 'Vietnam',
    thumbnail: '/photography-portfolio/vietnam/card1.JPG',
    gradientColors: ['#da251d', '#ffcd00'],
  },
]

export const japanPhotos = [
  'card1.JPG',
  'card2.JPG',
  'card3.JPG',
  'card4.JPG',
  'card5.JPG',
  'card6.JPG',
  'card7.JPG',
  'card8.JPG',
]

export const vietnamPhotos = [
  'card1.JPG',
  'card2.JPG',
  'card3.JPG',
  'card4.JPG',
  'card5.JPG',
  'card6.JPG',
  'card7.JPG',
  'card8.JPG',
  'card9.JPG',
  'card10.JPG',
  'card11.JPG',
]
