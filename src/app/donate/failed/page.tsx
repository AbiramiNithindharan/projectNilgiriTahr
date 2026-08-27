import { Suspense } from "react";
import LoadingDots from "@/components/LoadingDots/LoadingDots";
import DonationFailedClient from "./DonationFailedClient";

export default function DonationFailedPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}><LoadingDots tone="green" size="lg" label="Loading" /></div>}>
      <DonationFailedClient />
    </Suspense>
  );
}
