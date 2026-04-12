<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: string;
  }>(),
  {
    color: "#717171",
  },
);
</script>

<template>
  <span
    class="ds-span"
    :style="{ color }"
    data-testid="ds-span"
  >
    <slot />
  </span>
</template>

<style scoped>
.ds-span {
  font: inherit;
}
</style>
