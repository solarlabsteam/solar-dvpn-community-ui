import type { RegistryValue } from "@/types";
import registryApi from "@/api/rest/RegistryApi";

class RegistryService {
  queryValue(key: string): Promise<RegistryValue> {
    return registryApi.getValue(key);
  }

  querySetValue(key: string, value: string, isSecured: boolean): Promise<void> {
    return registryApi.setValue(key, value, isSecured);
  }

  queryDeleteValue(key: string): Promise<void> {
    return registryApi.deleteValue(key);
  }
}

const registryService = new RegistryService();

export default registryService;
