export function Footer() {
  return (
    <footer className="border-t border-antique/20 bg-charcoal py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 text-sm text-aged md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-serif text-lg uppercase tracking-[0.18em] text-parchment">The First Resident of Briar Glen</p>
        <p>© {new Date().getFullYear()} Larry Lowe. All rights reserved.</p>
      </div>
    </footer>
  );
}
