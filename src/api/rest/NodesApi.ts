import {
  type CountryNodesInfoBase,
  type NodesData,
  type NodesSearchParameters,
  type Pagination,
  NodesOrder,
  NodeStatus,
} from "@/types";
import { formatObjectKeysToCamelCase } from "@/utils/formatters";
import { apiProvider } from "@/api";

class NodesApi {
  private readonly apiPath = "nodes";

  getActiveNodes(params?: NodesSearchParameters): Promise<NodesData> {
    return this.getNodes(
      params?.continent,
      params?.country,
      NodeStatus.active,
      params?.minPrice,
      params?.maxPrice,
      params?.orderBy,
      params?.query,
      params?.page
    );
  }

  getNodes(
    continent?: string,
    country?: string,
    status?: NodeStatus,
    minPrice?: number | string,
    maxPrice?: number | string,
    orderBy?: NodesOrder,
    query?: string,
    page?: number
  ): Promise<NodesData> {
    return apiProvider
      .get(this.apiPath, {
        params: {
          continent,
          country,
          status,
          min_price: minPrice,
          max_price: maxPrice,
          order_by: orderBy,
          q: query,
          page,
        },
      })
      .then((response) => ({
        pagination: <Pagination>formatObjectKeysToCamelCase(response.data),
        items: response.data.data.map(formatObjectKeysToCamelCase),
      }));
  }

  getNodesByAddresses(addresses: string[], page?: number): Promise<NodesData> {
    return apiProvider
      .post(
        "nodesByAddress",
        { blockchain_addresses: addresses },
        { params: { page } }
      )
      .then((response) => ({
        pagination: <Pagination>formatObjectKeysToCamelCase(response.data),
        items: response.data.data.map(formatObjectKeysToCamelCase),
      }));
  }

  getCountries(): Promise<CountryNodesInfoBase[]> {
    return apiProvider
      .get("countries")
      .then((response) => response.data.map(formatObjectKeysToCamelCase));
  }
}

const nodesApi = new NodesApi();

export default nodesApi;
