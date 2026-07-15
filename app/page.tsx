/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { publicAsset } from "./site-paths";

export default function Home() {
  return (
    <main className="site-shell home-page">
      <SiteHeader active="home" />

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-art"
          src={publicAsset("/images/hero-warm-ivory-safari.jpg")}
          alt=""
          width={1023}
          height={1279}
          loading="eager"
          decoding="sync"
          aria-hidden="true"
        />
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
    <svg className="area-icon" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="17" />
      <path d="M20 32V16m0 10-7-7m7 2 7-8m-14 6v-6m14 0V8m-7 8-4-5m4 5 4-5" />
      <circle className="icon-node" cx="13" cy="13" r="1.4" />
      <circle className="icon-node" cx="16" cy="11" r="1.4" />
      <circle className="icon-node" cx="24" cy="11" r="1.4" />
      <circle className="icon-node" cx="27" cy="8" r="1.4" />
    </svg>
  );
}

function OrbitIcon() {
  return (
    <svg className="area-icon" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="18" r="14" />
      <path d="M9 21c1.5 8 6.2 14 11 14s9.5-6 11-14M12 23c1.3 5.5 4.5 9.5 8 9.5s6.7-4 8-9.5M15 25c1 3 2.8 5 5 5s4-2 5-5" />
    </svg>
  );
}

function IntersectionIcon() {
  return (
    <svg className="area-icon" viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <clipPath id="intersection-clip">
          <circle cx="24" cy="20" r="12" />
        </clipPath>
      </defs>
      <circle cx="16" cy="20" r="12" />
      <circle cx="24" cy="20" r="12" />
      <g clipPath="url(#intersection-clip)" className="intersection-hatch">
        <path d="M6 31 27 10M10 35l21-21M14 39l21-21" />
      </g>
    </svg>
  );
}
