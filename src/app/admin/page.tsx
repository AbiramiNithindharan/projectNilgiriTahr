import { Suspense } from "react";
import AdminClient from "./components/AdminClient";

export default function CMSPortal() {
  <Suspense fallback={<div>Loading...</div>}>
    <AdminClient />
  </Suspense>;
}
