import { ImageIcon, DownloadIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const posterType = defineType({
  name: "poster",
  title: "Poster",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Short caption or description for this poster",
    }),
    defineField({
      name: "downloadableFile",
      title: "Poster File (for download)",
      type: "file",
      description: "Upload the full-resolution poster file if available",
      options: {
        accept: ".jpg,.png,.pdf",
      },
    }),
    defineField({
      name: "category",
      title: "Poster Category",
      type: "reference",
      to: [{ type: "category" }],
      options: {
        filter: "categoryType == $type",
        filterParams: { type: "poster" },
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      subtitle: "caption",
    },
  },
});
