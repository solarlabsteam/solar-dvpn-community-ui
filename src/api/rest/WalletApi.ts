import type { Wallet, WalletProfile } from "@/types";
import { apiProvider } from "@/api";

interface IWalletApi {
  getWallet(): Promise<Wallet>;

  createWallet(): Promise<WalletProfile>;

  recoverWallet(mnemonic: string): Promise<Wallet>;

  deleteWallet(): Promise<void>;
}

class WalletApi implements IWalletApi {
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

class WalletApiMock implements IWalletApi {
  async getWallet(): Promise<Wallet> {
    return {
      address: "sent1gyu0dkhk4y7wfsj4zr2lkxettvvpkadek6dn7q",
      balance: 200_000_000,
      currency: "udvpn",
    };
  }

  async createWallet(): Promise<WalletProfile> {
    return {
      mnemonic:
        "change engine tiny holiday shiver topple proud yellow large alpha expire network drop renew poverty print empty scale knock post elevator sister river burst",
      wallet: {
        address: "sent1gyu0dkhk4y7wfsj4zr2lkxettvvpkadek6dn7q",
        balance: 200_000_000,
        currency: "udvpn",
      },
    };
  }

  async recoverWallet(): Promise<Wallet> {
    return {
      address: "sent1gyu0dkhk4y7wfsj4zr2lkxettvvpkadek6dn7q",
      balance: 200_000_000,
      currency: "udvpn",
    };
  }

  async deleteWallet(): Promise<void> {}
}

const walletApi: IWalletApi =
  process.env.NODE_ENV === "development"
    ? new WalletApiMock()
    : new WalletApi();

export default walletApi;
