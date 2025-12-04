import { Suspense } from "react";
import PhotoGallery from "./PhotoGallery";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading gallery...</div>}>
      <PhotoGallery />
    </Suspense>
  );
}
