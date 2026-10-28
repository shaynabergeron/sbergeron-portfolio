"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experience } from "@/content/portfolio";
import { sectionNumber } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<string[]>(experience.length ? [experience[0].id] : []);
  const toggle = (id: string) => setExpanded((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  return (
    <section className="section experience" id="experience" aria-label="Experience">
      <div className="container">
        <SectionHeading index={sectionNumber("experience")} eyebrow="where I've grown" title="The journey so far" description="A mix of software engineering, accessibility, and solving interesting problems. Expand a stop on the timeline." />
        <div className="timeline">
          {experience.map((job, i) => {
            const open = expanded.includes(job.id);
            return <div className="timeline-item" key={job.id}>
              <div className="timeline-dot" aria-hidden="true">{i === 0 ? "✳" : String(i+1).padStart(2,"0")}</div>
              <article className={`timeline-card ${open ? "open" : ""}`}>
                <div className="timeline-top"><div><h3>{job.company}</h3><p>{job.position}</p></div><span className="timeline-date">{job.dates}</span></div>
                <button type="button" className="timeline-expand" aria-expanded={open} aria-controls={`experience-${job.id}`} onClick={() => toggle(job.id)}>{open ? "Hide details" : "What I worked on"} <ChevronDown size={14} className="chevron" /></button>
                <div id={`experience-${job.id}`} className="timeline-detail" hidden={!open}>
                  <strong>{job.highlight}</strong><ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  <div className="stack-row">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </article>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
