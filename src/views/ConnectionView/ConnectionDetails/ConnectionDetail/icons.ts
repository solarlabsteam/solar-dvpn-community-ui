import type { ConnectionDetailType } from "@/types";

export default {
  download: "arrow-down",
  upload: "arrow-up",
  bandwidth: "arrow-left-right",
} as { [key in ConnectionDetailType]: string };
