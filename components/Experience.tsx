'use client'

import { useState } from 'react'

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

export default function Experience() {
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({
    'Accenture': true,
  })
  const [showInitiatives, setShowInitiatives] = useState(false)

  const toggleJob = (company: string) => {
    setExpandedJobs((prev) => ({
      ...prev,
      [company]: !prev[company],
    }))
  }

  return (
    <section id="experience" className="py-20 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent">#</span> Work Experience
        </h2>

        <div className="space-y-6">
          {experiences.map((job) => (
            <div
              key={job.company}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleJob(job.company)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-card-hover transition-colors duration-200"
              >
                <div className="text-left">
                  <h3 className="text-xl font-semibold">{job.company}</h3>
                  <p className="text-sm text-muted">
                    {job.roles[0].title} • {job.roles[job.roles.length - 1].period.split(' – ')[0]} – {job.roles[0].period.split(' – ')[1]}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-muted transition-transform duration-200 ${
                    expandedJobs[job.company] ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedJobs[job.company] && (
                <div className="px-6 pb-6 space-y-6">
                  {job.roles.map((role, idx) => (
                    <div key={idx} className="border-l-2 border-accent pl-4">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="font-semibold text-accent">{role.title}</h4>
                        <span className="text-sm text-muted">• {role.period}</span>
                      </div>
                      <p className="text-sm text-foreground/80 mb-3">{role.description}</p>
                      <ul className="space-y-2">
                        {role.achievements.map((achievement, aIdx) => (
                          <li key={aIdx} className="text-sm text-foreground/70 flex">
                            <span className="text-accent mr-2">›</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Internal Initiatives - Only for Accenture */}
                  {job.internalInitiatives && (
                    <div className="border-l-2 border-accent/50 pl-4 mt-6">
                      <button
                        onClick={() => setShowInitiatives(!showInitiatives)}
                        className="flex items-center gap-2 mb-3 group"
                      >
                        <h4 className="font-semibold text-accent/80 group-hover:text-accent transition-colors">
                          Internal Initiatives
                        </h4>
                        <span className="text-xs text-muted bg-background/50 px-2 py-0.5 rounded">
                          Leadership, D&I, Community
                        </span>
                        <svg
                          className={`w-4 h-4 text-muted transition-transform duration-200 ${
                            showInitiatives ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showInitiatives && (
                        <ul className="space-y-2">
                          {job.internalInitiatives.map((initiative, idx) => (
                            <li key={idx} className="text-sm text-foreground/70 flex">
                              <span className="text-accent/70 mr-2">›</span>
                              <span>{initiative}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
