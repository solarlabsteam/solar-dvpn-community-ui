import type { Wallet, WalletProfile } from "@/types";
import { apiProvider } from "@/api";

class WalletApi {
  private readonly apiPath = "wallet";

  async getWallet(): Promise<Wallet> {
    return apiProvider.get(this.apiPath).then((res) => res.data);
  }

  async createWallet(): Promise<WalletProfile> {
    return apiProvider.post(this.apiPath).then((res) => res.data);
  }

  async recoverWallet(mnemonic: string): Promise<Wallet> {
    return apiProvider.put(this.apiPath, { mnemonic }).then((res) => res.data);
  }

  async deleteWallet(): Promise<void> {
    await apiProvider.delete(this.apiPath);
  }
}

const walletApi = new WalletApi();

export default walletApi;
