import { Suspense } from "react";
import AdminClient from "./AdminClient";
import LoadingDots from "@/components/LoadingDots/LoadingDots";
import styles from "./admin.module.css";

function PortalFallback() {
  return (
    <div className={styles.portalContainer}>
      <div className={styles.bgOverlay}></div>
      <div className={`${styles.portalCard} ${styles.portalFallback}`}>
        <LoadingDots tone="green" size="lg" label="Loading admin portal" />
      </div>
    </div>
  );
}

type CMSPortalProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CMSPortal({ searchParams }: CMSPortalProps) {
  const params = await searchParams;
  const tab = typeof params.tab === "string" ? params.tab : undefined;
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <Suspense fallback={<PortalFallback />}>
      <AdminClient
        initialTab={tab === "donation" ? "donation" : "cms"}
        error={error}
      />
    </Suspense>
  );
}
