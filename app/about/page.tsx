/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { publicAsset } from "../site-paths";

export const metadata: Metadata = {
  title: "About",
  description: "About Zheng Zhu, PIMS Postdoctoral Fellow at the University of Calgary.",
  alternates: {
    canonical: "https://hodgebundle.github.io/Personal-Website/about/",
  },
};

export default function AboutPage() {
  return (
    <main className="site-shell interior-page">
      <SiteHeader active="about" />
      <section className="page-hero page-hero-about">
        <div>
          <p className="page-eyebrow">About</p>
          <h1>Zheng Zhu <span lang="zh-Hans">朱政</span></h1>
          <p className="page-lede">
            PIMS Postdoctoral Fellow at the University of Calgary.
          </p>
        </div>
      </section>

      <section className="about-layout" aria-label="Biography and contact information">
        <figure className="portrait-wrap">
          <img
            src={publicAsset("/images/zheng-zhu.jpg")}
            alt="Zheng Zhu standing outdoors beside a stone sculpture"
            width={562}
            height={737}
          />
          <figcaption>Zheng Zhu · Calgary, Alberta</figcaption>
        </figure>

        <div className="about-copy">
          <div className="prose-block">
            <p className="section-kicker">Biography</p>
            <p>
              Hello! I am currently a {" "}
              <a href="https://www.pims.math.ca/" target="_blank" rel="noreferrer">PIMS</a>
              {" "}Postdoc Associate at the {" "}
              <a href="https://science.ucalgary.ca/mathematics-statistics" target="_blank" rel="noreferrer">
                University of Calgary
              </a>
              , working with {" "}
              <a href="https://sites.google.com/view/khoanguyen-calgary" target="_blank" rel="noreferrer">
                Dang-Khoa Nguyen
              </a>
              .
            </p>
            <p>
              In the spring of 2025, I received my Ph.D. in mathematics under
              the supervision of {" "}
              <a href="https://www.sas.rochester.edu/mth/people/faculty/tucker-thomas/index.html" target="_blank" rel="noreferrer">
                Thomas J. Tucker
              </a>
              {" "}at the University of Rochester. In spring 2023, I was a
              program associate at MSRI, Berkeley, in the Diophantine Geometry
              program.
            </p>
          </div>

        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
