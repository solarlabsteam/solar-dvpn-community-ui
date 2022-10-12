<template>
  <slr-modal
    :open="open"
    :loading="loading"
    class="webview-modal"
    @close="$emit('close')"
  >
    <template v-if="title" #header>
      <span class="webview-modal__header">{{ title }}</span>
    </template>

    <template #body>
      <webview
        :id="id"
        ref="webviewRef"
        class="webview-modal__body"
        :class="{
          'd-none': !isWebviewLoaded,
        }"
        :src="url"
      />
      <div v-if="!isWebviewLoaded" class="text-center">
        <slr-loader :size="24" />
      </div>
    </template>

    <template #footer>
      <div />
    </template>
  </slr-modal>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = withDefaults(
  defineProps<{
    id: string;
    url: string;
    title?: string;
    open?: boolean;
    loading?: boolean;
    didStartNavigation?(event: Event | undefined): void;
  }>(),
  {
    title: undefined,
    open: false,
    loading: false,
    didStartNavigation: undefined,
  }
);
defineEmits<{
  (e: "close"): void;
}>();

const webviewRef = ref<Element | null>(null);
const isWebviewLoaded = ref<boolean>(false);

const onLoad = () => {
  isWebviewLoaded.value = true;
};

watchEffect(() => {
  if (!webviewRef.value) return;

  webviewRef.value.addEventListener("did-stop-loading", () => {
    onLoad();
  });

  if (props.didStartNavigation) {
    webviewRef.value.addEventListener(
      "did-start-navigation",
      (event: Event) => {
        props.didStartNavigation(event);
      }
    );
  }
});
</script>

<style lang="scss" scoped>
.webview-modal {
  &__header {
    font-weight: 500;
    color: var(--slr__title-txt-clr);
  }

  &__body {
    width: 100%;
    height: 580px;
    padding: 0;
    -webkit-app-region: no-drag;
  }
}
</style>
