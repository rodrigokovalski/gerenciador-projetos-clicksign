<script setup lang="ts">
import { Button, Paragraph, Select, Title, Toggle } from "@clicksign/design-system";
import { ArrowLeftIcon, PlusCircleIcon } from "@clicksign/icons";
import { joinURL } from "ufo";

type Project = {
  id: number;
  name: string;
  client: string;
  start_date: string;
  end_date: string;
  favorite: boolean;
  image_url?: string | null;
};

type SortKey = "alphabetical" | "start_recent" | "deadline_soon";

const { public: pub } = useRuntimeConfig();
const projectsListUrl = joinURL(String(pub.apiBaseUrl ?? "").replace(/\/$/, ""), "/api/v1/projects");

const { data: projects } = await useFetch<Project[]>(projectsListUrl, {
  default: () => [],
});

const onlyFavorites = ref(false);
const sortBy = ref<SortKey>("alphabetical");
const searchFilter = useState<string>("projects-search-filter", () => "");
const searchDraft = useState<string>("projects-search-query", () => "");

const hasSearchFilter = computed(() => searchFilter.value.trim().length > 0);

function clearSearch() {
  searchFilter.value = "";
  searchDraft.value = "";
}

const displayedProjects = computed(() => {
  let list = [...(projects.value ?? [])];
  if (onlyFavorites.value)
    list = list.filter(p => p.favorite);

  const q = searchFilter.value.trim().toLowerCase();
  if (q) {
    list = list.filter(
      p =>
        p.name.toLowerCase().includes(q)
        || p.client.toLowerCase().includes(q),
    );
  }

  if (sortBy.value === "alphabetical") {
    list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" }));
  }
  else if (sortBy.value === "start_recent") {
    list.sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime(),
    );
  }
  else {
    list.sort(
      (a, b) =>
        new Date(a.end_date).getTime() - new Date(b.end_date).getTime(),
    );
  }
  return list;
});

function removeProject(id: number) {
  const list = projects.value;
  if (!list)
    return;
  projects.value = list.filter(p => p.id !== id);
}

function toggleProjectFavorite(id: number) {
  const list = projects.value;
  if (!list)
    return;
  projects.value = list.map(p =>
    p.id === id ? { ...p, favorite: !p.favorite } : p,
  );
}
</script>

<template>
  <div>
    <div v-if="projects.length" class="header">
      <div v-if="hasSearchFilter" class="header__search-head">
        <button
          type="button"
          class="header__back-search"
          aria-label="Voltar e limpar busca"
          @click="clearSearch"
        >
          <ArrowLeftIcon class="header__back-search-icon" aria-hidden="true" />
          Voltar
        </button>
        <Title as="h2" :color="'var(--ds-primary-800)'">
          Resultados da busca
        </Title>
      </div>
      <Title
        v-else
        as="h2"
        :color="'var(--ds-primary-800)'"
      >
        Projetos
      </Title>
      <div class="header__toolbar">
        <Toggle
          v-model="onlyFavorites"
          label="Apenas favoritos"
        />
        <div class="header__sort">
          <Select
            id="project-sort"
            v-model="sortBy"
            name="project_sort"
          >
            <option value="alphabetical">
              Ordem alfabética
            </option>
            <option value="start_recent">
              Início mais recente
            </option>
            <option value="deadline_soon">
              Prazo mais próximo
            </option>
          </Select>
        </div>
        <NuxtLink to="/add" class="header__new">
          <Button class="button--new-project">
            <PlusCircleIcon />
            Novo projeto
          </Button>
        </NuxtLink>
      </div>
    </div>
    <div v-if="!projects.length" class="card">
      <div class="flex">
        <Title as="h2" :color="'var(--ds-primary-800)'">
          Nenhum projeto
        </Title>
        <Paragraph>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</Paragraph>
        <NuxtLink to="/add">
          <Button class="button--new-project mt-4">
            <PlusCircleIcon />
            Novo projeto
          </Button>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="project-grid">
      <ProjectCard
        v-for="project in displayedProjects"
        :id="project.id"
        :key="project.id"
        :name="project.name"
        :client="project.client"
        :start-date="project.start_date"
        :end-date="project.end_date"
        :favorite="project.favorite"
        :image-url="project.image_url || '/project-card-placeholder.png'"
        @deleted="removeProject(project.id)"
        @updated="toggleProjectFavorite(project.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px;
}

.header__toolbar {
  display: flex;
  align-items: center;
  gap: 32px;

  .button--new-project {
    padding: 9px 32px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
  }
}

.header__search-head {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.header__back-search {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 6px 10px 6px 6px;
  border: 1px solid var(--ds-neutral-400);
  border-radius: var(--ds-radius-4);
  background: var(--ds-neutral-0);
  font-family: inherit;
  font-size: var(--ds-font-size-md);
  font-weight: var(--ds-font-weight-regular);
  line-height: var(--ds-line-height-normal);
  color: var(--ds-neutral-800);
  cursor: pointer;
}

.header__back-search:hover {
  background: var(--ds-neutral-200);
}

.header__back-search:focus-visible {
  outline: 2px solid var(--ds-primary-700);
  outline-offset: 2px;
}

.header__back-search-icon {
  flex-shrink: 0;
  color: var(--ds-neutral-700);
}
.button {
  display: flex;
  align-items: center;
  gap: 8px;
}
.button--new-project {
  font-size: var(--ds-font-size-xl);
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 128px);
  background: white;
  border-radius: var(--ds-radius-4);

  @media (max-width: 768px) {
    height: calc(100vh - 164px);
  }
  @media (max-width: 480px) {
    height: calc(100vh - 128px);
  }
}
.flex {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  padding: 16px;
  text-align: center;
}
.mt-4 {
  margin-top: 16px;
}

.card--muted {
  min-height: 200px;
  height: auto;
  margin-bottom: 24px;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
  gap: 24px;
}
</style>
