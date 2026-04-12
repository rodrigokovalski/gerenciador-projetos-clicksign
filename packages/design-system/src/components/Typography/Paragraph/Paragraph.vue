<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    color?: string;
    weight?: "normal" | "bold";
  }>(),
  {
    size: "md",
    weight: "normal",
    color: undefined,
  },
);
</script>

<template>
  <p
    class="ds-paragraph"
    :class="[`ds-paragraph--${size}`, `ds-paragraph--${weight}`]"
    :data-size="size"
    :style="color ? { color } : undefined"
    data-testid="ds-paragraph"
  >
    <slot />
  </p>
</template>

<style scoped>
.ds-paragraph {
  margin: 0;
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-500);
  font-family: inherit;
}

.ds-paragraph--sm {
  font-size: var(--ds-font-size-sm);
}

.ds-paragraph--md {
  font-size: var(--ds-font-size-md);
}

.ds-paragraph--lg {
  font-size: var(--ds-font-size-lg);
}

.ds-paragraph--normal {
  font-weight: var(--ds-font-weight-regular);
}

.ds-paragraph--bold {
  font-weight: var(--ds-font-weight-bold);
}

</style>
