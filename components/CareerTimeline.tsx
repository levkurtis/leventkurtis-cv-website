'use client'

import { useState } from 'react'

// === INTERFACES ===
interface Role {
  title: string
  period: string
  description: string
  achievements: string[]
}

interface Job {
  company: string
  location?: string
  roles: Role[]
  internalInitiatives?: string[]
}

// === DATA ===
const experiences: Job[] = [
  {
    company: 'Accenture',
    roles: [
      {
        title: 'Team Lead',
        period: '01/2025 – Current',
        description: 'Promoted to lead a team of 3 consultants on a large-scale public sector data initiative, responsible for delivery, onboarding, and professional development.',
        achievements: [
          'Own delivery of dashboards, data analyses, and data quality efforts, aligning legal, technical, and business stakeholders around project goals.',
          'Lead PI planning for the data team, defining priorities and allocating resources to deliverables in coordination with client stakeholders.',
          'Oversee the development of databases in collaboration with data engineers, legal experts, and business teams.',
          'Drive the development of an automation tool that streamlines data analysis, enabling the business to optimise processes independently.',
          'Onboard and training 2 new consultants currently joining the team.',
          'Played a key role in a system implementation for the high-priority cross-agency initiative, critical to client dataflow and reporting capabilities.',
          'Identified opportunities for ML-based classification and advanced analytics, and co-led a task force to assess potential use cases.',
          'Previously onboarded and trained 2 consultants who transitioned to lead efforts in other areas of the project.',
        ],
      },
      {
        title: 'Data & AI Consultant',
        period: '09/2023 – 12/2024',
        description: 'Consultant on a large-scale public sector data initiative.',
        achievements: [
          'Led a high-priority cross-agency initiative to resolve complex data quality issues in a system previously deemed unresolvable. Efforts unlocked 350M+ DKK in previously frozen cases.',
          'Managed analytical engagements end-to-end, from data collection and analysis to presenting findings and recommendations to client stakeholders, enabling informed decision-making.',
          'Built Power BI dashboards used to communicate key metrics to senior stakeholders, including department heads across the organisation.',
          'Facilitated knowledge-sharing workshops for a team of 10+ consultants.',
          'Proactively onboarded 2 new team members, training them on client context, system history, and technical tools.',
        ],
      },
    ],
    internalInitiatives: [
      'Founded and lead Accenture\'s partnership with Multicultural Students of CBS, a student organisation at Copenhagen Business School. Manage a team of 6 to drive employer branding, D&I, and talent attraction.',
      'Organised 3 networking events (30–40+ attendees each) and a case competition (25+ participants) through the partnership.',
      'Co-lead monthly department community meetings, facilitating industry talks, knowledge sharing, and training sessions.',
      'Supported end-to-end recruitment for the Tech Talent Program, including CV screening, candidate assessment, and providing hiring recommendations to recruiters.',
      'Recruited Accenture consultants to participate in a cross-company hackathon in collaboration with DTU.',
      'Completed Accenture\'s Tech Talent Program, a two-year graduate development program focused on technical consulting skills and professional growth.',
    ],
  },
  {
    company: 'Marcher Markholt',
    roles: [
      {
        title: 'Researcher',
        period: '11/2021 – 08/2023',
        description: 'Headhunting agency specialised in marketing, communication, tech, and media.',
        achievements: [
          'Owned end-to-end recruitment processes for 4+ roles simultaneously, from candidate sourcing and assessment to client presentation.',
          'Served as assistant to a partner, supporting business development and recruitment operations.',
          'Built automations for the agency\'s Trello workflows, improving task management across the team.',
          'Conducted a boolean search workshop and built a library of reusable search templates, improving sourcing efficiency and becoming the go-to technical expert at the agency.',
        ],
      },
    ],
  },
  {
    company: 'Accord',
    roles: [
      {
        title: 'E-commerce Assistant',
        period: '12/2020 – 10/2021',
        description: 'Supported the launch and daily operations of a new webshop for Denmark\'s largest retailer of second-hand music and movies.',
        achievements: [
          'Managed end-to-end e-commerce operations, including inventory control, order fulfilment, and coordination with physical stores.',
          'Streamlined workflows by automating key operational processes with JavaScript.',
        ],
      },
    ],
  },
  {
    company: 'Retail Brands',
    roles: [
      {
        title: 'E-commerce Assistant',
        period: '08/2019 – 08/2020',
        description: 'Supported the online presence of luxury brands Hotel Chocolat and Swarovski across the Nordic region.',
        achievements: [
          'Managed daily webshop operations, including product updates, order processing, and customer support.',
          'Led content creation for online campaigns during COVID lockdown, driving webshop sales to 40% of typical physical store revenue in Copenhagen.',
        ],
      },
    ],
  },
]

// === HELPER FUNCTIONS ===
function getCompanyDateRange(job: Job): string {
  const allPeriods = job.roles.map((r) => r.period)
  const startDate = allPeriods[allPeriods.length - 1].split(' – ')[0]
  const endDate = allPeriods[0].split(' – ')[1]
  return `${startDate} – ${endDate}`
}

function isCurrent(job: Job): boolean {
  return job.roles[0].period.includes('Current')
}

