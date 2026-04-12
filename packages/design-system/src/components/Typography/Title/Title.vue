<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "h1" | "h2" | "h3" | "h4";
    color?: string;
  }>(),
  {
    as: "h1",
  },
);
</script>

<template>
  <component
    :is="as"
    class="ds-title"
    :class="[`ds-title--${as}`]"
    :data-as="as"
    :style="color ? { color } : undefined"
    data-testid="ds-title"
  >
    <slot />
  </component>
</template>

<style scoped>
.ds-title {
  margin: 0;
  font-weight: var(--ds-font-weight-semibold);
  line-height: var(--ds-line-height-tight);
  color: var(--ds-neutral-500);
  font-family: inherit;
}

.ds-title--h1 {
  font-size: var(--ds-font-size-3xl);
}

.ds-title--h2 {
  font-size: var(--ds-font-size-2xl);
}

.ds-title--h3 {
  font-size: var(--ds-font-size-xl);
}

.ds-title--h4 {
  font-size: var(--ds-font-size-lg);
}
</style>
