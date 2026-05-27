export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-[var(--glass-border)] flex flex-col items-center gap-3">
      <a
        href="https://github.com/Ericknvp/ericknvp.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-mono text-muted opacity-50 hover:opacity-100 transition-opacity duration-200"
      >
        Ver código fuente
      </a>
      <p className="text-xs font-mono text-muted opacity-50">
        © 2026 ericknvp.dev
      </p>
    </footer>
  )
}
