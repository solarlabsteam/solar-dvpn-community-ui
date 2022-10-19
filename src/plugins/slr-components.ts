import type { App } from "vue";
import SlrButton from "@/components/ui/SlrButton";
import SlrLoader from "@/components/ui/SlrLoader";
import SlrIcon from "@/components/ui/SlrIcon";
import SlrTabs from "@/components/ui/SlrTabs";
import SlrTab from "@/components/ui/SlrTabs/SlrTab";
import SlrPopper from "@/components/ui/SlrPopper";
import SlrCopyButton from "@/components/ui/SlrCopyButton";
import SlrModal from "@/components/ui/SlrModal";
import SlrClipboardText from "@/components/ui/SlrClipboardText";
import SlrInput from "@/components/ui/SlrInput";
import SlrSearchInput from "@/components/ui/SlrSearchInput";
import SlrSecureBlur from "@/components/ui/SlrSecureBlur";
import SlrTimer from "@/components/ui/SlrTimer";
import SlrLinearLoader from "@/components/ui/SlrLinearLoader";
import SlrView from "@/components/ui/SlrView";

export default function registerSlrComponents(app: App) {
  app.component("SlrButton", SlrButton);
  app.component("SlrLoader", SlrLoader);
  app.component("SlrIcon", SlrIcon);
  app.component("SlrTabs", SlrTabs);
  app.component("SlrTab", SlrTab);
  app.component("SlrPopper", SlrPopper);
  app.component("SlrCopyButton", SlrCopyButton);
  app.component("SlrModal", SlrModal);
  app.component("SlrClipboardText", SlrClipboardText);
  app.component("SlrInput", SlrInput);
  app.component("SlrSearchInput", SlrSearchInput);
  app.component("SlrSecureBlur", SlrSecureBlur);
  app.component("SlrTimer", SlrTimer);
  app.component("SlrLinearLoader", SlrLinearLoader);
  app.component("SlrView", SlrView);
}
