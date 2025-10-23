// /lib/queries.ts
export const recentNewsQuery = `
{
  "recent": *[_type == "post" && publishedAt >= $cutoffDate]
  | order(publishedAt desc) {
    title,
    excerpt,
      "slug": slug.current,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
    publishedAt
  },
  "fallback": *[_type == "post"]
  | order(publishedAt desc)[0...3] {
    title,
    excerpt,
    "slug": slug.current,
    "categoryTitle": category->title,
    "categorySlug": category->slug.current,
      publishedAt
  }
}
`;
