<template>
  <header class="ds-header" data-testid="ds-header">
    <slot />
  </header>
</template>

<style scoped>
.ds-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #1C1930;
  border-bottom: 1px solid #000;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}
</style>
