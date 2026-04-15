<script setup lang="ts">
import { Header, Search } from "@clicksign/design-system";
import { SearchIcon } from "@clicksign/icons";

const filterTerm = useState<string>("projects-search-filter", () => "");
const searchDraft = useState<string>("projects-search-query", () => "");

const searchOpen = ref(false);
const searchWrapRef = ref<HTMLElement | null>(null);
const lastSyncedLen = ref(0);

watch(searchDraft, (raw) => {
  const t = raw.trim();
  if (t.length < 3) {
    filterTerm.value = "";
    lastSyncedLen.value = 0;
    return;
  }
  const shrunk = t.length < lastSyncedLen.value;
  if (shrunk || t.length % 3 === 0) {
    filterTerm.value = t;
    lastSyncedLen.value = t.length;
  }
});

function onSearchSubmit() {
  const t = searchDraft.value.trim();
  filterTerm.value = t;
  lastSyncedLen.value = t.length;
}

async function openSearch() {
  searchOpen.value = true;
  await nextTick();
  const input = searchWrapRef.value?.querySelector<HTMLInputElement>(
    "[data-testid=\"ds-search-input\"]",
  );
  input?.focus();
}

function onSearchFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (next && searchWrapRef.value?.contains(next))
    return;
  searchOpen.value = false;
}

function blurSearchField() {
  searchWrapRef.value?.querySelector<HTMLInputElement>(
    "[data-testid=\"ds-search-input\"]",
  )?.blur();
}
</script>

<template>
  <Header>
    <div class="app-header" :class="{ 'app-header--search-open': searchOpen }">
      <NuxtImg
        v-if="!searchOpen"
        class="app-header__logo"
        src="logo.png"
        alt="Clicksign"
        width="193"
        height="72"
      />

      <button
        v-if="!searchOpen"
        type="button"
        class="app-header__icon-btn app-header__icon-btn--toggle"
        aria-label="Buscar"
        @click="openSearch"
      >
        <SearchIcon />
      </button>

      <form
        v-else
        ref="searchWrapRef"
        class="app-header__search-full"
        @submit.prevent="onSearchSubmit"
        @focusout="onSearchFocusOut"
        @keydown.escape.prevent="blurSearchField"
      >
        <Search
          v-model="searchDraft"
          placeholder="Buscar projetos…"
          aria-label="Buscar projetos"
        />
      </form>
    </div>
  </Header>
</template>

<style scoped>
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0 12px;
}

.app-header__logo {
  flex-shrink: 0;
}

.app-header__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: var(--ds-radius-4);
  background: transparent;
  color: var(--ds-neutral-0);
  cursor: pointer;
}

.app-header__icon-btn:hover {
  background: rgb(255 255 255 / 0.08);
}

.app-header__icon-btn:focus-visible {
  outline: 2px solid var(--ds-primary-400);
  outline-offset: 2px;
}

.app-header--search-open {
  padding: 0;
}

.app-header__icon-btn--toggle {
  position: absolute;
  top: 50%;
  right: max(12px, env(safe-area-inset-right));
  transform: translateY(-50%);
}

.app-header__search-full {
  position: absolute;
  inset: 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
</style>
