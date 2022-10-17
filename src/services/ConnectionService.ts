import connectionApi from "@/api/rest/ConnectionApi";
import type { NodeConnection } from "@/types";

class ConnectionService {
  queryNodeConnection(): Promise<NodeConnection> {
    return connectionApi.getConnection();
  }

  async queryConnectToNode(address: string): Promise<void> {
    await connectionApi.connectToNode(address);
  }

  async queryDisconnectFromNode(): Promise<void> {
    await connectionApi.disconnectFromNode();
  }

  async queryStopSessions(): Promise<void> {
    await connectionApi.stopSessions();
  }

  async queryResetConfiguration(): Promise<void> {
    await connectionApi.resetConfiguration();
  }
}

const connectionService = new ConnectionService();

export default connectionService;
