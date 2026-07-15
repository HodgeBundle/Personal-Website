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
            <span className="english-name">Zheng Zhu</span>
            <span className="chinese-name" lang="zh-Hans">朱政</span>
          </h1>
          <p className="hero-intro">
            I work in arithmetic dynamics, Arakelov geometry, and Diophantine
            geometry.
          </p>
          <address className="hero-contact" aria-label="Contact information">
            <div>
              <span>Email</span>
              <a href="mailto:zheng.zhu2@ucalgary.ca">zheng.zhu2@ucalgary.ca</a>
            </div>
            <div>
              <span>Office</span>
              <p>Mathematical Sciences 464</p>
            </div>
            <div>
              <span>Affiliation</span>
              <p>University of Calgary · PIMS</p>
            </div>
          </address>
        </div>

        <aside className="current-work" aria-label="Current research themes">
          <span className="current-work-label">Current work</span>
          <span>Arboreal Galois representations</span>
          <span aria-hidden="true">·</span>
          <span>Diophantine approximation</span>
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
          equidistribution, and Diophantine approximation.
        </p>
        <Link className="text-link" href="/research">
          View research and publications <span aria-hidden="true">→</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
