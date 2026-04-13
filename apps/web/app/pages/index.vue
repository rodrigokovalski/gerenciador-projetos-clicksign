<script setup lang="ts">
import { Button, Paragraph, Select, Title, Toggle } from "@clicksign/design-system";
import { PlusCircleIcon } from "@clicksign/icons";

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

const { data: projects } = await useFetch<Project[]>("http://localhost:3001/api/projects", {
  default: () => [],
});

const onlyFavorites = ref(false);
const sortBy = ref<SortKey>("alphabetical");

const displayedProjects = computed(() => {
  let list = [...(projects.value ?? [])];
  if (onlyFavorites.value)
    list = list.filter(p => p.favorite);

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
      <Title as="h2" :color="'var(--ds-primary-800)'">
        Projetos ({{ displayedProjects.length
        }}<template v-if="onlyFavorites && displayedProjects.length !== projects.length">
          de {{ projects.length }}
        </template>)
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
          <Button>
            <PlusCircleIcon />
            Novo projeto
          </Button>
        </NuxtLink>
      </div>
    </div>
    <div v-if="!projects.length" class="card">
      <div class="flex">
        <Title as="h4" :color="'var(--ds-primary-800)'">
          Nenhum projeto
        </Title>
        <Paragraph>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</Paragraph>
        <NuxtLink to="/add">
          <Button class="mt-4">
            <PlusCircleIcon />
            Novo projeto
          </Button>
        </NuxtLink>
      </div>
    </div>
    <div
      v-else-if="!displayedProjects.length"
      class="card card--muted"
    >
      <div class="flex">
        <Title as="h4" :color="'var(--ds-primary-800)'">
          Nenhum projeto nesta visualização
        </Title>
        <Paragraph>
          Desligue “Apenas favoritos” ou favorite um projeto para vê-lo aqui.
        </Paragraph>
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
  gap: 16px;
}

.header__sort {
  min-width: min(100%, 220px);
  max-width: 280px;
}

.header__new {
  flex-shrink: 0;
}
.button {
  display: flex;
  align-items: center;
  gap: 8px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
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
  grid-template-columns: repeat(auto-fill, minmax(346px, 1fr));
  gap: 24px;
}
</style>
