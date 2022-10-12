/* eslint-disable camelcase */

export enum NodeStatus {
  active = "STATUS_ACTIVE",
  inactive = "STATUS_INACTIVE",
}

export enum NodesOrder {
  price = "PRICE",
  downloadSpeed = "DOWNLOAD_SPEED",
  uploadSpeed = "UPLOAD_SPEED",
  peers = "PEERS",
}

export interface Node {
  id: number;
  blockchainAddress: string;
  isTrusted: boolean;
  moniker: string;
  remoteUrl: string;
  status: NodeStatus;
  defaultPrice: number;
  bandwidthUpload: number;
  bandwidthDownload: number;
  locationCountryCode: string;
  locationContinentCode: string;
}

export interface Bandwidth {
  value: string;
  units: string;
}

export interface Amount {
  amount: string;
  denom: string;
}

export interface CountryInfo {
  alpha2: string;
  capital: string;
  area: string;
  population: string;
  continent: string;
}

export enum ContinentCode {
  EU = "EU", // Europe
  AS = "AS", // Asia
  AF = "AF", // Africa
  NA = "NA", // North America
  SA = "SA", // South America
  RW = "RW", // Rest of the world
}

export interface CountryNodesInfoBase {
  code: string;
  nodesCount: number;
}

export interface CountryNodesInfo extends CountryNodesInfoBase {
  continentCode: ContinentCode;
}

export type ContinentsNodesCount = {
  [key in ContinentCode]: number;
};

export type CountryCodeToContinentCode = {
  [key: string]: ContinentCode;
};

export interface ContinentsInfo {
  countries: CountryNodesInfo[];
  continentsNodesCount: ContinentsNodesCount;
}

export interface NodesSearchParameters {
  continent?: ContinentCode;
  country?: string;
  query?: string;
  page?: number;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: NodesOrder;
}

export interface Pagination {
  currentPage: number;
  total: number;
}

export interface NodesData {
  items: Node[];
  pagination: Pagination;
}

export interface Option {
  value: string;
  text: string;
}

export interface NodesFilters {
  query: string;
  continentCode: string;
  countryCode: string;
  minPrice: number;
  maxPrice: number;
  orderBy: NodesOrder;
}

export type ConnectionDetailType = "upload" | "download" | "bandwidth";

export interface DnsInfo {
  name: string;
  addresses: string;
}

export interface Quota {
  address: string;
  allocated: string;
  consumed: string;
}

export enum NodeSelectionStatus {
  SUCCESS = "SUCCESS",
  SUBSCRIPTION_REQUIRED = "SUBSCRIPTION_REQUIRED",
  CANCELED = "CANCELED",
}

export enum NodeSubscriptionStatus {
  SUCCESS = "SUCCESS",
  NOT_ENOUGH_BALANCE = "NOT_ENOUGH_BALANCE",
  CANCELED = "CANCELED",
}

export interface Wallet {
  address: string;
  balance: number;
  currency: string;
}

export interface WalletProfile {
  wallet: Wallet;
  mnemonic: string;
}

export interface RegistryValue {
  key: string;
  value: string;
  isSecure: boolean;
}
