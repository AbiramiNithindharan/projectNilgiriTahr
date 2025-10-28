import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./src/sanity/config";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { myCustomFormComponents } from "@/sanity/customFormComponents";
import { useRouter } from "sanity/router";
import { useEffect, useRef } from "react";

function SignOutAlertLayout(props: {
  renderDefault: (props: any) => React.ReactNode;
}) {
  const router = useRouter();
  const lastPath = useRef(router.state?.path);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave the Sanity Studio? Please sign out first.";
      return e.returnValue;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const interval = setInterval(() => {
      if (router.state?.path !== lastPath.current) {
        const confirmLeave = confirm(
          "Are you sure you want to leave the Sanity Studio? Please sign out first."
        );
        if (!confirmLeave) {
          // Revert navigation
          router.navigate({ path: lastPath.current || "/" });
        } else {
          lastPath.current = router.state?.path;
        }
      }
    }, 200); // check every 200ms

    // 🧹 Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, [router]);

  return props.renderDefault(props);
}

const signOutAlertPlugin = {
  name: "sign-out-alert",
  studio: {
    components: {
      layout: SignOutAlertLayout,
    },
  },
};

export default defineConfig({
  name: "ProjectNilgiriTahrStudio",
  title: "Project Nilgiri Tahr",
  basePath: "/studio",
  projectId: projectId!,
  dataset: dataset!,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    signOutAlertPlugin,
  ],
  form: {
    components: {
      input: (props) => {
        if (props.schemaType.name === "galleryItem") {
          return myCustomFormComponents.input(props);
        }
        return props.renderDefault(props);
      },
    },
  },
});
