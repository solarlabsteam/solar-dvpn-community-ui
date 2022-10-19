<template>
  <ul class="nodes-list" @scroll="handleScroll">
    <li
      v-for="node in nodes"
      :key="node.blockchainAddress"
      class="nodes-list__item slr-clickable"
      @click.prevent.stop="() => select(node)"
    >
      <node-preview :node="node">
        <template #action>
          <slr-icon
            v-if="connectedNodeAddress === node.blockchainAddress"
            :icon="'connection'"
          />
          <slr-icon
            v-else-if="
              subscribedNodesAddresses.includes(node.blockchainAddress)
            "
            :icon="'subscribed'"
          />
        </template>
      </node-preview>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Node } from "@/types";
import NodePreview from "@/components/app/NodePreview";
import SlrIcon from "@/components/ui/SlrIcon/SlrIcon.vue";
import useConnection from "@/hooks/useConnection";
import useNodes from "@/hooks/useNodes";

const props = defineProps<{
  nodes: Node[];
  select: (node: Node) => void;
  loadMore: () => void;
}>();

const { isConnected } = useConnection();
const { selectedNode, subscribedNodes } = useNodes();

const connectedNodeAddress = computed<string | undefined>(() =>
  isConnected.value ? selectedNode.value?.blockchainAddress : undefined
);
const subscribedNodesAddresses = computed<string[]>(() =>
  subscribedNodes.value.map((node: Node) => node.blockchainAddress)
);

const handleScroll = (event: Event) => {
  const target = event.target as HTMLDivElement;
  const isBottomReached =
    Math.ceil(target.scrollTop) + Math.ceil(target.offsetHeight) >=
    target.scrollHeight;
  if (isBottomReached) {
    props.loadMore();
  }
};
</script>

<style lang="scss" src="./NodesList.scss" />
