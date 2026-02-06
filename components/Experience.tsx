'use client'

import { useState } from 'react'
import { experiences } from '@/lib/experience-data'
import { ChevronIcon } from './icons'

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
    <section id="experience" className="py-20 px-4">
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
                <ChevronIcon isExpanded={expandedJobs[job.company]} />
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
                        <ChevronIcon isExpanded={showInitiatives} className="w-4 h-4" />
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
