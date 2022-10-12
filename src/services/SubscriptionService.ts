import subscriptionApi from "@/api/rest/SubscriptionApi";
import type { Quota } from "@/types";

class SubscriptionService {
  querySubscriptionsNodesAddresses(): Promise<string[]> {
    return subscriptionApi.getSubscriptionsNodesAddresses();
  }

  querySubscribeToNode(
    address: string,
    amount: string,
    currency: string
  ): Promise<void> {
    return subscriptionApi.subscribeToNode(address, amount, currency);
  }

  queryUnsubscribeFromNode(address: string): Promise<void> {
    return subscriptionApi.unsubscribeFromNode(address);
  }

  querySubscriptionQuota(nodeAddress: string): Promise<Quota> {
    return subscriptionApi.getSubscriptionQuota(nodeAddress);
  }
}

const subscriptionService = new SubscriptionService();

export default subscriptionService;
