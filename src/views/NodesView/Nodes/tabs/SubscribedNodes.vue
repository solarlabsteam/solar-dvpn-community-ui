<template>
  <slr-linear-loader v-if="isLoading" class="subscribed-nodes-loader" />
  <subscribed-nodes-list
    v-if="nodes.length"
    :nodes="nodes"
    :select="select"
    :unsubscribe="unsubscribeFromNode"
    :load-more="loadMore"
  />
  <no-data
    v-else-if="!isLoadingFailed && !isLoading && nodes.length === 0"
    :title="t('node.list.noSubscriptions.title')"
    :text="t('node.list.noSubscriptions.text')"
    :action-text="t('node.list.noSubscriptions.action')"
    :action="openAllNodesTab"
  />
  <no-data
    v-if="isLoadingFailed"
    :title="t('node.list.loadingFailure.title')"
    :text="t('node.list.loadingFailure.text')"
    :action-text="t('action.retry')"
    :action="loadSubscribedNodes"
  />
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { useI18n } from "vue-i18n";
import SubscribedNodesList from "@/components/app/SubscribedNodesList/SubscribedNodesList.vue";
import NoData from "@/components/app/NoData";
import SlrLinearLoader from "@/components/ui/SlrLinearLoader";
import type { Node } from "@/types";
import useConnection from "@/hooks/useConnection";
import useAppDialogs from "@/hooks/useAppDialogs";
import useSubscription from "@/hooks/useSubscription";
import useNodes from "@/hooks/useNodes";

const { t } = useI18n();
const { select } = useConnection();
const {
  subscribedNodes: nodes,
  isSubscribedNodesLoading,
  isSubscribedNodesLoadingFailed: isLoadingFailed,
  isMoreSubscribedNodesAvailable,
  loadSubscribedNodes,
  loadMoreSubscribedNodes,
} = useNodes();
const { isUnsubscriptionLoading } = useSubscription();
const { openUnsubscriptionModal } = useAppDialogs();

const selectTab = inject<Function>("selectTab");

const isLoading = computed<boolean>(
  () => isUnsubscriptionLoading.value || isSubscribedNodesLoading.value
);

const unsubscribeFromNode = async (node: Node) => {
  openUnsubscriptionModal(node);
};

const loadMore = () => {
  if (
    isMoreSubscribedNodesAvailable.value &&
    !isSubscribedNodesLoading.value &&
    !isUnsubscriptionLoading.value
  ) {
    loadMoreSubscribedNodes();
  }
};

const openAllNodesTab = () => selectTab && selectTab(1);
</script>

<style lang="scss" scoped>
.subscribed-nodes-loader {
  position: absolute;
  width: 100%;
}
</style>
