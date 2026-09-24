import { certificationCategories } from './Certifications'
import { skillCategories } from './Skills'

export const SITE_URL = 'https://leventkurtis.com'

const PERSON_ID = `${SITE_URL}/#person`

/** Skill categories that describe expertise rather than spoken languages. */
const EXPERTISE_CATEGORIES = [
  'Data & Analytics',
  'GenAI & ML/AI',
  'Delivery & Project Management',
  'Leadership & Strategy',
]

const knowsAbout = skillCategories
  .filter((c) => EXPERTISE_CATEGORIES.includes(c.title))
  .flatMap((c) => c.skills)

// "Danish (Native)" -> "Danish"
const knowsLanguage =
  skillCategories
    .find((c) => c.title === 'Languages')
    ?.skills.map((s) => s.replace(/\s*\(.*\)$/, '')) ?? []

const hasCredential = certificationCategories.flatMap((category) =>
  category.certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.name,
    credentialCategory: 'certificate',
    dateCreated: cert.year,
    recognizedBy: { '@type': 'Organization', name: cert.issuer },
  }))
)

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Levent Kurtis',
  givenName: 'Levent',
  familyName: 'Kurtis',
  url: SITE_URL,
  image: `${SITE_URL}/photo-1000.jpg`,
  jobTitle: 'Senior Business Architecture Analyst',
  description:
    'Data & AI consultant and team lead at Accenture in Copenhagen, working on large-scale public sector data transformation.',
  worksFor: { '@type': 'Organization', name: 'Accenture', url: 'https://www.accenture.com' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Copenhagen Business School',
    url: 'https://www.cbs.dk',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Copenhagen',
    addressCountry: 'DK',
  },
  sameAs: ['https://www.linkedin.com/in/leventkurtis', 'https://github.com/levkurtis'],
  knowsAbout,
  knowsLanguage,
  hasCredential,
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Levent Kurtis | Data & AI Leader',
      mainEntity: { '@id': PERSON_ID },
      isPartOf: { '@id': `${SITE_URL}/#website` },
      inLanguage: 'en',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Levent Kurtis',
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    person,
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents the JSON payload from closing the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  )
}
