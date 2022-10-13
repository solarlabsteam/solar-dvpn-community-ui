import useError from "@/hooks/useError";

const { setError } = useError();

class WebsocketProvider {
  private readonly url = "ws://localhost:3876/echo";
  private ws: WebSocket | null = null;

  openConnection(): WebSocket {
    if (!this.ws) {
      this.ws = this.createWebsocketConnection(
        this.url,
        this.onOpen,
        this.onMessage,
        this.onError,
        this.onClose
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

  private createWebsocketConnection(
    url: string,
    onOpen?: (ev: Event) => any,
    onMessage?: (ev: Event) => any,
    onError?: (ev: Event) => any,
    onClose?: (ev: Event) => any
  ): WebSocket {
    const ws = new WebSocket(url);
    ws.onopen = onOpen || null;
    ws.onmessage = onMessage || null;
    ws.onerror = onError || null;
    ws.onclose = onClose || null;
    return ws;
  }

  private onOpen(event: any): void {
    setError(`WEBSOCKET OPENED ${JSON.stringify(event)} ${event.data}`);
  }

  private onMessage(event: any): void {
    setError(`WEBSOCKET MSG ${JSON.stringify(event)} ${event.data}`);
  }

  private onError(event: any): void {
    setError(`WEBSOCKET ERROR ${JSON.stringify(event)} ${event.data}`);
  }

  private onClose(event: any): void {
    setError(`WEBSOCKET CLOSE ${JSON.stringify(event)} ${event.data}`);
  }
}

const wsProvider = new WebsocketProvider();

export default wsProvider;
