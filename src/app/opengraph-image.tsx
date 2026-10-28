import { ImageResponse } from "next/og";

export const alt = "Rythmn AI — the engineering partner for teams who need it shipped";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const bars = Array.from({ length: 96 }, (_, i) => {
    const u = i / 96;
    const a = (0.5 + 0.28 * Math.sin(u * 9) + 0.16 * Math.sin(u * 23)) * (0.35 + 0.65 * Math.sin(Math.PI * u) ** 1.5);
    return Math.max(4, a * 150);
  });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#060914", color: "#fff", padding: "64px 72px" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#ffb302", textTransform: "uppercase" }}>Rythmn AI · SaaS · AI · Cloud</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 74, lineHeight: 1.04, letterSpacing: -2 }}>
          <span>The engineering partner for</span>
          <span style={{ display: "flex" }}>
            teams who need it&nbsp;<span style={{ color: "#ffb302", fontStyle: "italic" }}>shipped.</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, height: 150 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 4, height: h, background: "#ffb302", opacity: 0.25 + (h / 150) * 0.75 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
