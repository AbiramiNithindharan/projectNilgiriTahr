"use client";

/**
 * Studio's own "Sign out" ends the Sanity session but leaves the adminAuth cookie
 * behind, so /studio would still open past the password screen on /admin. This
 * button runs the full sign-out instead — see src/app/cms-logout/page.tsx.
 */
export default function CmsNavbar(props: {
  renderDefault: (props: any) => React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <div style={{ flex: 1, minWidth: 0 }}>{props.renderDefault(props)}</div>
      <button
        type="button"
        onClick={() => {
          window.location.href = "/cms-logout";
        }}
        style={{
          flexShrink: 0,
          margin: "0 12px",
          padding: "6px 14px",
          fontSize: 13,
          fontWeight: 600,
          color: "#fff",
          background: "#c2410c",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Sign out
      </button>
    </div>
  );
}
