export type View = "greeting" | "setup-complete" | "check-mnemonic";

export type openNextViewMethod = (
  view: View,
  config?: {
    props?: object;
  }
) => void;
