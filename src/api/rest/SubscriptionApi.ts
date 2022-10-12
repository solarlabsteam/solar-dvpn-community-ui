import type { Quota } from "@/types";
import { apiProvider } from "@/api";

interface ISubscriptionApi {
  getSubscriptionsNodesAddresses(): Promise<string[]>;

  getSubscriptionQuota(nodeAddress: string): Promise<Quota>;

  subscribeToNode(
    address: string,
    amount: string,
    currency: string
  ): Promise<void>;

  unsubscribeFromNode(address: string): Promise<void>;
}

class SubscriptionApi implements ISubscriptionApi {
  private readonly apiPath = "subscriptions";

  async subscribeToNode(
    address: string,
    amount: string,
    currency: string
  ): Promise<void> {
    await apiProvider.post(this.apiPath, {
      node_address: address,
      amount,
      currency,
    });
  }

  async unsubscribeFromNode(address: string): Promise<void> {
    await apiProvider.delete(this.apiPath, {
      params: { node_address: address },
    });
  }

  async getSubscriptionsNodesAddresses(): Promise<string[]> {
    const res = await apiProvider.get(this.apiPath);
    return res.data;
  }

  async getSubscriptionQuota(nodeAddress: string): Promise<Quota> {
    const res = await apiProvider.get(`${this.apiPath}/${nodeAddress}`);
    return res.data;
  }
}

class SubscriptionApiMock implements ISubscriptionApi {
  async subscribeToNode(
    address: string,
    amount: string,
    currency: string
  ): Promise<void> {}

  async unsubscribeFromNode(address: string): Promise<void> {}

  getSubscriptionsNodesAddresses(): Promise<string[]> {
    return Promise.resolve([
      "sentnode1qpzermxsctem57jgu9sed6ndhyvlw9kgrtapnx",
      "sentnode1q98xzsf9swu05zfw5pwvm60jj6elgc3yl87tee",
      "sentnode1q90n4stua4fkn4en57hh0f6g736av46lkmpumj",
      "sentnode1q9kshdwndztdxzndlm093rnk6g0y6je92wd7h8",
      "sentnode1q8e5glc70fstveu4s3s5h4467kkln5duns2jsm",
      "sentnode1qgd3jegwpxcy5lyk5uy9e892l9m2ncg4vv5547",
      "sentnode1qfhwu75zwz000sm323v69r76unx32h4g2jmegx",
    ]);
  }

  getSubscriptionQuota(): Promise<Quota> {
    return Promise.resolve({
      address: "sentnode1q8e5glc70fstveu4s3s5h4467kkln5duns2jsm",
      allocated: "12000000",
      consumed: "12000000",
    });
  }
}

const subscriptionApi =
  process.env.NODE_ENV === "development"
    ? new SubscriptionApiMock()
    : new SubscriptionApi();

export default subscriptionApi;
