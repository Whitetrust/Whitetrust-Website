import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-display text-3xl md:text-4xl text-ink mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl text-ink mt-10 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-charcoal leading-relaxed mb-5 text-lg">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-bronze pl-6 font-display text-2xl text-ink italic leading-snug">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 list-disc pl-6 text-charcoal">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 space-y-2 list-decimal pl-6 text-charcoal">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bronze underline decoration-bronze/40 hover:decoration-bronze"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-bronze underline decoration-bronze/40 hover:decoration-bronze">
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = urlFor(value)?.width(1600).fit("max").url();
      if (!url) return null;
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={value.alt ?? ""}
            className="w-full border border-line"
          />
          {value.caption && (
            <figcaption className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    embed: ({ value }) => {
      const url = value?.url as string | undefined;
      if (!url) return null;
      const youtubeId = extractYoutubeId(url);
      if (youtubeId) {
        return (
          <figure className="my-10">
            <div className="relative aspect-video bg-ink-2">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                title={value.caption ?? "Video"}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            {value.caption && (
              <figcaption className="mt-3 text-xs uppercase tracking-[0.15em] text-muted">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      }
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block my-10 text-bronze underline">
          {value.caption ?? url}
        </a>
      );
    },
    callout: ({ value }) => (
      <aside className="my-10 border-l-2 border-bronze bg-ivory-2 p-6">
        <p className="font-display text-xl text-ink leading-snug">
          “{value.text}”
        </p>
        {value.attribution && (
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted">
            — {value.attribution}
          </p>
        )}
      </aside>
    ),
  },
};

function extractYoutubeId(url: string): string | null {
  const m =
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/[?&]v=([\w-]{11})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{11})/);
  return m ? m[1] : null;
}

export function ArticleBody({ value }: { value: unknown }) {
  if (!value) return null;
  return (
    <div className="article-prose">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
