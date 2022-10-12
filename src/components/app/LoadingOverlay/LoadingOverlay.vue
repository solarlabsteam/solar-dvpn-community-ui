<template>
  <div class="loading-overlay">
    <slr-loader :size="20" />
  </div>
</template>

<style lang="scss" src="./LoadingOverlay.scss" scoped />
<script>
import SlrLoader from "@/components/ui/SlrLoader";
export default {
  components: { SlrLoader },
};
</script>
