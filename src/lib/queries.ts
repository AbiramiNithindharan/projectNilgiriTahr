// /lib/queries.ts
export const recentNewsQuery = `
{
  "recent": *[_type == "post" && publishedAt >= $cutoffDate]
  | order(publishedAt desc) {
    title,
    excerpt,
    "category": category->title,
    publishedAt
  },
  "fallback": *[_type == "post"]
  | order(publishedAt desc)[0...3] {
    title,
    excerpt,
    "category": category->title,
    publishedAt
  }
}
`;
