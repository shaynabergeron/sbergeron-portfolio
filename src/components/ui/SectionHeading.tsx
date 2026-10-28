import type { ReactNode } from "react";

export function SectionHeading({ index, eyebrow, title, description }: { index: string; eyebrow: string; title: ReactNode; description: string }) {
  return (
    <div className="section-head">
      <div><div className="eyebrow">{index} / {eyebrow}</div><h2>{title}<span className="heading-period">.</span></h2></div>
      <p>{description}</p>
    </div>
  );
}
