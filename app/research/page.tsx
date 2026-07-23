import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Research",
  description: "Research interests, publications, and preprints by Zheng Zhu.",
  alternates: {
    canonical: "https://hodgebundle.github.io/Personal-Website/research/",
  },
};

const works = [
  {
    type: "Preprint",
    title: "Iterated Monodromy Group with Non-Martingale Fixed-Point Process",
    href: "https://drive.google.com/file/d/15RLga5X4fxuAUA1Un94YBXQkZVM0OKa0/view?usp=sharing",
    authors: "with Jianfei He",
    status: "Submitted, 2024",
  },
  {
    type: "Publication",
    title: "Transitive and non-transitive subgroups of permutation groups",
    href: "https://arxiv.org/abs/2311.11497",
    authors: "with Arda Demirhan, Jacob Miller, Yixu Qiu, and Thomas J. Tucker",
    status: "Accepted by Involve, 2023",
  },
  {
    type: "In preparation",
    title: "Local Arboreal Representations for Unicritical Polynomials of Arbitrary Degree",
    authors: "with Dang-Khoa Nguyen",
    status: "In preparation",
  },
  {
    type: "In preparation",
    title: "On Equidistribution of Subvarieties with Respect to Mixed Line Bundles",
    authors: "with Peter J. Oberly and Thomas J. Tucker",
    status: "In preparation",
  },
  {
    type: "In preparation",
    title: "Geometric Monodromy and Finite Index for Non-Martingale Quartic Rational Maps",
    status: "In preparation",
  },
  {
    type: "In preparation",
    title: "A Defect-to-Entanglement Dictionary for Twisted Carlitz Arboreal Towers",
    status: "In preparation",
  },
];

export default function ResearchPage() {
  return (
    <main className="site-shell interior-page research-page">
      <SiteHeader active="research" />
      <section className="page-hero research-hero">
        <div>
          <p className="page-eyebrow">Research</p>
          <h1>Arithmetic under iteration.</h1>
          <p className="page-lede">
            My research interests lie in arithmetic dynamics, Arakelov
            geometry, and Diophantine geometry.
          </p>
        </div>
      </section>

      <section className="works-section" aria-labelledby="works-heading">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 id="works-heading">Publications and preprints</h2>
          </div>
          <p>Research papers and current projects.</p>
        </div>

        <ol className="works-list">
          {works.map((work, index) => (
            <li key={work.title}>
              <span className="work-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="work-main">
                <p className="work-type">{work.type}</p>
                {work.href ? (
                  <h3><a href={work.href} target="_blank" rel="noreferrer">{work.title}</a></h3>
                ) : (
                  <h3>{work.title}</h3>
                )}
                {work.authors && <p className="work-authors">{work.authors}</p>}
              </div>
              <p className="work-status">{work.status}</p>
            </li>
          ))}
        </ol>
      </section>
      <SiteFooter />
    </main>
  );
}
