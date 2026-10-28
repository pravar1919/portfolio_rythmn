// Above-the-fold entrance animations in pure CSS, so hero text paints without waiting for
// JavaScript (scroll-triggered reveals further down use <Reveal>).

type FadeProps = { children: React.ReactNode; d?: number; className?: string };

export function Fade({ children, d = 0, className = "" }: FadeProps) {
  return (
    <div className={`anim-fade ${className}`} style={{ "--d": `${d}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** Splits a line into words that rise in sequence. Screen readers get the plain sentence. */
export function WordRise({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <span className="anim-rise inline-block" style={{ "--d": `${delay + i * 0.05}s` } as React.CSSProperties}>
              {w}
              {i < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

/** Above-the-fold images wipe up into view from their bottom edge. */
export function Unveil({ children, d = 0, className = "" }: FadeProps) {
  return (
    <div className={`anim-unveil ${className}`} style={{ "--d": `${d}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}
