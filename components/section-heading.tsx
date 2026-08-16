export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  titleAs = "h2"
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2";
}) {
  const TitleTag = titleAs;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-brand-blue">{eyebrow}</p>
      <TitleTag className="mt-4 text-3xl font-semibold tracking-tight text-ink md:text-5xl">{title}</TitleTag>
      {body ? <p className="mt-5 text-base leading-8 text-steel md:text-lg">{body}</p> : null}
    </div>
  );
}
