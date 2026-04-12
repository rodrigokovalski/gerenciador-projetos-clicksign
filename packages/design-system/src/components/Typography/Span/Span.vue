<script setup lang="ts">
defineProps<{
  color?: string;
}>();
</script>

<template>
  <span
    class="ds-span"
    :style="color ? { color } : undefined"
    data-testid="ds-span"
  >
    <slot />
  </span>
</template>

<style scoped>
.ds-span {
  font: inherit;
  color: var(--ds-neutral-500);
}
</style>
