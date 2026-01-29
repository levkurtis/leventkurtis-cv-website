export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Levent Kurtis',
    url: 'https://leventkurtis.com',
    image: 'https://leventkurtis.com/photo.jpg',
    jobTitle: 'Senior Business Architecture Analyst',
    worksFor: {
      '@type': 'Organization',
      name: 'Accenture',
    },
    sameAs: [
      'https://linkedin.com/in/leventkurtis',
    ],
    knowsAbout: ['Data & AI', 'Digital Transformation', 'Agile', 'Consulting'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Copenhagen',
      addressCountry: 'Denmark',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Levent Kurtis',
    url: 'https://leventkurtis.com',
    description: 'Personal website of Levent Kurtis - Tech Leader at the Intersection of Data & AI, People, and Delivery.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
