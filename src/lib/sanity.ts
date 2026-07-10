import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-01-01";

export const sanityEnabled = Boolean(projectId);

let cached: SanityClient | null = null;
function client(): SanityClient {
  if (!sanityEnabled) {
    throw new Error("Sanity not configured (NEXT_PUBLIC_SANITY_PROJECT_ID missing)");
  }
  if (cached) return cached;
  cached = createClient({
    projectId: projectId!,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return cached;
}

export function urlFor(source: unknown) {
  if (!sanityEnabled) return null;
  const c = client();
  return imageUrlBuilder(c).image(source as never);
}

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes?: number;
  category?: { title: string; slug: string };
  author?: { name: string };
  featuredImage?: { asset: unknown; alt?: string };
};

export type PostDetail = PostListItem & {
  body?: unknown;
};

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingMinutes,
  "category": categories[0]->{ title, "slug": slug.current },
  "author": author->{ name },
  featuredImage{ asset, alt }
`;

export async function listPosts(): Promise<PostListItem[]> {
  if (!sanityEnabled) return [];
  return client().fetch<PostListItem[]>(
    `*[_type=="post" && defined(slug.current) && publishedAt < now()]
      | order(publishedAt desc) {
        ${POST_FIELDS}
      }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  if (!sanityEnabled) return null;
  return client().fetch<PostDetail | null>(
    `*[_type=="post" && slug.current==$slug][0]{
       ${POST_FIELDS},
       body
     }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function listSlugs(): Promise<string[]> {
  if (!sanityEnabled) return [];
  return client().fetch<string[]>(
    `*[_type=="post" && defined(slug.current)].slug.current`
  );
}
