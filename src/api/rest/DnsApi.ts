import type { DnsInfo } from "@/types";
import { cloudflare, google, handshake } from "@/constants/dns";
import { apiProvider } from "@/api";

interface IDnsApi {
  getDnsConfigurations(): Promise<DnsInfo[]>;

  getSelectedDnsConfiguration(): Promise<DnsInfo>;

  selectDnsConfiguration(dns: string): Promise<void>;
}

class DnsApi implements IDnsApi {
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

class DnsApiMock implements IDnsApi {
  getDnsConfigurations(): Promise<DnsInfo[]> {
    return Promise.resolve([handshake, google, cloudflare]);
  }

  getSelectedDnsConfiguration(): Promise<DnsInfo> {
    return Promise.resolve(handshake);
  }

  async selectDnsConfiguration(dns: string): Promise<void> {}
}

const dnsApi =
  process.env.NODE_ENV === "development" ? new DnsApiMock() : new DnsApi();

export default dnsApi;
