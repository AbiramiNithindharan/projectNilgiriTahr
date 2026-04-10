import EditProduct from "@/components/EditProduct/EditProduct";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditProduct productId={id} />;
}
