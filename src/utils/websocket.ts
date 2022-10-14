export function createWebsocketConnection(
  url: string,
  onOpen?: (ev: Event) => any,
  onMessage?: (ev: MessageEvent) => any,
  onError?: (ev: Event) => any,
  onClose?: (ev: CloseEvent) => any
): WebSocket {
  const ws = new WebSocket(url);
  ws.onopen = onOpen || null;
  ws.onmessage = onMessage || null;
  ws.onerror = onError || null;
  ws.onclose = onClose || null;
  return ws;
}
