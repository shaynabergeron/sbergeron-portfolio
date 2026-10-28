import { ArrowDownToLine, FileText, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/portfolio";
import { sectionNumber, sectionLink, sections } from "@/config/site";

export function ResumeSection() {
  return (
    <section className="resume-band" id="resume" aria-labelledby="resume-title">
      <div className="container resume-layout">
        <div className="resume-icon" aria-hidden="true"><FileText size={31}/></div>
        <div className="resume-copy">
          <div className="eyebrow">{sectionNumber("resume")} / a quick overview</div>
          <h2 id="resume-title">The experience, in one place.</h2>
          <p>Prefer the classic format? Grab a PDF version of my résumé.</p>
        </div>
        <div className="resume-actions">
          <a href={profile.resume} className="btn btn-primary" download="Shayna_Bergeron_Resume.pdf">Download PDF <ArrowDownToLine size={16}/></a>
          {sections.contact.enabled && <a href={sectionLink("contact")} className="text-link">Get in touch <ArrowUpRight size={15}/></a>}
        </div>
      </div>
    </section>
  );
}
