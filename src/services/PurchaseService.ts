import type { Product } from "@/types";
import purchaseApi from "@/api/rest/PurchaseApi";

class PurchaseService {
  async queryDvpnProducts(): Promise<Product[]> {
    const offerings = await purchaseApi.getOfferings();
    const dvpnOfferings = offerings.filter(
      (offering) => offering.identifier === "community_dvpn"
    );
    if (dvpnOfferings.length > 0) {
      return dvpnOfferings[0].availablePackages;
    } else {
      return [];
    }
  }

  async queryPurchaseProduct(productId: string): Promise<void> {
    await purchaseApi.purchaseProduct(productId);
  }
}

const purchaseService = new PurchaseService();

export default purchaseService;
