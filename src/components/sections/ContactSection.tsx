import { sectionNumber } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/portfolio";
import { ContactForm } from "@/components/sections/ContactForm";

export function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-cta">
            <div className="eyebrow">{sectionNumber("contact")} / say hello</div>
            <h2 id="contact-heading">Got a good problem to <i>solve?</i></h2>
            <p>Whether it’s an interesting role, a collaboration, or a quick hello, I’d love to hear what you’re working on.</p>
            <a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
