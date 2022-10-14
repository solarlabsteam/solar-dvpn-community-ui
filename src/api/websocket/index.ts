import { createWebsocketConnection } from "@/utils/websocket";

class WebsocketProvider {
  private readonly url = "ws://localhost:3876/echo";
  private ws: WebSocket | null = null;

  openConnection(
    messageHandler: (event: MessageEvent) => void,
    errorHandler: (event: Event) => void
  ): WebSocket {
    if (!this.ws) {
      this.ws = createWebsocketConnection(
        this.url,
        undefined,
        messageHandler,
        errorHandler,
        undefined
      );
    }
    return this.ws;
  }

  closeConnection(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

const wsProvider = new WebsocketProvider();

export default wsProvider;
