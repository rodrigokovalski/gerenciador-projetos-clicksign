<script setup lang="ts">
withDefaults(
  defineProps<{
    htmlFor?: string;
  }>(),
  {
    htmlFor: undefined,
  },
);
</script>

<template>
  <label
    class="ds-label"
    :for="htmlFor"
    data-testid="ds-label"
  >
    <slot />
  </label>
</template>

<style scoped>
.ds-label {
  display: inline-block;
  margin: 0;
  font-family: inherit;
  font-size: var(--ds-font-size-lg);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-900);
}
</style>
