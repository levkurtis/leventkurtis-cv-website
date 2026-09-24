export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-accent" aria-hidden="true">#</span> About Me
        </h2>

        <div className="bg-card border border-border rounded-xl p-8">
          <p className="text-lg leading-relaxed text-foreground/90">
            As a Consultant at Accenture, I advise clients on data-driven transformation and implement the solutions that follow. I
            translate complex data challenges into action, from data migration and quality frameworks to analytics, automation and ML/
            AI adoption. With hands-on technical expertise and a digital business background, I bridge the gap between technical
            teams and executive stakeholders. Driven by curiosity, I explore GenAI tools like LM Studio and Ollama outside of work.
          </p>
        </div>
      </div>
    </section>
  )
}
