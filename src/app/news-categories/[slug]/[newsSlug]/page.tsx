import { groq } from "next-sanity";
import { client } from "@/lib/sanityClient";
import NewsClient from "./NewsClient";

export const revalidate = 60;

interface NewsPageProps {
  params: Promise<{ slug: string; newsSlug: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug, newsSlug } = await params;

  // Fetch the post by its slug
  const news = await client.fetch(
    groq`*[_type == "post" && slug.current == $newsSlug && category->slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      body,
      publishedAt,
      mainImage{
        asset->{
          _id,
          url
        },
        alt
      },
      category->{
        title,
        "slug": slug.current
      }
    }`,
    { slug, newsSlug }
  );

  if (!news) {
    return <p>News not found</p>;
  }

  return <NewsClient news={news} slug={slug} />;
}
