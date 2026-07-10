import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { CTA } from "@/components/button";
import { ArticleBody } from "@/components/portable-text";
import { getPost, listSlugs, sanityEnabled, urlFor } from "@/lib/sanity";

export const revalidate = 60;

export async function generateStaticParams() {
  if (!sanityEnabled) return [];
  const slugs = await listSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!sanityEnabled) return { title: "Insight" };
  const post = await getPost(slug);
  if (!post) return { title: "Insight" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!sanityEnabled) notFound();
  const post = await getPost(slug);
  if (!post) notFound();

  const heroImg = post.featuredImage?.asset
    ? urlFor(post.featuredImage.asset)?.width(2000).fit("max").url()
    : null;

  return (
    <>
      <section className="bg-ink text-ivory">
        <Container width="default" className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="flex gap-3 text-xs uppercase tracking-[0.15em] text-ivory/60">
            {post.category && (
              <span className="text-bronze">{post.category.title}</span>
            )}
            <span>·</span>
            <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
            {post.readingMinutes ? (
              <>
                <span>·</span>
                <span>{post.readingMinutes} min read</span>
              </>
            ) : null}
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05] tracking-tight">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-ivory/75 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
          {post.author?.name && (
            <div className="mt-8 text-sm text-ivory/65">
              By <span className="text-ivory">{post.author.name}</span>
            </div>
          )}
        </Container>
      </section>

      {heroImg && (
        <div className="bg-ivory">
          <Container width="default" className="-mt-16 md:-mt-20 relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImg}
              alt={post.featuredImage?.alt ?? post.title}
              className="w-full border border-line"
            />
          </Container>
        </div>
      )}

      <Section tone="ivory">
        <Container width="narrow">
          <ArticleBody value={post.body} />
        </Container>
      </Section>

      <Section tone="ink-2">
        <Container width="default" className="text-center">
          <Eyebrow tone="bronze">Discuss this with us</Eyebrow>
          <h2 className="mt-6 font-display text-3xl md:text-4xl text-ivory max-w-2xl mx-auto leading-tight">
            Speak with a founder about how this
            <span className="italic text-bronze"> applies to your family or fund.</span>
          </h2>
          <div className="mt-10 flex justify-center">
            <CTA href="/contact" variant="secondary" size="lg">
              Book a 30-minute call
            </CTA>
          </div>
        </Container>
      </Section>
    </>
  );
}
