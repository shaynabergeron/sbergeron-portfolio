import { describe, expect, it } from "vitest";
import { getNavigation, getVisibleSections, sectionLink, sectionNumber, resolveVisibleSections, resolveNavigation, sections } from "../src/config/site";

describe("portfolio section configuration", () => {
  it("produces an ordered list of visible section IDs", () => {
    expect(getVisibleSections()).toEqual(["home", "ticker", "about", "skills", "experience", "resume", "playground", "contact"]);
  });
  it("uses only visible sections in navigation", () => {
    expect(getNavigation().some((n) => n.id === "home")).toBe(false);
    expect(getNavigation().some((n) => n.href === "#contact")).toBe(true);
  });
  it("hides disabled sections from the page and navigation", () => {
    expect(getVisibleSections()).not.toContain("work");
    expect(getNavigation().some((link) => link.id === "work")).toBe(false);
    const updated = { ...sections, playground: { ...sections.playground, enabled: false } };
    expect(resolveVisibleSections(updated)).not.toContain("playground");
    expect(resolveNavigation(updated).some((link) => link.id === "playground")).toBe(false);
  });
  it("reorders visible sections by numeric order", () => {
    const updated = { ...sections, experience: { ...sections.experience, order: 1 } };
    expect(resolveVisibleSections(updated)[1]).toBe("experience");
  });
  it("produces valid anchor links", () => {
    expect(sectionLink("work")).toBe("#home");
    expect(sectionNumber("skills")).toBe("02");
  });
});
