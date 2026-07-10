import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Insight / News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string" }),
      ],
    }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 3,
      description: "Used in listings and meta description.",
      validation: (r) => r.required().min(40).max(280),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: "readingMinutes",
      type: "number",
      description: "Estimated reading time in minutes (optional).",
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Alt text" }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
        {
          type: "object",
          name: "embed",
          title: "Video / Embed",
          fields: [
            defineField({
              name: "url",
              type: "url",
              title: "URL (YouTube, Vimeo, etc.)",
              validation: (r) => r.required(),
            }),
            defineField({ name: "caption", type: "string" }),
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Pull-quote / Callout",
          fields: [
            defineField({
              name: "text",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({ name: "attribution", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
      date: "publishedAt",
    },
    prepare({ title, author, media, date }) {
      return {
        title,
        subtitle:
          [author, date ? new Date(date).toDateString() : null]
            .filter(Boolean)
            .join(" · ") || undefined,
        media,
      };
    },
  },
});
