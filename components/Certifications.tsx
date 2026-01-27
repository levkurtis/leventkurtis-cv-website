interface Certification {
  name: string
  issuer: string
  year: string
}

interface CertificationCategory {
  title: string
  certifications: Certification[]
}

const certificationCategories: CertificationCategory[] = [
  {
    title: 'Generative AI & Agentic AI',
    certifications: [
      { name: 'Generative AI Leader Certification', issuer: 'Google', year: '2025' },
      { name: 'Reinvention with Agentic AI', issuer: 'Accenture', year: '2025' },
      { name: 'GenAI for Delivery Practitioners: Level 2', issuer: 'Accenture', year: '2025' },
    ],
  },
  {
    title: 'Data & AI',
    certifications: [
      { name: 'Databricks Fundamentals Accreditation', issuer: 'Databricks', year: '2025' },
      { name: 'Business Intelligence Specialisation', issuer: 'Google', year: '2024' },
      { name: 'Data Analytics Specialisation', issuer: 'Google', year: '2024' },
      { name: 'Digital Shaper Program, Data Science & AI', issuer: 'TechLabs', year: '2022' },
    ],
  },
  {
    title: 'Project Delivery',
    certifications: [
      { name: 'Professional Scrum Master PSM I', issuer: 'Scrum.org', year: '2025' },
      { name: 'Certified SAFe® 6 Practitioner', issuer: 'Scaled Agile, Inc.', year: '2023' },
    ],
  },
  {
    title: 'Consulting & Leadership',
    certifications: [
      { name: 'People Leadership Credential - Level 1', issuer: 'Accenture', year: '2025' },
      { name: 'Consultant Virtual Experience Program', issuer: 'Accenture', year: '2022' },
    ],
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent">#</span> Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {certificationCategories.map((category) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-accent">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-accent mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-foreground/90">{cert.name}</p>
                      <p className="text-xs text-muted">{cert.issuer}, {cert.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
