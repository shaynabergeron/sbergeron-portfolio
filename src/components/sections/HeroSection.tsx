"use client";

import { useState } from "react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/portfolio";
import { sectionLink, sections } from "@/config/site";

const snippets = {
  frontend: [
    <><span className="kw">const</span> <span className="prop">experience</span> = {"{"}</>,
    <>  <span className="prop">framework</span>: <span className="str">"React + TypeScript"</span>,</>,
    <>  <span className="prop">design</span>: <span className="str">"intentional"</span>,</>,
    <>  <span className="prop">usersFirst</span>: <span className="num">true</span></>,
    <>{"};"}</>,
    <></>,
    <><span className="com">// pixels with purpose ✳</span></>,
  ],
  backend: [
    <><span className="kw">public async Task</span>{"<Result> "}<span className="prop">Build</span>()</>,
    <>{"{"}</>,
    <>  <span className="kw">var</span> api = <span className="str">"ASP.NET Core"</span>;</>,
    <>  <span className="kw">var</span> data = <span className="str">"SQL"</span>;</>,
    <>  <span className="kw">return await</span> <span className="prop">ShipWell</span>();</>,
    <>{"}"}</>,
    <><span className="com">// dependable by design</span></>,
  ],
  quality: [
    <><span className="kw">test</span>(<span className="str">"works for everyone"</span>, () =&gt; {"{"}</>,
    <>  <span className="prop">check</span>(<span className="str">"WCAG + Section 508"</span>);</>,
    <>  <span className="prop">run</span>(<span className="str">"Playwright + axe"</span>);</>,
    <>  <span className="prop">expect</span>(<span className="str">"usable"</span>).<span className="prop">toBe</span>(<span className="num">true</span>);</>,
    <>{"});"}</>,
    <></>,
    <><span className="com">// quality is a feature</span></>,
  ],
};

type Snippet = keyof typeof snippets;

export function HeroSection() {
  const [active, setActive] = useState<Snippet>("frontend");
  return (
    <section className="container hero" id="home" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="availability"><i className="dot" aria-hidden="true" />{profile.availability}</div>
        <h1 id="hero-title">Making the web feel a little more <span className="italic">human<span aria-hidden="true" className="spark">✳</span></span></h1>
        <p className="description">{profile.intro}</p>
        <div className="hero-tags"><span>React + TypeScript</span><span>C# / .NET</span><span>Accessible by design</span></div>
        <div className="hero-actions">
          {sections.work.enabled && <a className="btn btn-primary" href={sectionLink("work")}>Explore my work <ArrowUpRight size={16} /></a>}
          <a className="btn btn-secondary" href={profile.resume} download="Shayna_Bergeron_Resume.pdf">Download résumé <ArrowDownToLine size={16} /></a>
        </div>
      </div>
      <div className="hero-art" aria-label="Interactive illustration of development code">
        <div className="halo" aria-hidden="true" />
        <div className="code-window">
          <div className="code-top"><span aria-hidden="true" className="lights"><i /><i /><i /></span><span className="code-path mono">portfolio / hello-world.tsx</span><span aria-hidden="true">⌘</span></div>
          <div className="code-body">
            <div className="code-switch" aria-label="Code snippet type" role="group">
              {(Object.keys(snippets) as Snippet[]).map((key) => <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)}>{key}</button>)}
            </div>
            <div className="code-lines mono" aria-live="polite" aria-atomic="true">
              {snippets[active].map((line, i) => <div key={`${active}-${i}`} className="code-line">{line}{"\u00a0"}</div>)}
            </div>
          </div>
          <div className="code-bottom mono"><span><b>●</b></span><span>UTF-8 · TSX</span></div>
        </div>
        <div className="orbit-tag a"><span className="box-icon">↗</span> Full stack, full heart.</div>
        <div className="orbit-tag b"><span className="box-icon">✳</span> Architecture matters</div>
      </div>
    </section>
  );
}
