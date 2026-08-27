import { Suspense } from "react";
import LoadingDots from "@/components/LoadingDots/LoadingDots";
import DonationSuccessClient from "./DonationSuccessClient";

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}><LoadingDots tone="green" size="lg" label="Loading receipt" /></div>}>
      <DonationSuccessClient />
    </Suspense>
  );
}
