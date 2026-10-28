"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { skillCategories } from "@/content/portfolio";
import { sectionNumber } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const category = skillCategories[active];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = skillCategories.length - 1;
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % skillCategories.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key)) next = (index + last) % skillCategories.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault(); setActive(next); tabs.current[next]?.focus();
  }

  return (
    <section className="section skills" id="skills" aria-label="Skills">
      <div className="container">
        <SectionHeading index={sectionNumber("skills")} eyebrow="my toolkit" title="The things I build with" description="A little frontend, a little backend, and a lot of attention to how everything works together. Pick a category."/>
        <div className="skills-layout">
          <div className="skill-tabs" role="tablist" aria-label="Skills categories">
            {skillCategories.map((c, i) => <button key={c.id} id={`tab-${c.id}`} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" aria-selected={active === i} tabIndex={active === i ? 0 : -1} aria-controls="skill-panel" onClick={() => setActive(i)} onKeyDown={(e) => onTabKeyDown(e, i)}>
              <span><ArrowUpRight size={14} aria-hidden="true" /> {c.label}</span><span>{String(i+1).padStart(2,"0")}</span>
            </button>)}
          </div>
          <div className="skill-panel" id="skill-panel" role="tabpanel" tabIndex={0} aria-labelledby={`tab-${category.id}`}>
            <div className="skill-panel-top"><span className="mono">category / {String(active+1).padStart(2,"0")}</span><span aria-hidden="true">✳</span></div>
            <h3>{category.title}</h3><p>{category.description}</p>
            <div className="skill-tags">{category.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <div className="skill-note mono">// {category.note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
