<template>
  <div class="recover-mnemonic">
    <div class="recover-mnemonic__fields">
      <div class="recover-mnemonic__field" v-for="n in wordsNumber" :key="n">
        <div class="recover-mnemonic__field-pretend">{{ n }}</div>
        <slr-input
          type="text"
          :wrapper-class-name="'recover-mnemonic__field-input'"
          :model-value="words[n - 1]"
          @paste="paste"
          @update:model-value="(str) => onWordsUpdate(str, n - 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SlrInput from "@/components/ui/SlrInput/SlrInput.vue";
import debounce from "lodash.debounce";

defineProps<{
  words: string[];
  wordsNumber: number;
}>();

const emit = defineEmits<{
  (e: "update:model-value", v: string, i: number): void;
}>();

const onWordsUpdate = (value: string, index: number) => {
  debounce(emit("update:model-value", value, index));
};

const paste = (e: ClipboardEvent) => {
  e.preventDefault();

  const text = (e.clipboardData?.getData("text") as string) || "";
  text.split(" ").map((word, index) => emit("update:model-value", word, index));
};
</script>

<style lang="scss">
.recover-mnemonic {
  padding: 0 16px 16px;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  box-sizing: border-box;

  &__fields {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }

  &__field {
    display: flex;
    align-items: center;
  }

  &__field-pretend {
    padding: 11px;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    background-color: var(--slr__border-clr);
    width: 35px;
    height: 100%;
    box-sizing: border-box;
  }

  &__field-input {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    width: 100%;
  }
}
</style>
