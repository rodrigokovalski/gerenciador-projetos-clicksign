<script setup lang="ts">
import { Card, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon } from "@clicksign/icons";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import env from "~/lib/env";
import { projectFormSchema } from "~/lib/zod-schemas";
import type { ProjectType } from "../projects.types";

function toDateInputValue(value: string) {
  if (!value)
    return "";
  return value.slice(0, 10);
}

const route = useRoute();
const projectId = computed(() => String(route.params.id));

const { data: project, error } = await useFetch<ProjectType>(
  () => `${env.API_BASE_URL}/api/v1/projects/${projectId.value}`,
  { key: () => `project-edit-${projectId.value}` },
);

if (error.value || !project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Projeto não encontrado",
  });
}

const validationSchema = toTypedSchema(projectFormSchema);

const p = project.value;

const { handleSubmit, errors, values, setFieldValue, setErrors } = useForm({
  validationSchema,
  initialValues: {
    name: p.name,
    client: p.client,
    start_date: toDateInputValue(p.start_date),
    end_date: toDateInputValue(p.end_date),
    coverImage: [] as File[],
  },
});

const currentCoverDismissed = ref(false);
const objectPreviewUrl = ref<string | null>(null);

watch(
  () => values.coverImage,
  (files) => {
    if (objectPreviewUrl.value) {
      URL.revokeObjectURL(objectPreviewUrl.value);
      objectPreviewUrl.value = null;
    }
    const file = files?.[0];
    if (file) {
      objectPreviewUrl.value = URL.createObjectURL(file);
    }
  },
  { deep: true },
);

onUnmounted(() => {
  if (objectPreviewUrl.value) {
    URL.revokeObjectURL(objectPreviewUrl.value);
  }
});

const coverDisplaySrc = computed(() => {
  if (objectPreviewUrl.value) {
    return objectPreviewUrl.value;
  }
  if (!currentCoverDismissed.value && project.value?.image_url) {
    return project.value.image_url;
  }
  return "";
});

const hasCoverPreview = computed(() => Boolean(coverDisplaySrc.value));

function clearCoverImage() {
  if (values.coverImage?.length) {
    setFieldValue("coverImage", []);
    return;
  }
  if (project.value?.image_url) {
    currentCoverDismissed.value = true;
  }
}

const onSubmit = handleSubmit(async (formValues) => {
  try {
    const formData = new FormData();
    formData.append("project[name]", formValues.name);
    formData.append("project[client]", formValues.client);
    formData.append("project[start_date]", new Date(formValues.start_date).toISOString());
    formData.append("project[end_date]", new Date(formValues.end_date).toISOString());
    if (formValues.coverImage && formValues.coverImage.length > 0) {
      formData.append("project[image]", formValues.coverImage[0] as Blob);
    }
    else if (currentCoverDismissed.value) {
      formData.append("project[remove_image]", "true");
    }
    await $fetch(
      `${env.API_BASE_URL}/api/v1/projects/${projectId.value}`,
      {
        method: "PATCH",
        body: formData,
      },
    );

    await navigateTo("/");
  }
  catch (e: any) {
    setErrors(e.data.errors);
  }
});
</script>

<template>
  <div>
    <div class="header">
      <Span class="link-container">
        <NuxtLink to="/" class="link">
          <ArrowLeftIcon />
          Voltar
        </NuxtLink>
      </Span>
      <Title as="h2" :color="'var(--ds-primary-800)'">
        Editar projeto
      </Title>
    </div>
    <div class="content">
      <Card class="card">
        <ProjectForm
          :errors="errors"
          :cover-image-value="values.coverImage"
          :has-cover-preview="hasCoverPreview"
          :cover-display-src="coverDisplaySrc"
          submit-label="Salvar alterações"
          image-description="Escolha uma imagem .jpg ou .png no seu dispositivo (opcional para manter a atual)"
          @submit="onSubmit"
          @clear-cover="clearCoverImage"
          @update:cover-image="files => setFieldValue('coverImage', files)"
        />
      </Card>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
}
.card {
  padding: 52px;
  background: transparent;
  border-radius: var(--ds-radius-8);

  @media (max-width: 768px) {
    padding: 24px;
  }
}
.link-container {
  width: fit-content;
}
.link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--ds-primary-700);
}
</style>
