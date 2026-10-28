"use client";

import { useState } from "react";
import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";
import { sectionNumber } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

const moods = ["tiny details", "big ideas", "good coffee", "clean code", "architecture"];

export function PlaygroundSection() {
  const [current, setCurrent] = useState(0);
  function shuffle() { setCurrent((i) => (i + 1) % moods.length); }
  return (
    <section id="playground" className="section playground" aria-label="Playground">
      <div className="container">
        <SectionHeading index={sectionNumber("playground")} eyebrow="a little personality" title="Work can be playful, too" description="A small interactive corner of the portfolio. Good details make great experiences." />
        <div className="playground-grid">
          <div className="play-card play-card-main">
            <span className="mono play-label"><Sparkles size={16}/> Currently inspired by</span>
            <div className="play-big" aria-live="polite">{moods[current]}<span>✳</span></div>
            <button type="button" className="btn btn-primary" onClick={shuffle}>Give me another <ArrowUpRight size={16}/></button>
            <span className="play-counter mono">0{current + 1} / 0{moods.length}</span>
          </div>
          <div className="play-card play-card-small"><MousePointer2 size={26} aria-hidden="true"/><div><span className="mono play-label">My approach</span><h3>Make it useful.<br/>Make it thoughtful.<br/><em>Make it memorable.</em></h3></div><span className="play-asterisk" aria-hidden="true">✳</span></div>
        </div>
      </div>
    </section>
  );
}
