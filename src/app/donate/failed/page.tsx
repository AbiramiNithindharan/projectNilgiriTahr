import { Suspense } from "react";
import DonationFailedClient from "./DonationFailedClient";

export default function DonationFailedPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
      <DonationFailedClient />
    </Suspense>
  );
}
