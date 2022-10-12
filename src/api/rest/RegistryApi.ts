import { apiProvider } from "@/api";
import { formatObjectKeysToCamelCase } from "@/utils/formatters";
import type { RegistryValue } from "@/types";

class RegistryApi {
  private readonly apiPath = "registry";

  getValue(key: string): Promise<RegistryValue> {
    return apiProvider
      .get(this.apiPath, { params: { key } })
      .then((response) => formatObjectKeysToCamelCase(response.data));
  }

  async setValue(
    key: string,
    value: string,
    isSecured: boolean
  ): Promise<void> {
    await apiProvider.post(this.apiPath, { key, value, is_secured: isSecured });
  }

  async deleteValue(key: string): Promise<void> {
    await apiProvider.delete(this.apiPath, { params: { key } });
  }
}

const registryApi = new RegistryApi();

export default registryApi;
