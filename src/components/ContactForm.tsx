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
  theme = "forest",
}: {
  subject: string;
  fields: Field[];
  submitLabel?: string;
  theme?: "forest" | "ivory";
}) {
  const id = useId();
  const [sent, setSent] = useState(false);

  // Underlined fields rather than boxes: the form reads like the rest of the page.
  const styles = {
    forest: { label: "text-sand", input: "border-ivory/35 text-ivory placeholder:text-ivory/45 focus:border-ivory", option: "bg-forest text-ivory", wa: "btn-outline-light", note: "text-sand" },
    ivory: { label: "text-charcoal/80", input: "border-line-strong text-charcoal placeholder:text-charcoal/40 focus:border-charcoal", option: "bg-ivory text-charcoal", wa: "btn-outline", note: "text-charcoal/80" },
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
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const wide = f.type === "textarea" || f.type === "select";
        const cls = `mt-1 w-full rounded-none border-0 border-b bg-transparent px-0 py-3 text-[17px] outline-none transition-[border-color,box-shadow] focus-visible:outline-none focus:shadow-[0_1px_0_0_currentColor] ${styles.input}`;
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
                <option value="" disabled className={styles.option}>
                  Choose one
                </option>
                {f.options?.map((o) => (
                  <option key={o} className={styles.option}>
                    {o}
                  </option>
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
      <div className="flex flex-col gap-4 pt-2 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn-primary">
          {submitLabel} <span aria-hidden>→</span>
        </button>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={styles.wa}>
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
