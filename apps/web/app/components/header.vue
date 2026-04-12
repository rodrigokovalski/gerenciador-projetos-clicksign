<script setup lang="ts">
import { Header } from "@clicksign/design-system";
</script>

<template>
  <Header class="flex">
    <NuxtImg
      src="logo.png"
      alt="Clicksign"
      width="193"
      height="72"
    />
  </Header>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
