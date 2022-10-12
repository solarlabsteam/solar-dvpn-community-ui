import type { DnsInfo } from "@/types";
import dnsApi from "@/api/rest/DnsApi";

class DnsService {
  queryDnsConfigurations(): Promise<DnsInfo[]> {
    return dnsApi.getDnsConfigurations();
  }

  querySelectedDnsConfiguration(): Promise<DnsInfo> {
    return dnsApi.getSelectedDnsConfiguration();
  }

  selectDnsConfiguration(dns: string): Promise<void> {
    return dnsApi.selectDnsConfiguration(dns);
  }
}

const dnsService = new DnsService();

export default dnsService;
