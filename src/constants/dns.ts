import type { DnsInfo } from "@/types";

export const cloudflare: DnsInfo = {
  name: "cloudflare",
  addresses: "1.1.1.1, 1.0.0.1",
};

export const google: DnsInfo = {
  name: "google",
  addresses: "8.8.8.8, 8.8.4.4",
};

export const handshake: DnsInfo = {
  name: "handshake",
  addresses: "103.196.38.38, 103.196.38.39",
};

export const defaultDns = handshake;
