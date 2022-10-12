<template>
  <div v-if="$slots['zhdun']">
    <slot v-if="isTimeLeft" name="zhdun" />
    <span v-else>{{ timeLeft }}</span>
  </div>

  <span v-else>{{ timeLeft }}</span>
</template>

<script setup lang="ts">
import Timer from "tiny-timer";
import format from "date-fns/format";
import { onMounted, onBeforeUnmount, ref } from "vue";

const props = defineProps<{
  time: number;
}>();

const emit = defineEmits<{
  (e: "done"): void;
}>();

const timer = new Timer();
const timeLeft = ref<string>("00:00");
const isTimeLeft = ref<boolean>(false);

onMounted(() => {
  timer.on("tick", (ms) => {
    timeLeft.value = format(ms, "mm:ss");
  });
  timer.on("done", () => {
    timeLeft.value = "00:00";
    isTimeLeft.value = true;
    emit("done");
  });

  timer.start(props.time);
});

onBeforeUnmount(() => {
  timer.stop();
});
</script>
