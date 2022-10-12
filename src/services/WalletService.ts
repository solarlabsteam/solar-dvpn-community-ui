import type { Wallet, WalletProfile } from "@/types";
import walletApi from "@/api/rest/WalletApi";

class WalletService {
  async getWallet(): Promise<Wallet> {
    return walletApi.getWallet();
  }

  async createWallet(): Promise<WalletProfile> {
    return walletApi.createWallet();
  }

  async recoverWallet(mnemonic: string): Promise<Wallet> {
    return walletApi.recoverWallet(mnemonic);
  }

  async deleteWallet(): Promise<void> {
    return walletApi.deleteWallet();
  }
}

const walletService = new WalletService();

export default walletService;
