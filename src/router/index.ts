import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  RouterView,
} from "vue-router";
import SetupGreetingView from "@/views/SetupGreetingView";
import SetupMnemonicView from "@/views/SetupMnemonicView";
import SetupMnemonicCheckView from "@/views/SetupMnemonicCheckView";
import SetupMnemonicRecoverView from "@/views/SetupMnemonicRecoverView";
import SetupCompleteView from "@/views/SetupCompleteView";
import ConnectionView from "@/views/ConnectionView";
import SettingsView from "@/views/SettingsView";
import AccountView from "@/views/AccountView";
import NodesView from "@/views/NodesView";
import SettingsDnsView from "@/views/SettingsDnsView";
import NodesAvailableView from "@/views/NodesAvailableView";
import NodesSearchView from "@/views/NodesSearchView";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: ConnectionView,
    name: "home",
  },
  {
    path: "/nodes",
    component: RouterView,
    redirect: { name: "nodes" },
    children: [
      {
        path: "",
        component: NodesView,
        name: "nodes",
        props: (route) => {
          return { ...route.query };
        },
      },
      {
        path: "available",
        component: NodesAvailableView,
        name: "nodes-available",
        props: (route) => {
          return { ...route.query };
        },
      },
      {
        path: "search",
        component: NodesSearchView,
        name: "nodes-search",
        props: (route) => {
          return { ...route.query };
        },
      },
    ],
  },
  {
    path: "/setup",
    component: RouterView,
    name: "setup",
    redirect: { name: "greeting" },
    children: [
      {
        path: "",
        component: SetupGreetingView,
        name: "greeting",
      },
      {
        path: "mnemonic",
        component: RouterView,
        redirect: { name: "mnemonic-setup" },
        children: [
          {
            path: "",
            component: SetupMnemonicView,
            name: "mnemonic-setup",
          },
          {
            path: "recover",
            component: SetupMnemonicRecoverView,
            name: "recover-mnemonic",
          },
          {
            path: "check/:mnemonic",
            component: SetupMnemonicCheckView,
            name: "check-mnemonic",
            props: (route) => {
              return { ...route.params };
            },
          },
        ],
      },
      {
        path: "complete",
        component: SetupCompleteView,
        name: "setup-complete",
      },
    ],
  },
  {
    path: "/settings",
    component: RouterView,
    redirect: { name: "settings" },
    children: [
      {
        path: "",
        component: SettingsView,
        name: "settings",
      },
      {
        path: "dns",
        component: SettingsDnsView,
        name: "settings-dns",
      },
    ],
  },
  {
    path: "/account",
    component: AccountView,
    name: "account",
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (!to.path.startsWith("/setup")) next({ name: "setup" });
//   else next();
// });

export default router;
