type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={alignClass}>
      <span className="section-label">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
    </div>
  );
}
