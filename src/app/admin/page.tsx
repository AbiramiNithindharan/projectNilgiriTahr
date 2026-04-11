import { Suspense } from "react";
import AdminClient from "./AdminClient";

export default function CMSPortal() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminClient />;
    </Suspense>
  );
}
