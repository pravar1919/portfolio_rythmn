/** The studio name set in the display face; replaces the gradient logo mark in the chrome. */
export function Wordmark({ className = "", accent = "text-clay" }: { className?: string; accent?: string }) {
  return (
    <span className={`font-display text-[23px] leading-none tracking-[-0.02em] ${className}`}>
      Rythmn <em className={accent}>AI</em>
    </span>
  );
}
