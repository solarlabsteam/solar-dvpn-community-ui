import type { Quota } from "@/types";
import { apiProvider } from "@/api";

class SubscriptionApi {
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

const subscriptionApi = new SubscriptionApi();

export default subscriptionApi;
