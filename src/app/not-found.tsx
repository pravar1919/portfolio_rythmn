import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav tone="dark" />
      <main id="main" className="flex min-h-[100svh] flex-col items-start justify-center bg-night text-white">
        <div className="shell">
          <p className="eyebrow text-amber">404</p>
          <h1 className="headline mt-5 text-[clamp(3rem,8vw,7rem)]">This page skipped a beat.</h1>
          <Link href="/" className="btn-amber mt-10">
            Back to the studio <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
