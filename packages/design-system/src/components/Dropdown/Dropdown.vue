<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);

function toggle() {
  open.value = !open.value;
}
</script>

<template>
  <div class="ds-dropdown" data-testid="ds-dropdown">
    <div
      class="ds-dropdown__header"
      role="button"
      tabindex="0"
      :aria-expanded="open"
      data-testid="ds-dropdown-header"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="header" />
    </div>
    <div
      v-show="open"
      class="ds-dropdown__panel"
      data-testid="ds-dropdown-panel"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ds-dropdown {
  position: relative;
  display: inline-block;
}

.ds-dropdown__header {
  cursor: pointer;
  outline: none;
}

.ds-dropdown__header:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.ds-dropdown__panel {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 100%;
  margin-top: 4px;
  min-width: 100%;
  padding: 8px;
  background: var(--ds-neutral-0);
  border: 1px solid var(--ds-neutral-200);
  border-radius: var(--ds-radius-sm);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.08);
}
</style>
