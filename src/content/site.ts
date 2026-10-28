// Company facts. Everything here is shown on the site — keep it true.
// Contact channels: add `whatsapp` (digits with country code) or `calendar` (booking URL) to switch
// those buttons on everywhere; empty strings render nothing.
export const site = {
  name: "Rythmn AI",
  legalName: "Rythmn AI Digital Private Limited",
  url: "https://portfolio.rythmnai.com",
  email: "hello@rythmnai.com",
  whatsapp: "",
  calendar: "",
  location: "Alwar, Rajasthan, India",
  address: {
    street: "Flat No. 163, First Floor, Block-A, AGS Extension, Apna Ghar Shalimar",
    locality: "Alwar",
    region: "Rajasthan",
    postalCode: "301001",
    country: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/rythmnai/",
    instagram: "https://www.instagram.com/rythmnai",
    facebook: "https://www.facebook.com/rythmnai",
  },
  description:
    "Rythmn AI is a software studio building SaaS products, AI systems and cloud infrastructure for startups and software agencies — Python, Django, FastAPI and React, from first commit to production.",
};

/** A mailto: link with a prefilled subject and body. */
export function mailto(subject: string, body = "") {
  const q = new URLSearchParams({ subject, body }).toString().replace(/\+/g, "%20");
  return `mailto:${site.email}?${q}`;
}

export function whatsappLink(text: string) {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "";
}
