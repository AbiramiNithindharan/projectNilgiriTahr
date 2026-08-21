"use client";

import { useEffect, useRef } from "react";
import { endSanitySession } from "@/lib/cms/signOut";
import LoadingDots from "@/components/LoadingDots/LoadingDots";

/**
 * Full CMS sign-out: ends the Sanity session on this browser *and* drops the
 * adminAuth cookie that lets middleware admit you to /studio. Studio's own
 * "Sign out" only does the former, which would leave the gate cookie behind.
 */
export default function CmsLogoutPage() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    (async () => {
      await endSanitySession();

      try {
        await fetch("/api/cms-logout", { method: "POST" });
      } catch (err) {
        console.error("⚠️ Failed to clear CMS access cookie:", err);
      }

      // Hard navigation, so nothing of the Studio session is restored from cache.
      window.location.replace("/admin?tab=cms");
    })();
  }, []);

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingDots tone="green" size="lg" label="Signing out of the CMS" />
    </main>
  );
}
