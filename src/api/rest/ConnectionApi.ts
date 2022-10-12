import { apiProvider } from "@/api";

class ConnectionApi {
  private readonly apiPath = "connection";

  async connectToNode(address: string): Promise<void> {
    await apiProvider.post(this.apiPath, { node_address: address });
  }

  async disconnectFromNode(): Promise<void> {
    await apiProvider.delete(this.apiPath);
  }

  async stopSessions(): Promise<void> {
    await apiProvider.delete(`${this.apiPath}/sessions`);
  }

  async resetConfiguration(): Promise<void> {
    await apiProvider.delete(`${this.apiPath}/configuration`);
  }
}

const connectionApi = new ConnectionApi();

export default connectionApi;
