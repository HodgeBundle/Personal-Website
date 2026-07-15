import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-shell";

export default function Home() {
  return (
    <main className="site-shell home-page">
      <SiteHeader active="home" />

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow">PIMS Postdoctoral Fellow · University of Calgary</p>
          <h1 id="hero-title">
            <span>Zheng Zhu</span>
            <span className="chinese-name" lang="zh-Hans">朱政</span>
          </h1>
          <p className="hero-intro">
            I am a mathematician working in arithmetic dynamics, Arakelov
            geometry, and Diophantine geometry.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/research">
              Research
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-secondary" href="/about">
              About me
            </Link>
          </div>
        </div>

        <aside className="current-work" aria-label="Current research themes">
          <span className="current-work-label">Current work</span>
          <span>Arboreal Galois representations</span>
          <span aria-hidden="true">·</span>
          <span>Height theory</span>
          <span aria-hidden="true">·</span>
          <span>Unlikely intersections</span>
        </aside>
      </section>

      <section className="home-summary" aria-labelledby="summary-heading">
        <p className="section-kicker">At a glance</p>
        <h2 id="summary-heading">Research shaped by dynamics and arithmetic.</h2>
        <p>
          My work studies arithmetic questions arising from iteration, with
          particular interests in arboreal Galois representations,
          equidistribution, and height theory.
        </p>
        <Link className="text-link" href="/research">
          View research and publications <span aria-hidden="true">→</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
