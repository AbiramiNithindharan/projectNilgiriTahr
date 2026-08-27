import { Suspense } from "react";
import LoadingDots from "@/components/LoadingDots/LoadingDots";
import PhotoGallery from "./PhotoGallery";

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: 40, display: "flex", justifyContent: "center" }}><LoadingDots tone="green" size="lg" label="Loading gallery" /></div>}>
      <PhotoGallery />
    </Suspense>
  );
}
