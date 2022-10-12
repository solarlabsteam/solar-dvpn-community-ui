import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueClipboard from "vue3-clipboard";
import store from "@/store/store";
import registerSlrComponents from "@/plugins/slr-components";
import i18n from "@/plugins/i18n";

const app = createApp(App);

app.config.errorHandler = (err) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }
};

app.use(router);
app.use(store);
app.use(registerSlrComponents);
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
});
app.use(i18n);

app.mount("#app");