// === SUB-COMPONENTS ===
function ChevronIcon({ isExpanded, className = '' }: { isExpanded: boolean; className?: string }) {
  return (
    <svg
      className={`w-5 h-5 text-muted transition-transform duration-200 ${
        isExpanded ? 'rotate-180' : ''
      } ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function RoleCard({
  role,
  isExpanded,
  onToggle,
  isCurrent,
}: {
  role: Role
  isExpanded: boolean
  onToggle: () => void
  isCurrent: boolean
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left bg-card border border-border rounded-xl p-4 md:p-5 hover:border-accent/50 transition-colors duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
            <h4 className="font-semibold text-accent">{role.title}</h4>
            {isCurrent && (
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                Current
              </span>
            )}
          </div>
          <p className="text-xs text-muted mb-2">{role.period}</p>
          <p className="text-sm text-foreground/80">{role.description}</p>
        </div>
        <div className="flex-shrink-0 mt-1">
          <ChevronIcon isExpanded={isExpanded} className="w-4 h-4" />
        </div>
      </div>

      {/* Expandable achievements */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 border-t border-border pt-4">
            {role.achievements.map((achievement, idx) => (
              <li key={idx} className="text-sm text-foreground/70 flex">
                <span className="text-accent mr-2 flex-shrink-0">›</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

function InitiativesCard({
  initiatives,
  isExpanded,
  onToggle,
}: {
  initiatives: string[]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left bg-card border border-border rounded-xl p-4 md:p-5 hover:border-accent/50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-accent">Internal Initiatives</h4>
          <span className="text-xs text-muted bg-background/50 px-2 py-0.5 rounded">
            Leadership, D&I, Community
          </span>
        </div>
        <ChevronIcon isExpanded={isExpanded} className="w-4 h-4" />
      </div>

      {/* Expandable content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <ul className="space-y-2 border-t border-border pt-4">
            {initiatives.map((initiative, idx) => (
              <li key={idx} className="text-sm text-foreground/70 flex">
                <span className="text-accent mr-2 flex-shrink-0">›</span>
                <span>{initiative}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  )
}

function SubRoleMarker() {
  // Small muted dot centered ON the timeline line
  return (
    <div className="absolute -left-[37px] md:-left-[45px] top-5">
      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-muted border border-muted" />
    </div>
  )
}

function CompanySection({
  job,
  isLast,
  expandedRoles,
  toggleRole,
  showInitiatives,
  toggleInitiatives,
}: {
  job: Job
  isLast: boolean
  expandedRoles: Record<string, boolean>
  toggleRole: (id: string) => void
  showInitiatives: boolean
  toggleInitiatives: () => void
}) {
  const current = isCurrent(job)
  const hasMultipleRoles = job.roles.length > 1 || (job.internalInitiatives && job.internalInitiatives.length > 0)

  // Calculate total sub-items for line extension
  const subItemCount = job.roles.length + (job.internalInitiatives ? 1 : 0)

  return (
    <div className="relative pb-8">
      {/* Connecting line to next company */}
      {!isLast && (
        <div className="absolute left-[15px] md:left-[23px] top-6 bottom-0 w-0.5 bg-border" />
      )}

      {/* Company node dot */}
      <div className="absolute left-0 w-[30px] md:w-[46px] flex justify-center top-1">
        <div
          className={`rounded-full ${
            current
              ? 'w-4 h-4 md:w-5 md:h-5 bg-accent border-2 border-accent shadow-lg shadow-accent/30'
              : 'w-3 h-3 md:w-4 md:h-4 bg-background border-2 border-accent'
          }`}
        />
      </div>

      {/* Company content */}
      <div className="ml-10 md:ml-14">
        {/* Company header */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h3 className="text-xl font-bold text-foreground">{job.company}</h3>
            {current && (
              <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-muted">{getCompanyDateRange(job)}</p>
        </div>

        {/* Roles container */}
        {hasMultipleRoles ? (
          <div className="space-y-3">
            {job.roles.map((role, idx) => (
              <div key={`${job.company}-${idx}`} className="relative">
                <SubRoleMarker />
                <RoleCard
                  role={role}
                  isExpanded={!!expandedRoles[`${job.company}-${idx}`]}
                  onToggle={() => toggleRole(`${job.company}-${idx}`)}
                  isCurrent={idx === 0 && role.period.includes('Current')}
                />
              </div>
            ))}

            {/* Internal Initiatives */}
            {job.internalInitiatives && job.internalInitiatives.length > 0 && (
              <div className="relative">
                <SubRoleMarker />
                <InitiativesCard
                  initiatives={job.internalInitiatives}
                  isExpanded={showInitiatives}
                  onToggle={toggleInitiatives}
                />
              </div>
            )}
          </div>
        ) : (
          // Single role - show directly without nesting
          <div className="bg-card border border-border rounded-xl p-4 md:p-5">
            <button
              onClick={() => toggleRole(`${job.company}-0`)}
              className="w-full text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-accent mb-1">{job.roles[0].title}</h4>
                  <p className="text-sm text-foreground/80">{job.roles[0].description}</p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <ChevronIcon isExpanded={!!expandedRoles[`${job.company}-0`]} />
                </div>
              </div>

              {/* Expandable achievements */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  expandedRoles[`${job.company}-0`] ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2 border-t border-border pt-4">
                    {job.roles[0].achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-foreground/70 flex">
                        <span className="text-accent mr-2 flex-shrink-0">›</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// === MAIN COMPONENT ===
export default function CareerTimeline() {
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({
    'Accenture-0': true, // Current role expanded by default
  })
  const [showInitiatives, setShowInitiatives] = useState(false)

  const toggleRole = (id: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent">#</span> Work Experience
        </h2>

        <div className="relative">
          {experiences.map((job, idx) => (
            <CompanySection
              key={job.company}
              job={job}
              isLast={idx === experiences.length - 1}
              expandedRoles={expandedRoles}
              toggleRole={toggleRole}
              showInitiatives={showInitiatives}
              toggleInitiatives={() => setShowInitiatives(!showInitiatives)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
