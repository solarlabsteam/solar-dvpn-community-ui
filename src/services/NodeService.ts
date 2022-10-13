import countries from "@/data/countries";
import nodesApi from "@/api/rest/NodesApi";
import {
  ContinentCode,
  type ContinentsInfo,
  type ContinentsNodesCount,
  type CountryCodeToContinentCode,
  type CountryInfo,
  type CountryNodesInfo,
  type NodesData,
  type NodesSearchParameters,
} from "@/types";

class NodeService {
  querySubscribedNodes(addresses: string[], page?: number): Promise<NodesData> {
    if (addresses.length === 0) {
      return Promise.resolve({
        items: [],
        pagination: {
          currentPage: 0,
          total: 0,
        },
      });
    }

    return nodesApi.getNodesByAddresses(addresses, page);
  }

  queryActiveNodes(params?: NodesSearchParameters): Promise<NodesData> {
    return nodesApi.getActiveNodes(params);
  }

  async queryContinentsInfos(): Promise<ContinentsInfo> {
    const countriesInfoBase = await nodesApi.getCountries();
    const countryCodeToContinentCode: CountryCodeToContinentCode =
      countries.reduce((acc: CountryCodeToContinentCode, curr: CountryInfo) => {
        acc[curr.alpha2] =
          curr.continent in ContinentCode
            ? (curr.continent as ContinentCode)
            : ContinentCode.RW;
        return acc;
      }, {});
    const continentsNodesCount: ContinentsNodesCount = {
      EU: 0,
      AS: 0,
      AF: 0,
      NA: 0,
      SA: 0,
      RW: 0,
    };
    const countriesInfo: CountryNodesInfo[] = [];
    countriesInfoBase.forEach((info) => {
      const continentCode = countryCodeToContinentCode[info.code.toUpperCase()];
      countriesInfo.push({ ...info, continentCode });
      continentsNodesCount[continentCode] =
        continentsNodesCount[continentCode] + info.nodesCount;
    });
    return {
      countries: countriesInfo,
      continentsNodesCount,
    };
  }
}

const nodeService = new NodeService();

export default nodeService;
