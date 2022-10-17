import type { DnsInfo } from "@/types";
import { apiProvider } from "@/api";

class DnsApi {
  private readonly apiPath = "dns";

  getDnsConfigurations(): Promise<DnsInfo[]> {
    return apiProvider
      .get(`${this.apiPath}/list`)
      .then((res) => res.data.servers);
  }

  getSelectedDnsConfiguration(): Promise<DnsInfo> {
    return apiProvider.get(`${this.apiPath}/current`).then((res) => res.data);
  }

  async selectDnsConfiguration(dns: string): Promise<void> {
    return apiProvider.put(this.apiPath, { server: dns });
  }
}

const dnsApi = new DnsApi();

export default dnsApi;
