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
          { title: "Article", value: "📄" },
          { title: "In-The-News", value: "📺" },
          { title: "Newsletters", value: "📧" },
          { title: "Leaf", value: "🌿" },
          { title: "Magazines", value: "📖" },
          { title: "Mountain", value: "🏔️" },
          { title: "Report", value: "📊" },
          { title: "Globe", value: "🌍" },
          { title: "News", value: "📰" },
          { title: "Camera", value: "📸" },
          { title: "Megaphone", value: "📣" },
          { title: "Research", value: "🔬" },
          { title: "Sun", value: "☀️" },
          { title: "Water Drop", value: "💧" },
          { title: "Tree", value: "🌲" },
          { title: "Blog", value: "📑" },
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
