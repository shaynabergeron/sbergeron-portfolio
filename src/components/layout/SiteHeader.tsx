"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { getNavigation, sections, sectionLink } from "@/config/site";
import { profile } from "@/content/portfolio";

const nav = getNavigation();

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerTheme() {
  return "dark" as const;
}

export function SiteHeader() {
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("shayna-theme", next); } catch { /* storage may be disabled */ }
  }

  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="Shayna Bergeron, back to top">
          <span className="brand-mark">S</span><span>shayna<span className="brand-dot">.</span><small>/ developer</small></span>
        </a>
        <nav className="nav" aria-label="Main navigation">
          {nav.map(({ href, id, label }) => <a key={id} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleTheme} type="button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={sections.contact.enabled ? sectionLink("contact") : `mailto:${profile.email}`} className="nav-cta">Let’s talk <ArrowUpRight size={14} aria-hidden="true" /></a>
          <button className="icon-btn mobile-menu-button" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation" inert={!menuOpen}>
        {nav.map(({ href, id, label }) => <a key={id} onClick={() => setMenuOpen(false)} href={href}>{label}<ArrowUpRight size={16} /></a>)}
      </nav>
    </header>
  );
}
