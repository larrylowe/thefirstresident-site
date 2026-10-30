/** Thin gold rule with a centred diamond, used between labels and headings. */
export function Ornament({ className = "", width = "w-8" }: { className?: string; width?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className={`h-px ${width} bg-antique/50`} />
      <div className="h-1 w-1 rotate-45 bg-antique/70" />
      <div className={`h-px ${width} bg-antique/50`} />
    </div>
  );
}
