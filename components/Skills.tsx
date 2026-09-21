interface SkillCategory {
  title: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Data & Analytics',
    skills: [
      'SQL',
      'Python (pandas, numpy, matplotlib)',
      'Databricks',
      'Data Analysis',
      'Automation',
      'Power BI',
      'Excel',
    ],
  },
  {
    title: 'GenAI & ML/AI',
    skills: [
      'LM Studio',
      'Ollama',
      'KNIME',
      'Sentiment Analysis',
    ],
  },
  {
    title: 'Delivery & Project Management',
    skills: [
      'Agile Delivery',
      'Azure DevOps',
      'JIRA',
      'PI Planning',
      'SAFe',
    ],
  },
  {
    title: 'Leadership & Strategy',
    skills: [
      'Team Leadership',
      'Stakeholder Management',
      'Digital Transformation',
      'Digital Strategy',
    ],
  },
  {
    title: 'Languages',
    skills: [
      'Danish (Native)',
      'English (Bilingual)',
      'Turkish (Bilingual)',
      'Macedonian (Full)',
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent">#</span> Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold mb-4 text-accent">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-background border border-border rounded-full text-foreground/80 hover:border-accent/50 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
