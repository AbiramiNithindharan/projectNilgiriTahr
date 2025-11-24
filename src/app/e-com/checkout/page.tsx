import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Page() {
  return <CheckoutClient />;
}
