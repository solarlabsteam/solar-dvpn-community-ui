import connectionApi from "@/api/rest/ConnectionApi";

class ConnectionService {
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
