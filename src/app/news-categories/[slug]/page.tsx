import { groq } from "next-sanity";
import client from "@/lib/sanityClient";
import CategoryClient from "./categoryClient";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await client.fetch(
    groq`*[_type == "category" && slug.current == $slug][0]{_id, title, bannerImage}`,
    { slug }
  );

  if (!category) return <p>Category not found</p>;

  const allNews = await client.fetch(
    groq`*[_type == "post" && category._ref == $categoryId] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
    { categoryId: category._id }
  );

  const news = filterRecentOrFallback(allNews);

  return <CategoryClient category={category} news={news} slug={slug} />;
}

function filterRecentOrFallback(allNews: any[]) {
  const now = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(now.getDate() - 30);
  const recent = allNews.filter(
    (n) => new Date(n.publishedAt) >= thirtyDaysAgo
  );
  return recent.length ? recent : allNews.slice(0, 3);
}
