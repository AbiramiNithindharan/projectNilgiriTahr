import { Suspense } from "react";
import DonationSuccessClient from "./DonationSuccessClient";

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40 }}>Loading...</div>}>
      <DonationSuccessClient />
    </Suspense>
  );
}
