<template>
  <div class="account-settings">
    <div>
      <settings-section class="mb-5">
        <template #content>
          <div class="d-flex align-items-center mb-3">
            <qr-code v-if="address" class="mr-4" :value="address" :size="85" />
            <div class="account-settings__body-wallet">
              <div class="d-flex w-100">
                <div class="w-100">
                  <p class="m-s14-lh17 mb-3 text-black">
                    {{ t("account.wallet") }}
                  </p>
                  <slr-clipboard-text class="" :text="address">
                    <div>
                      <p class="r-s13-lh16">
                        {{ t("account.address") }}
                      </p>
                      <p class="m-s13-lh16 text-black">{{ croppedAddress }}</p>
                    </div>
                  </slr-clipboard-text>
                </div>
              </div>
            </div>
          </div>
        </template>
      </settings-section>
      <settings-section :title="t('account.balance')">
        <template #content>
          <div class="account-settings__balance">
            {{ balance }}
            <slr-icon
              class="slr-clickable"
              :icon="'refresh'"
              :size="22"
              @click="get"
            />
          </div>
        </template>
        <template #buttons>
          <slr-button
            class="text-uppercase"
            :large="true"
            :block="true"
            :variant="'primary'"
            @click="openPurchaseModal"
          >
            {{ t("account.buyTokens") }}
          </slr-button>
        </template>
      </settings-section>
    </div>
    <settings-section
      class="mt-5"
      :title="t('account.logout.title')"
      :subtitle="t('account.logout.text')"
    >
      <template #buttons>
        <logout-btn />
      </template>
    </settings-section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import QrCode from "@/components/app/QrCode";
import SlrClipboardText from "@/components/ui/SlrClipboardText";
import LogoutBtn from "@/components/app/LogoutBtn";
import SettingsSection from "@/components/app/SettingsSection";
import SlrButton from "@/components/ui/SlrButton/SlrButton.vue";
import useWallet from "@/hooks/useWallet";
import useAppDialogs from "@/hooks/useAppDialogs";

const { t } = useI18n();
const { wallet, get } = useWallet();
const { openPurchaseModal } = useAppDialogs();

const balance = computed<string | undefined>(
  () => wallet.value && `${wallet.value.balance / 1e6} ${t("node.dvpn")}`
);
const address = computed<string | undefined>(() => wallet.value?.address);
const croppedAddress = computed<string | undefined>(
  () =>
    address.value &&
    `${address.value.slice(0, 9)}...${address.value.slice(-10)}`
);
</script>

<style lang="scss" scoped>
.account-settings {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 25px 16px 16px;
  border-top: 1px solid var(--slr__border-clr);
  overflow-x: auto;

  &__body-wallet {
    width: 100%;
  }

  &__balance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--slr__account-balanc-clr);
    @include font-template(43px, 51px);
  }
}
</style>
