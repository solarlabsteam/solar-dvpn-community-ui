<template>
  <div class="check-mnemonic">
    <div class="check-mnemonic__info">
      <slr-secure-blur class="check-mnemonic__blur">
        <ol class="check-mnemonic__phrase">
          <li v-for="word in words" :key="word" class="pl-2 my-1">
            {{ word }}
          </li>
        </ol>
      </slr-secure-blur>

      <div class="check-mnemonic__data">
        <p class="check-mnemonic__title">
          {{ t("setup.mnemonic.check.title") }}
        </p>

        <p class="check-mnemonic__text mb-5">
          <span>{{ t("setup.mnemonic.check.text") }}</span>
        </p>
      </div>
    </div>

    <div>
      <p v-if="!isTimeOver" class="mb-3">
        {{ t("setup.mnemonic.check.timerTitle") }}
      </p>

      <slr-timer
        :time="30 * 1000"
        @done="onTimeIsOver"
        class="check-mnemonic__timer"
      >
        <template #zhdun>
          <slr-button
            :block="true"
            :variant="'primary'"
            :light="true"
            :large="true"
            :loading="isWalletLoading"
            @click="confirm"
          >
            {{ t("setup.mnemonic.action.confirmCheck") }}
          </slr-button>
        </template>
      </slr-timer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import useWallet from "@/hooks/useWallet";
import useAppRouter from "@/hooks/useAppRouter";
import useAppSettings from "@/hooks/useAppSettings";

const props = defineProps<{
  mnemonic: string;
}>();

const { t } = useI18n();
const { isWalletLoading, recover } = useWallet();
const { openSetupCompleteView } = useAppRouter();
const { login } = useAppSettings();

const isTimeOver = ref<boolean>(false);

const words = computed<string[]>(() => props.mnemonic.split(" "));

const onTimeIsOver = () => {
  isTimeOver.value = true;
};

const confirm = (): void => {
  recover(props.mnemonic).then(login).then(openSetupCompleteView);
};
</script>

<style lang="scss" src="./CheckMnemonic.scss" />
