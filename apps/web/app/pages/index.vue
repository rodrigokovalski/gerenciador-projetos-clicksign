<script setup lang="ts">
import { Button, Paragraph, Title } from "@clicksign/design-system";
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

const { data: projects } = await useFetch<Project[]>("http://localhost:3001/api/projects", {
  default: () => [],
});
</script>

<template>
  <div>
    <div v-if="projects.length" class="header">
      <Title as="h2" :color="'var(--ds-primary-800)'">
        Projetos ({{ projects.length }})
      </Title>
      <NuxtLink to="/add">
        <Button>
          <PlusCircleIcon />
          Novo projeto
        </Button>
      </NuxtLink>
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
    <div v-else class="project-grid">
      <ProjectCard
        v-for="project in projects"
        :id="project.id"
        :key="project.id"
        :name="project.name"
        :client="project.client"
        :start-date="project.start_date"
        :end-date="project.end_date"
        :favorite="project.favorite"
        :image-url="project.image_url || '/project-card-placeholder.png'"
        @deleted="() => { projects = projects.filter(p => p.id !== project.id) }"
        @updated="() => { projects = projects.map(p => (p.id === project.id ? { ...p, favorite: !p.favorite } : p)) }"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  gap: 16px
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
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(346px, 1fr));
  gap: 24px;
}
</style>
