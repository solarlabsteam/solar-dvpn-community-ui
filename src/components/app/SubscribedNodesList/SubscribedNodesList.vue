<template>
  <ul class="subscribed-nodes-list" @scroll="handleScroll">
    <li
      v-for="node in nodes"
      :key="node.blockchainAddress"
      class="subscribed-nodes-list__item slr-clickable"
      @click="() => select(node)"
    >
      <node-preview :node="node">
        <template #action>
          <slr-icon
            class="subscribed-nodes-list__unsubscribe-btn"
            :icon="'cross'"
            :size="15"
            @click.prevent.stop="() => unsubscribe(node)"
          />
        </template>
      </node-preview>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Node } from "@/types";
import NodePreview from "@/components/app/NodePreview/NodePreview.vue";

const props = defineProps<{
  nodes: Node[];
  select: (node: Node) => void;
  unsubscribe: (node: Node) => void;
  loadMore: () => void;
}>();

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

<style lang="scss" src="./SubscribedNodesList.scss" />
