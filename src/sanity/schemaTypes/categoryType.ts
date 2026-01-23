import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Article Publication", value: "publication" },
          { title: "News", value: "news" },
          { title: "Report", value: "report" },
          { title: "Poster", value: "poster" },
          { title: "Press Release", value: "pressrelease" },
          { title: "Magazine", value: "magazine" },
          { title: "Newsletter", value: "newsletter" },
          { title: "Blog", value: "blog" },
        ],
        layout: "dropdown",
      },
    }),
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
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryType",
      title: "Category Type",
      type: "string",
      options: {
        list: [
          { title: "Post", value: "post" },
          { title: "Poster", value: "poster" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Description",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
  orderings: [
    {
      title: "Title, Asc",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Title, Desc",
      name: "titleDesc",
      by: [{ field: "title", direction: "desc" }],
    },
  ],
});
