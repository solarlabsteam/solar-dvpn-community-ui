export enum AccountMutationTypes {
  SET_WALLET = "SET_WALLET",
  SET_WALLET_LOADING_STATE = "SET_WALLET_LOADING_STATE",
  RESET_WALLET_STATE = "RESET_WALLET_STATE",
}

export enum NodesFiltersMutationTypes {
  SET_FILTERS = "SET_FILTERS",
  CLEAR_FILTERS = "CLEAR_FILTERS",
}

export enum NodeMutationTypes {
  SET_SELECTED_NODE = "SET_SELECTED_NODE",
  SET_DEFAULT_NODE_LOADING_STATE = "SET_DEFAULT_NODE_LOADING_STATE",
  RESET_NODE_STATE = "RESET_NODE_STATE",
}

export enum SettingsMutationTypes {
  SET_DNS_CONFIGURATIONS = "SET_DNS_CONFIGURATIONS",
  SET_DNS_CONFIGURATIONS_LOADING_STATE = "SET_DNS_CONFIGURATIONS_LOADING_STATE",
  SET_DNS_SELECTION_LOADING_STATE = "SET_DNS_SELECTION_LOADING_STATE",
  SET_SELECTED_DNS = "SET_SELECTED_DNS",
  RESET_SETTINGS_STATE = "RESET_SETTINGS_STATE",
}

export enum SubscriptionMutationTypes {
  RESET_SUBSCRIPTION_STATE = "RESET_SUBSCRIPTION_STATE",
  SET_SUBSCRIBING_LOADING_STATE = "SET_SUBSCRIBING_LOADING_STATE",
  SET_UNSUBSCRIPTION_LOADING_STATE = "SET_UNSUBSCRIPTION_LOADING_STATE",
}

export enum QuotaMutationTypes {
  SET_QUOTA = "SET_QUOTA",
  SET_QUOTA_LOADING_STATE = "SET_QUOTA_LOADING_STATE",
  RESET_QUOTA_STATE = "RESET_QUOTA_STATE",
}

export enum ConnectionMutationTypes {
  SET_CONNECTION_LOADING_STATE = "SET_CONNECTION_LOADING_STATE",
  SET_CONNECTION_STATE = "SET_CONNECTION_STATE",
  SET_STOP_SESSIONS_LOADING_STATE = "SET_STOP_SESSIONS_LOADING_STATE",
  SET_RESET_CONFIGURATION_LOADING_STATE = "SET_RESET_CONFIGURATION_LOADING_STATE",
}

export enum NodesMutationTypes {
  SET_NODES = "SET_NODES",
  SET_NODES_PAGINATION = "SET_NODES_PAGINATION",
  SET_NODES_LOADING_STATE = "SET_NODES_LOADING_STATE",
  SET_NODES_LOADING_FAILED_STATE = "SET_NODES_LOADING_FAILED_STATE",
  SET_SUBSCRIBED_NODES = "SET_SUBSCRIBED_NODES",
  SET_SUBSCRIBED_NODES_PAGINATION = "SET_SUBSCRIBED_NODES_PAGINATION",
  SET_SUBSCRIBED_NODES_LOADING_STATE = "SET_SUBSCRIBED_NODES_LOADING_STATE",
  SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE = "SET_SUBSCRIBED_NODES_LOADING_FAILED_STATE",
  SET_CONTINENTS = "SET_CONTINENTS",
}

export enum AppMutationTypes {
  SET_AUTHORIZED = "SET_AUTHORIZED",
  SET_SETUP_IN_PROGRESS_STATE = "SET_SETUP_IN_PROGRESS_STATE",
  SET_LOG_IN_LOADING_STATE = "SET_LOG_IN_LOADING_STATE",
  SET_LOG_OUT_LOADING_STATE = "SET_LOG_OUT_LOADING_STATE",
}

export enum PurchaseMutationTypes {
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_PRODUCTS_LOADING_STATE = "SET_PRODUCTS_LOADING_STATE",
  SET_PURCHASE_IN_PROGRESS = "SET_PURCHASE_IN_PROGRESS",
}
