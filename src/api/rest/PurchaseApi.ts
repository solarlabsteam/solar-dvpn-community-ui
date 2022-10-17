import { apiProvider } from "@/api";
import type { Offering } from "@/types";

class PurchaseApi {
  async purchaseProduct(productId: string): Promise<void> {
    await apiProvider.post("purchase", { package_identifier: productId });
  }

  getOfferings(): Promise<Offering[]> {
    return apiProvider.get("offerings").then((res) => res.data);
  }
}

const purchaseApi = new PurchaseApi();

export default purchaseApi;
