import { DocumentTextIcon, ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Main Image (Featured)",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryItem",
          title: "Gallery Item",
          icon: ImageIcon,
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  type: "string",
                  title: "Alternative text",
                }),
              ],
            }),
            defineField({
              name: "caption",
              title: "Caption / Description",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Related Paragraph / Content",
              type: "blockContent", // rich text support for this image
            }),
          ],
          preview: {
            select: {
              title: "caption",
              media: "image",
            },
            prepare(selection) {
              const { title } = selection;
              return {
                title: title || "Gallery Item",
                media: selection.media,
              };
            },
          },
        },
      ],
      options: {
        layout: "grid",
      },
      description:
        "Add one or more images with optional captions or paragraphs.",
    }),
    defineField({
      name: "category",
      title: "Post Category",
      type: "reference",
      to: [{ type: "category" }],
      options: {
        filter: "categoryType == $type",
        filterParams: { type: "post" },
      },
    }),

    defineField({
      name: "publishedAt",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
    defineField({
      name: "pdfAttachment",
      title: "Attach PDF (optional)",
      type: "file",
      options: {
        accept: ".pdf",
      },
      description: "Attach a downloadable PDF (if available)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      category: "category.title",
      media: "mainImage",
    },
    prepare(selection) {
      const { author, category } = selection;
      return {
        ...selection,
        subtitle: `${author ? `by ${author}` : ""}${category ? ` | ${category}` : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Title, Asc",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
