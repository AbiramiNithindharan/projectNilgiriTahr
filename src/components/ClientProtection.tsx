"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Routes where the photographs are the asset worth protecting. On these,
// text selection and copy are blocked too.
const GALLERY_ROUTES = ["/photo-gallery", "/news-categories"];

export default function ClientProtection() {
  const pathname = usePathname();

  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();

    // Block right-click and drag on IMAGES ONLY, site-wide. Text stays
    // selectable so the site remains usable with a screen reader.
    const preventOnImage = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventOnImage);
    document.addEventListener("dragstart", preventOnImage);

    // Gallery routes additionally block selection and copy.
    const isGalleryRoute = GALLERY_ROUTES.some((route) =>
      pathname?.startsWith(route),
    );

    if (isGalleryRoute) {
      document.addEventListener("selectstart", prevent);
      document.addEventListener("copy", prevent);
    }

    return () => {
      document.removeEventListener("contextmenu", preventOnImage);
      document.removeEventListener("dragstart", preventOnImage);
      document.removeEventListener("selectstart", prevent);
      document.removeEventListener("copy", prevent);
    };
  }, [pathname]);

  return null;
}
