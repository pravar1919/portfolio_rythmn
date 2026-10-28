"use client";

import { useId, useState } from "react";
import { mailto, site, whatsappLink } from "@/content/site";

type Field = { name: string; label: string; type?: "text" | "email" | "textarea" | "select"; options?: string[]; required?: boolean; placeholder?: string };

/**
 * There is no form backend: on submit this composes an email in the visitor's own mail app,
 * addressed to the studio, with everything they typed. Nothing is stored or sent elsewhere.
 */
export function ContactForm({
  subject,
  fields,
  submitLabel = "Compose email",
  theme = "dark",
}: {
  subject: string;
  fields: Field[];
  submitLabel?: string;
  theme?: "dark" | "light" | "wedding";
}) {
  const id = useId();
  const [sent, setSent] = useState(false);

  const styles = {
    dark: { label: "text-white/60", input: "border-white/15 bg-white/[0.04] text-white placeholder:text-white/30 focus:border-amber", btn: "btn-amber", note: "text-white/45" },
    light: { label: "text-muted", input: "border-line bg-white text-ink placeholder:text-ink/30 focus:border-ink", btn: "btn-ink", note: "text-muted" },
    wedding: { label: "text-maroon/70", input: "border-maroon/20 bg-white/70 text-maroon placeholder:text-maroon/30 focus:border-maroon", btn: "btn bg-maroon text-ivory hover:bg-[#470a17]", note: "text-maroon/80" },
  }[theme];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = fields
      .map((f) => [f.label, String(data.get(f.name) ?? "").trim()] as const)
      .filter(([, v]) => v)
      .map(([k, v]) => (k.length + v.length > 70 ? `${k}:\n${v}` : `${k}: ${v}`));
    const name = String(data.get("name") ?? "").trim();
    window.location.href = mailto(name ? `${subject} — ${name}` : subject, lines.join("\n\n"));
    setSent(true);
  }

  const wa = whatsappLink(`Hi Rythmn AI — ${subject}`);

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const wide = f.type === "textarea" || f.type === "select";
        const cls = `mt-2 w-full rounded-xl border px-4 py-3.5 text-[15px] outline-none transition-colors ${styles.input}`;
        return (
          <div key={f.name} className={wide ? "sm:col-span-2" : ""}>
            <label htmlFor={fid} className={`eyebrow ${styles.label}`}>
              {f.label}
              {f.required && <span aria-hidden> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea id={fid} name={f.name} required={f.required} rows={5} placeholder={f.placeholder} className={`${cls} resize-y`} />
            ) : f.type === "select" ? (
              <select id={fid} name={f.name} required={f.required} className={cls} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={fid}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.name === "name" ? "name" : f.name === "email" ? "email" : f.name === "company" ? "organization" : undefined}
                className={cls}
              />
            )}
          </div>
        );
      })}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className={styles.btn}>
          {submitLabel} <span aria-hidden>→</span>
        </button>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn border border-current/20">
            WhatsApp us
          </a>
        )}
        <p className={`text-[13px] ${styles.note}`} aria-live="polite">
          {sent ? (
            <>Your mail app should have opened. If it didn’t, write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</>
          ) : (
            <>Opens your email app with this filled in. Or write to <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>.</>
          )}
        </p>
      </div>
    </form>
  );
}
