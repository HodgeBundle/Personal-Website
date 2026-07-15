import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-shell";

export const metadata: Metadata = {
  title: "Teaching",
  description: "Courses taught by Zheng Zhu at the University of Calgary and University of Rochester.",
};

const courses = [
  {
    term: "Winter 2026",
    institution: "University of Calgary",
    code: "MATH 277",
    title: "Multivariable Calculus for Engineers and Scientists",
    href: "https://drive.google.com/drive/folders/1Ussr-NMxPdH_K4VrFBOYXqEvD7JGaN9_?usp=sharing",
    details: ["Lectures: Wednesday 11:00–12:50", "Thursday 8:00–9:50", "Office hours: by appointment"],
  },
  {
    term: "Fall 2024 / Spring 2025",
    institution: "University of Rochester",
    code: "MATH 165",
    title: "Linear Algebra with Differential Equations",
    href: "https://courses.math.rochester.edu/current/165/",
  },
  {
    term: "Spring 2024",
    institution: "University of Rochester",
    code: "MATH 162",
    title: "Calculus II",
    href: "https://courses.math.rochester.edu/current/162/",
  },
  {
    term: "Fall 2023",
    institution: "University of Rochester",
    code: "MATH 164",
    title: "Multivariable Calculus",
    href: "https://courses.math.rochester.edu/current/164/",
  },
  {
    term: "Summer 2022, 2023, 2024",
    institution: "University of Rochester",
    code: "MATH 161",
    title: "Calculus I",
  },
];

export default function TeachingPage() {
  return (
    <main className="site-shell interior-page">
      <SiteHeader active="teaching" />
      <section className="page-hero teaching-hero">
        <div>
          <p className="page-eyebrow">Teaching</p>
          <h1>Courses and instruction.</h1>
          <p className="page-lede">
            Current and previous courses at the University of Calgary and the
            University of Rochester.
          </p>
        </div>
      </section>

      <section className="courses-section" aria-labelledby="courses-heading">
        <div className="section-heading-row">
          <div>
            <p className="section-kicker">Course history</p>
            <h2 id="courses-heading">Teaching</h2>
          </div>
        </div>
        <div className="course-list">
          {courses.map((course) => (
            <article className="course-card" key={`${course.term}-${course.code}`}>
              <div className="course-term">
                <p>{course.term}</p>
                <span>{course.institution}</span>
              </div>
              <div className="course-main">
                <p className="course-code">{course.code}</p>
                {course.href ? (
                  <h3><a href={course.href} target="_blank" rel="noreferrer">{course.title}</a></h3>
                ) : (
                  <h3>{course.title}</h3>
                )}
                {course.details && (
                  <ul>
                    {course.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
