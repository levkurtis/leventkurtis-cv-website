export default function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-bold mb-12 text-center">
      <span className="text-accent">#</span> {title}
    </h2>
  )
}
