export default function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-accent">#</span> Education
        </h2>

        <div className="bg-card border border-border rounded-xl p-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold">
                MSc in Business Administration and E-business
              </h3>
              <p className="text-accent font-medium">Copenhagen Business School</p>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
              <span className="text-sm">Copenhagen, Denmark</span>
            </div>
          </div>

          <div className="space-y-6">
            {/* Thesis */}
            <div className="border-l-2 border-accent pl-4">
              <h4 className="font-semibold text-foreground/90 mb-2">Thesis</h4>
              <p className="text-sm text-foreground/70">
                The Digital Transformation of Traditional Retail: Advancing Digital Maturity with E-commerce Capability-Building
              </p>
            </div>

            {/* Projects */}
            <div className="border-l-2 border-accent pl-4">
              <h4 className="font-semibold text-foreground/90 mb-2">Projects</h4>
              <ul className="space-y-1">
                <li className="text-sm text-foreground/70 flex">
                  <span className="text-accent mr-2">›</span>
                  <span>Sentiment Analysis of Spotify&apos;s Brand Perception</span>
                </li>
                <li className="text-sm text-foreground/70 flex">
                  <span className="text-accent mr-2">›</span>
                  <span>AI in the Danish Marketing Industry</span>
                </li>
              </ul>
            </div>

            {/* Relevant Courses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold text-foreground/90 mb-2">Data & AI Courses</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-foreground/70">Data Analytics in Digital Business</li>
                  <li className="text-sm text-foreground/70">Big Social Data Analytics</li>
                  <li className="text-sm text-foreground/70">AI in Business and Society</li>
                </ul>
              </div>

              <div className="border-l-2 border-accent pl-4">
                <h4 className="font-semibold text-foreground/90 mb-2">Digital Business & Strategy</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-foreground/70">Digital Transformation Management</li>
                  <li className="text-sm text-foreground/70">Digital Platforms</li>
                  <li className="text-sm text-foreground/70">Strategic Tools for Digital Business</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
