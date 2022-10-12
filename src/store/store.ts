import { createStore, createLogger } from "vuex";
import subscription from "@/store/modules/subscription";
import node from "@/store/modules/node";
import connection from "@/store/modules/connection";
import quota from "@/store/modules/quota";
import nodes from "@/store/modules/nodes";
import nodesFilters from "@/store/modules/nodesFilters";
import wallet from "@/store/modules/wallet";
import settings from "@/store/modules/settings";

const logger =
  process.env.NODE_ENV === "development" ? createLogger() : function () {};

export default createStore({
  modules: {
    subscription,
    node,
    connection,
    quota,
    nodes,
    nodesFilters,
    wallet,
    settings,
  },
  plugins: [logger],
});
