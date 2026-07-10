import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { PageHero } from "@/components/page-hero";
import { listPosts, sanityEnabled, urlFor } from "@/lib/sanity";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives from the CAWT practice — estate planning, succession advisory, GIFT City IFSC and cross-border family wealth.",
};

export const revalidate = 60;

export default async function InsightsPage() {
  const posts = sanityEnabled ? await listPosts() : [];

  return (
    <>
      <PageHero
        photoKey="insightsHero"
        eyebrow="Insights"
        title={
          <>
            Perspectives from
            <br />
            <span className="text-bronze italic">our practice.</span>
          </>
        }
        description="Briefings, market notes and case studies on estate planning, succession advisory, GIFT City IFSC and cross-border family wealth."
      />

      <Section tone="ivory">
        <Container width="wide">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {posts.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

function EmptyState() {
  return (
    <div className="border border-line bg-ivory-2 p-12 md:p-16 text-center">
      <Eyebrow tone="bronze" className="justify-center">
        Coming soon
      </Eyebrow>
      <h2 className="mt-6 font-display text-3xl md:text-4xl text-ink leading-tight max-w-2xl mx-auto">
        Our editorial programme launches
        <span className="italic text-bronze"> in the coming weeks.</span>
      </h2>
      <p className="mt-6 text-muted leading-relaxed max-w-xl mx-auto">
        Articles will cover Indian estate planning, succession trends, GIFT
        City regulatory developments, TPFM mechanics, and case studies from
        the practice.
      </p>
    </div>
  );
}

function PostCard({ post }: { post: Awaited<ReturnType<typeof listPosts>>[number] }) {
  const img = post.featuredImage?.asset
    ? urlFor(post.featuredImage.asset)?.width(960).height(720).fit("crop").url()
    : null;
  return (
    <Link href={`/insights/${post.slug}`} className="group">
      <div className="aspect-[4/3] bg-ink-2 mb-6 relative overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={post.featuredImage?.alt ?? post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #1A2855 0%, #0F1B3D 100%)",
            }}
          />
        )}
      </div>
      <div className="flex gap-3 text-xs uppercase tracking-[0.15em] text-muted">
        {post.category && <span className="text-bronze">{post.category.title}</span>}
        <span>·</span>
        <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
        {post.readingMinutes ? (
          <>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
          </>
        ) : null}
      </div>
      <h2 className="mt-3 font-display text-2xl text-ink leading-snug group-hover:text-bronze transition-colors">
        {post.title}
      </h2>
      <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>
    </Link>
  );
}
