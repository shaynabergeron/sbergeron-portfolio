"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/content/portfolio";
import { sectionLink, sectionNumber, sections } from "@/config/site";
import { profile } from "@/content/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";

function ProjectArt({ art }: { art: Project["art"] }) {
  if (art === "document") return <div className="project-art doc" aria-hidden="true"><div className="mini-doc"><div className="line med"/><div className="line"/><div className="line short"/><div className="info">{Array.from({ length: 6 }, (_, i) => <i key={i} />)}</div><div className="line"/><div className="line med"/></div><span className="doc-label">{"<accessible/>"}</span></div>;
  if (art === "components") return <div className="project-art design" aria-hidden="true"><div className="ui-demo"><div className="search"><span>Search a component...</span><span>⌕</span></div><div className="result"><span>Autocomplete</span><span>Forms</span><span>Patterns</span></div></div></div>;
  return <div className="project-art wizard" aria-hidden="true"><div className="step-demo"><div className="steps"><i>✓</i><span className="rail"/><i>2</i><span className="rail"/><i>3</i></div><div className="field"/><div className="field short"/></div></div>;
}

export function WorkSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [selected]);

  function close() { dialog.current?.close(); }

  return (
    <section className="section projects" id="work" aria-label="Selected work">
      <div className="container">
        <SectionHeading index={sectionNumber("work")} eyebrow="selected work" title="Ideas → interfaces → impact" description="Real-world problem spaces and proof-of-concept explorations. Open a card for the story behind it." />
        <div className="project-grid">
          {projects.map((project) => <article className={`project-card ${project.featured ? "featured" : ""}`} key={project.id}>
            <ProjectArt art={project.art} />
            <div className="project-info"><span className="project-label">{project.eyebrow}</span><h3>{project.title}</h3><p>{project.summary}</p>
              <div className="stack-row">{project.tech.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <button className="project-link" type="button" onClick={() => setSelected(project)}>Explore the concept <ArrowUpRight size={14} /></button>
            </div>
          </article>)}
        </div>
      </div>
      <dialog className="project-dialog" ref={dialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === dialog.current) close(); }} aria-labelledby="project-dialog-title">
        {selected && <div className="modal">
          <button type="button" className="icon-btn modal-close" aria-label="Close project details" onClick={close}><X size={18}/></button>
          <div className="eyebrow">{selected.eyebrow}</div><h3 id="project-dialog-title">{selected.title}</h3>
          <p>{selected.description}</p><div className="stack-row">{selected.tech.map((t) => <span key={t}>{t}</span>)}</div>
          <div className="modal-actions"><a className="btn btn-primary" href={selected.link || (sections.contact.enabled ? sectionLink("contact") : `mailto:${profile.email}`)} target={selected.link ? "_blank" : undefined} rel={selected.link ? "noopener noreferrer" : undefined} onClick={() => { if (!selected.link) close(); }}>{selected.link ? "View the project" : "Let’s talk about it"} <ArrowUpRight size={16}/></a></div>
        </div>}
      </dialog>
    </section>
  );
}
