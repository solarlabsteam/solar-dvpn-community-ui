import { type Node, NodeStatus } from "@/types";
import useConnection from "@/hooks/useConnection";
import useSubscription from "@/hooks/useSubscription";

export default function useNodeActions(): {
  selectNode(node: Node): Promise<void>;
} {
  const { select } = useConnection();
  const { unsubscribe } = useSubscription();

  const selectNode = async (node: Node): Promise<void> => {
    if (node.status === NodeStatus.active) {
      await select(node);
    } else {
      await unsubscribe(node);
    }
  };

  return {
    selectNode,
  };
}
