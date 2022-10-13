<template>
  <slr-view>
    <template #header-nav>
      <slr-button class="r-s17-lh20" :tiny="true" :text="true" @click="back">
        {{ t("action.back") }}
      </slr-button>
    </template>
    <template #header-title>Recover with mnemonic</template>
    <template #header-action>
      <slr-button
        class="r-s17-lh20 mnemonic-recover-btn"
        :tiny="true"
        :text="true"
        @click="done"
        :disabled="continueDisabled"
      >
        {{ t("action.done") }}
      </slr-button>
    </template>
    <template #content>
      <recover-mnemonic
        :words="words"
        :words-number="24"
        @update:model-value="onWordsUpdate"
      />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SlrView from "@/components/ui/SlrView/SlrView.vue";
import RecoverMnemonic from "@/views/SetupMnemonicRecoverView/RecoverMnemonic/RecoverMnemonic.vue";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import useWallet from "@/hooks/useWallet";
import useError from "@/hooks/useError";
import useAppRouter from "@/hooks/useAppRouter";
import useAppSettings from "@/hooks/useAppSettings";

const { t } = useI18n();
const { login } = useAppSettings();
const { openSetupCompleteView, openSetupActionsView } = useAppRouter();
const { isWalletLoading, recover } = useWallet();
const { setError } = useError();

const words = ref<string[]>([]);

const continueDisabled = computed<boolean>(
  () =>
    words.value.length < 24 ||
    words.value.some((word) => !word) ||
    isWalletLoading.value
);

const back = () => {
  openSetupActionsView();
};

const onWordsUpdate = (value: string, index: number) => {
  const newWords = [...words.value];
  newWords[index] = value;
  words.value = newWords;
};

const done = () => {
  const mnemonic = words.value.map((i) => i.trim()).join(" ");
  recover(mnemonic)
    .then(login)
    .then(openSetupCompleteView)
    .catch((e) => setError(JSON.stringify(e)));
};
</script>

<style lang="scss" scoped>
.mnemonic-recover-btn:disabled {
  color: var(--slr__txt-clr);
}
</style>
