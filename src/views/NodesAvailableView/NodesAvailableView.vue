<template>
  <slr-view>
    <template #header-nav>
      <slr-button class="r-s17-lh20" :tiny="true" :text="true" @click="back">
        {{ t("action.back") }}
      </slr-button>
    </template>
    <template #header-title>
      {{ `${t("node.list.title")} - ${location}` }}
    </template>
    <template #header-action>
      <slr-button
        class="r-s17-lh20 mnemonic-recover-btn"
        :tiny="true"
        :text="true"
        @click="search"
      >
        {{ t("action.search") }}
      </slr-button>
    </template>
    <template #content>
      <nodes-available
        :continent-code="continentCode"
        :country-code="countryCode"
      />
    </template>
  </slr-view>
</template>

<script setup lang="ts">
import SlrView from "@/components/ui/SlrView/SlrView.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import type { ContinentCode } from "@/types";
import NodesAvailable from "@/views/NodesAvailableView/NodesAvailable/NodesAvailable.vue";
import { computed } from "vue";
import lookupCountry from "country-code-lookup";

const props = defineProps<{
  continentCode?: ContinentCode;
  countryCode?: string;
}>();

const { t } = useI18n();
const router = useRouter();

const continentName = computed(
  () => props.continentCode && t(`continent.${props.continentCode}`)
);
const countryName = computed(
  () => props.countryCode && lookupCountry.byIso(props.countryCode)?.country
);
const location = computed(() => countryName.value || continentName.value);

const back = () => {
  if (!props.countryCode) {
    router.push({ name: "nodes" });
  } else if (props.countryCode) {
    router.push({
      name: "nodes-available",
      query: { continentCode: props.continentCode },
    });
  }
};

const search = async () => {
  await router.push({
    name: "nodes-search",
    query: {
      continentCode: props.continentCode,
      countryCode: props.countryCode,
    },
  });
};
</script>
