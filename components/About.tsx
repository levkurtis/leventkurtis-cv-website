export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-accent">#</span> About Me
        </h2>

        <div className="bg-card border border-border rounded-xl p-8">
          <p className="text-lg leading-relaxed text-foreground/90">
            I sit at the intersection of data & AI, strategy, and people. As a Team Lead and Consultant at
            Accenture, I advise clients on data-driven transformation, leading a team delivering data solutions
            for a large-scale public sector initiative. I translate complex data challenges into actionable
            insights and business solutions, spanning dashboards, data quality, automation, and early
            adoption of ML/AI.
          </p>

          <p className="text-lg leading-relaxed text-foreground/90 mt-6">
            With a background in digital business strategy and hands-on technical
            expertise, I bridge the gap between technical teams and executive stakeholders. Driven by
            curiosity and continuous learning, I&apos;m exploring GenAI tools like LM Studio and Ollama outside of
            work.
          </p>

          <p className="text-lg leading-relaxed text-accent font-medium mt-6">
            Currently looking for a consulting role that values both strategic thinking and technical depth.
          </p>
        </div>
      </div>
    </section>
  )
}
