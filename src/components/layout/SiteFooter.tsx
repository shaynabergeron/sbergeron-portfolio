import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {profile.firstName} {profile.lastName}. Made with curiosity, care & a little coffee ✳</span>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={12} /></a>
          {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={12} /></a>}
          {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} /></a>}
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
