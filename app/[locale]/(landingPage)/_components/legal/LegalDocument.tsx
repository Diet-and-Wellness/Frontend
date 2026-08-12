type LegalSection = {
  title: string;
  body: string | string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string[];
  sections: LegalSection[];
  lastUpdated?: string;
};

const LegalDocument = ({
  eyebrow,
  title,
  intro,
  sections,
  lastUpdated,
}: LegalDocumentProps) => {
  return (
    <main className="min-h-screen bg-surface pb-20 pt-28 text-content md:pb-28 md:pt-36">
      <div className="mx-auto w-[90%] max-w-5xl">
        <header className="relative overflow-hidden rounded-3xl border border-line bg-brand-softer px-6 py-10 shadow-[0_18px_50px_rgba(46,85,30,0.08)] sm:px-10 md:py-14">
          <div
            aria-hidden="true"
            className="absolute -end-16 -top-20 size-56 rounded-full bg-accent-soft opacity-80 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -start-12 size-52 rounded-full bg-brand-soft blur-2xl"
          />

          <div className="relative max-w-3xl">
            <p className="type-label font-semibold uppercase tracking-[0.16em] text-brand">
              {eyebrow}
            </p>
            <h1 className="type-display mt-3 font-extrabold text-content-strong">
              {title}
            </h1>
            {lastUpdated && (
              <p className="type-meta mt-3 font-medium text-content-subtle">
                {lastUpdated}
              </p>
            )}
            <div className="mt-5 space-y-3">
              {intro.map((paragraph) => (
                <p
                  key={paragraph}
                  className="type-body leading-8 text-content-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </header>

        <ol className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2">
          {sections.map((section, index) => {
            const paragraphs = Array.isArray(section.body)
              ? section.body
              : [section.body];

            return (
              <li
                key={section.title}
                className="group rounded-2xl border border-line bg-surface-raised p-5 shadow-[0_8px_28px_rgba(31,41,55,0.05)] transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_34px_rgba(46,85,30,0.09)] sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-brand-contrast"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-bold leading-7 text-content-strong">
                      {section.title}
                    </h2>
                    <div className="mt-2 space-y-3">
                      {paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="leading-7 text-content-muted"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
};

export type { LegalSection };
export default LegalDocument;
