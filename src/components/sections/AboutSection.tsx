import { sectionNumber, sections, sectionLink } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import { principles } from "@/content/portfolio";

export function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="container about-grid">
        <div className="about-copy">
          <div className="eyebrow">{sectionNumber("about")} / the person behind the pixels</div>
          <h2 id="about-heading">Developer brain.<br/><span className="accent-purple">Designer instincts.</span></h2>
          <p>I’m a full-stack developer who enjoys connecting solid backend architecture with thoughtful frontend UX. I’ve worked on enterprise and government applications, building end-to-end features across APIs, data, and interface details that make products reliable and usable.</p>
          <p>My favorite kind of challenge? Taking a complex system and turning it into something <strong>simple, accessible, and genuinely useful.</strong></p>
          {sections.experience.enabled && <a className="btn btn-secondary about-link" href={sectionLink("experience")}>More about my journey <ArrowUpRight size={15}/></a>}
        </div>
        <div className="about-side">
          {principles.map((p, i) => <div key={p.title} className={`value-card ${i === 2 ? "wide" : ""}`}>
            {i === 2 && <div aria-hidden="true" className="big-squiggle">✳</div>}
            <span className={`value-icon value-icon-${i}`} aria-hidden="true">{p.symbol}</span>
            <h3>{p.title}</h3><p>{p.description}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
}
