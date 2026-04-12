<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: "h1" | "h2" | "h3" | "h4";
    color?: string;
  }>(),
  {
    as: "h1",
    color: "#717171",
  },
);
</script>

<template>
  <component
    :is="as"
    class="ds-title"
    :class="[`ds-title--${as}`]"
    :data-as="as"
    :style="{ color }"
    data-testid="ds-title"
  >
    <slot />
  </component>
</template>

<style scoped>
.ds-title {
  margin: 0;
  font-weight: 600;
  line-height: 1.25;
}

.ds-title--h1 {
  font-size: 32px;
}

.ds-title--h2 {
  font-size: 24px;
}

.ds-title--h3 {
  font-size: 20px;
}

.ds-title--h4 {
  font-size: 18px;
}
</style>
