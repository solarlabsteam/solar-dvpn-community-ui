<template>
  <div class="setup-mnemonic">
    <div class="setup-mnemonic__info">
      <p class="setup-mnemonic__title">
        {{ t("setup.mnemonic.create.title") }}
      </p>
      <p class="setup-mnemonic__text mb-5">
        {{ t("setup.mnemonic.create.text") }}
      </p>
    </div>

    <div class="setup-mnemonic__buttons">
      <slr-button
        class="mb-3"
        :block="true"
        :variant="'primary'"
        :light="true"
        :large="true"
        :loading="isWalletLoading"
        :disabled="isWalletLoading"
        @click="onCreate"
      >
        {{ t("setup.mnemonic.action.create") }}
      </slr-button>

      <p class="text-uppercase mb-4">
        {{ t("account.or") }}
      </p>

      <slr-button
        :block="true"
        :variant="'secondary'"
        :light="true"
        :large="true"
        :disabled="isWalletLoading"
        :to="{ name: 'recover-mnemonic' }"
      >
        {{ t("setup.mnemonic.action.recover") }}
      </slr-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import useWallet from "@/hooks/useWallet";
import router from "@/router";
import useError from "@/hooks/useError";

const { t } = useI18n();
const { isWalletLoading, create } = useWallet();
const { setError } = useError();

const onCreate = () => {
  create()
    .then((wallet) =>
      router.push({
        name: "check-mnemonic",
        params: { mnemonic: wallet?.mnemonic },
      })
    )
    .catch((e) => setError(JSON.stringify(e)));
};
</script>

<style lang="scss" src="./SetupMnemonic.scss" />
