import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="flex min-h-[100svh] flex-col justify-center pt-20">
        <div className="shell">
          <p className="kicker text-clay">404</p>
          <h1 className="headline mt-6 text-[clamp(3.2rem,9vw,8.5rem)]">
            This page skipped <em className="text-terracotta">a beat.</em>
          </h1>
          <Link href="/" className="btn-primary mt-12">
            Back to the studio <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
