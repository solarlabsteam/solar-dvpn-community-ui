export default {
  account: {
    getStarted: "Get started",
    wallet: "Your wallet",
    address: "Sentinel Address",
    or: "Or",
    logout: {
      title: "Danger zone",
      text: "Be careful, destructive stuff!",
    },
    balance: "Your balance",
    balanceUpdated: "Updated {time} ago",
    buyTokens: "Buy DVPN tokens",
  },

  setup: {
    greeting: {
      title: "SOLAR dVPN: Community Edition",
      text: "SOLAR dVPN Community Edition is build on top of fully open-source solution for Sentinel designed by SOLAR Labs",
    },
    complete: {
      title: "You’re all set!",
      text: "Enjoy secure & censorship-free connectivity with dVPN!",
      continue: "Awesome! Let’s go!",
    },
    mnemonic: {
      create: {
        title: "You’ll need a mnemonic",
        text: "Mnemonic is a special 24-word phrase which is used as a key to your blockchain account.",
      },
      check: {
        title: "Here’s your mnemonic",
        text: "Keep it secret — it is your key to your blockchain account. Write it down on a piece of paper & store in a safe place.",
        timerTitle: "Just making sure you write it down :)",
      },
      action: {
        create: "Create a new mnemonic",
        recover: "I already have a mnemonic",
        confirmCheck: "OK, I wrote it down",
      },
    },
  },

  settings: {
    modalTitle: "Settings",
    account: "Account",
    dns: "DNS Server",
    troubleshooting: "Troubleshooting",
    stopSessions: {
      title: "Stop all sessions",
      text: "This will stop all active VPN sessions under your account and will turn your protection off. Use this for troubleshooting only.",
      button: "Stop sessions",
    },
    removeConfigurations: {
      title: "Remove VPN configurations",
      text: "This will remove all the VPN configuration changes done by SOLAR dVPN and will turn your protection off. Use this for troubleshooting only.",
      button: "Reset VPN configuration",
    },
  },

  connection: {
    disconnect: "Disconnect",
    connect: "Connect to dVPN",
    youAre: "You are",
    protected: "Protected",
    unprotected: "Unprotected",
    upload: "Upload",
    download: "Download",
    bandwidth: "Bandwidth left",
  },

  node: {
    list: {
      title: "DVPN Nodes",
      noData: {
        title: "Nothing found",
        text: "We found no nodes matching your search criteria.",
      },
      noSubscriptions: {
        title: "No subscriptions",
        text: "You don’t have any DVPN node subscription yet.",
        action: "Select a DVPN node",
      },
      search: {
        placeholder: "Search",
      },
      loadingFailure: {
        title: "Failed to load nodes",
        text: "Please check if you are connected to the Internet and try again.",
      },
      tab: {
        subscriptions: "Subscriptions",
        allNodes: "All Nodes",
      },
    },
    parameters: {
      price: "Price",
      latency: "Latency",
      peers: "Peers",
      address: "Node Address",
      connectedPeers: "Connected peers count",
      uploadSpeed: "Upload speed",
      provider: "Node provider",
      downloadSpeed: "Download speed",
      version: "Version",
      type: "Type of node",
      country: "Country",
      city: "City",
      community: "Community",
    },
    unavailable: "Node Unavailable",
  },

  continent: {
    AF: "Africa",
    AS: "Asia",
    EU: "Europe",
    NA: "North America",
    SA: "South America",
    RW: "Rest of the world",
    parameters: {
      availableNode: "{count} nodes available",
    },
    any: "Any continents",
    anyCountries: "Any countries",
  },

  subscription: {
    list: {
      noData: "No subscriptions found",
    },
  },

  action: {
    copy: "Copy",
    copied: "Copied!",
    back: "Back",
    done: "Done",
    subscribe: "Subscribe",
    unsubscribe: "Unsubscribe",
    continue: "Continue",
    filter: "Filter",
    cancel: "Cancel",
    apply: "Apply",
    unblur: "Tap to unblur",
    delete: "Delete",
    retry: "Retry",
    switch: "Switch",
    search: "Search",
  },

  subscriptionModal: {
    header: "Subscribe to",
    priceMessage: "will be paid upfront to node provider",
  },

  unsubscriptionModal: {
    header: "Unsubscribe",
    message: "Are you sure to unsubscribe from {name}?",
  },

  nodesFiltersModal: {
    header: "Filter By",
    body: {
      continent: "Continent",
      country: "Country",
      minPrice: "Minimum price",
      maxPrice: "Maximum price",
      orderBy: "Order by",
    },
    applyFilters: "Apply filters",
  },
};
