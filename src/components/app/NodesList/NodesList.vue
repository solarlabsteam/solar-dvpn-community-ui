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
import { useStore } from "vuex";
import type { Node } from "@/types";
import NodePreview from "@/components/app/NodePreview";
import SlrIcon from "@/components/ui/SlrIcon/SlrIcon.vue";

const props = defineProps<{
  nodes: Node[];
  select: (node: Node) => void;
  loadMore: () => void;
}>();

const store = useStore();

const connectedNodeAddress = computed(
  () => store.getters.connectedNode?.blockchainAddress
);
const subscribedNodesAddresses = computed(() =>
  store.getters.subscribedNodes.map((node: Node) => node.blockchainAddress)
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
