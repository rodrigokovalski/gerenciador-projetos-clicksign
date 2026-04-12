<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "sm" | "md" | "lg";
    color?: string;
    weight?: "normal" | "bold";
  }>(),
  {
    size: "md",
    color: "#717171",
    weight: "normal",
  },
);
</script>

<template>
  <p
    class="ds-paragraph"
    :class="[`ds-paragraph--${size}`, `ds-paragraph--${weight}`]"
    :data-size="size"
    :style="{ color }"
    data-testid="ds-paragraph"
  >
    <slot />
  </p>
</template>

<style scoped>
.ds-paragraph {
  margin: 0;
  line-height: 1.5;
}

.ds-paragraph--sm {
  font-size: 14px;
}

.ds-paragraph--md {
  font-size: 16px;
}

.ds-paragraph--lg {
  font-size: 18px;
}

.ds-paragraph--normal {
  font-weight: 400;
}

.ds-paragraph--bold {
  font-weight: 700;
}

</style>
