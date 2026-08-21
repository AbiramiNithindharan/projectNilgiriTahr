import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { projectId, dataset, apiVersion } from "./src/sanity/config";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { myCustomFormComponents } from "@/sanity/customFormComponents";
import CmsNavbar from "@/sanity/components/CmsNavbar";

const cmsNavbarPlugin = {
  name: "cms-navbar",
  studio: {
    components: {
      navbar: CmsNavbar,
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
    cmsNavbarPlugin,
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
