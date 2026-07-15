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
          <span className="current-work-area">
            <TreeIcon />
            <span>Arboreal Galois representations</span>
          </span>
          <span className="current-work-area">
            <OrbitIcon />
            <span>Diophantine approximation</span>
          </span>
          <span className="current-work-area">
            <IntersectionIcon />
            <span>Unlikely intersections</span>
          </span>
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

function TreeIcon() {
  return (
    <svg className="area-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 17V9m0 4L6 9m4 1 4-4M6 9V5M14 6V3M6 9 3 6" />
      <circle cx="3" cy="6" r="1" />
      <circle cx="6" cy="5" r="1" />
      <circle cx="14" cy="3" r="1" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg className="area-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="2.5" />
      <circle cx="10" cy="10" r="6" />
      <path d="M3.5 13.2C5.6 17 10.2 18.5 14 16.4" />
      <circle cx="3.5" cy="13.2" r="0.9" />
    </svg>
  );
}

function IntersectionIcon() {
  return (
    <svg className="area-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="7.3" cy="10" r="5.2" />
      <circle cx="12.7" cy="10" r="5.2" />
    </svg>
  );
}
