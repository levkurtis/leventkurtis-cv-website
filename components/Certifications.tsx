interface Certification {
  name: string
  issuer: string
  year: string
  status: 'completed' | 'in-progress'
  progress?: number
  targetDate?: string
}

interface CertificationCategory {
  title: string
  certifications: Certification[]
}

const certificationCategories: CertificationCategory[] = [
  {
    title: 'Generative AI & Agentic AI',
    certifications: [
      { name: 'Generative AI Leader Certification', issuer: 'Google', year: '2025', status: 'completed' },
      { name: 'Reinvention with Agentic AI', issuer: 'Accenture', year: '2025', status: 'completed' },
      { name: 'GenAI for Delivery Practitioners: Level 2', issuer: 'Accenture', year: '2025', status: 'completed' },
    ],
  },
  {
    title: 'Data & AI',
    certifications: [
      { name: 'Databricks Fundamentals Accreditation', issuer: 'Databricks', year: '2025', status: 'completed' },
      { name: 'Business Intelligence Specialisation', issuer: 'Google', year: '2024', status: 'completed' },
      { name: 'Data Analytics Specialisation', issuer: 'Google', year: '2024', status: 'completed' },
      { name: 'Digital Shaper Program, Data Science & AI', issuer: 'TechLabs', year: '2022', status: 'completed' },
    ],
  },
  {
    title: 'Project Delivery',
    certifications: [
      { name: 'PRINCE2 Foundation', issuer: 'AXELOS', year: '2026', status: 'in-progress', progress: 35, targetDate: 'Q2 2026' },
      { name: 'Professional Scrum Master PSM I', issuer: 'Scrum.org', year: '2025', status: 'completed' },
      { name: 'Certified SAFe® 6 Practitioner', issuer: 'Scaled Agile, Inc.', year: '2023', status: 'completed' },
    ],
  },
  {
    title: 'Consulting & Leadership',
    certifications: [
      { name: 'People Leadership Credential - Level 1', issuer: 'Accenture', year: '2025', status: 'completed' },
      { name: 'Consultant Virtual Experience Program', issuer: 'Accenture', year: '2022', status: 'completed' },
    ],
  },
]

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-border rounded-full h-1.5 mt-2">
      <div
        className="bg-accent h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function CompletedIcon() {
  return (
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
  )
}

function InProgressIcon() {
  return (
    <svg
      className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0 animate-pulse"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4">
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
                    {cert.status === 'in-progress' ? (
                      <InProgressIcon />
                    ) : (
                      <CompletedIcon />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${cert.status === 'in-progress' ? 'text-foreground/70' : 'text-foreground/90'}`}>
                        {cert.name}
                      </p>
                      <p className="text-xs text-muted">
                        {cert.issuer}
                        {cert.status === 'in-progress' && cert.targetDate
                          ? ` • Target: ${cert.targetDate}`
                          : `, ${cert.year}`}
                      </p>
                      {cert.status === 'in-progress' && cert.progress !== undefined && (
                        <>
                          <ProgressBar progress={cert.progress} />
                          <p className="text-xs text-blue-400 mt-1">{cert.progress}% complete</p>
                        </>
                      )}
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
