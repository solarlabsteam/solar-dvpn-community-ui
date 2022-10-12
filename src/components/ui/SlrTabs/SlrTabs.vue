<template>
  <div class="slr-tabs">
    <ul class="slr-tabs__nav" :class="classNav">
      <li
        v-for="(tab, i) in state.tabs"
        :key="tab.props?.title"
        class="slr-tabs__nav-item slr-clickable"
        :class="{
          'slr-tabs__nav-item--active': state.selectedIndex === i,
          'slr-tabs__nav-item--left': i === 0,
          'slr-tabs__nav-item--right': i === state.tabs.length - 1,
        }"
        @click="changeTab(i)"
      >
        {{ tab.props?.title }}
      </li>
    </ul>
    <div class="slr-tabs__content" :class="classContent">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  provide,
  onBeforeMount,
  onBeforeUpdate,
  onMounted,
  useSlots,
  type VNode,
} from "vue";

const props = defineProps<{
  defaultActiveTab: number;
  classContent?: string;
  classNav?: string;
}>();
const emit = defineEmits(["change"]);
const slots = useSlots();

const state = reactive<{ selectedIndex: number; tabs: VNode[]; count: number }>(
  {
    selectedIndex: 0,
    tabs: [],
    count: 0,
  }
);

const selectTab = (i: number) => {
  state.selectedIndex = i;
};

const changeTab = (i: number) => {
  selectTab(i);
  emit("change", i);
};

const filterTabs = () => {
  if (slots.default) {
    state.tabs = slots
      .default()
      .filter((child) => (child.type as { name: string }).name === "SlrTab");
  }
};

provide("TabsProvider", state);
provide("selectTab", selectTab);

onBeforeMount(() => filterTabs());
onBeforeUpdate(() => filterTabs());
onMounted(() => selectTab(props.defaultActiveTab));
</script>

<style lang="scss" src="./SlrTabs.scss" scoped />
