<script setup lang="ts">
import { Card, Span, Title } from "@clicksign/design-system";
import { ArrowLeftIcon } from "@clicksign/icons";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import env from "~/lib/env";
import { projectFormSchema } from "~/lib/zod-schemas";

const { handleSubmit, errors, values, setFieldValue, setErrors } = useForm({
  validationSchema: toTypedSchema(projectFormSchema),
  initialValues: {
    name: "",
    client: "",
    start_date: "",
    end_date: "",
    coverImage: [] as File[],
  },
});

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

const hasCoverPreview = computed(() => Boolean(objectPreviewUrl.value));

const coverDisplaySrc = computed(() => objectPreviewUrl.value ?? "");

function clearCoverImage() {
  setFieldValue("coverImage", []);
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
    await $fetch(`${env.API_BASE_URL}/api/v1/projects`, { method: "POST", body: formData });

    await navigateTo("/");
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        Novo projeto
      </Title>
    </div>
    <div class="content">
      <Card class="card">
        <ProjectForm
          :errors="errors"
          :cover-image-value="values.coverImage"
          :has-cover-preview="hasCoverPreview"
          :cover-display-src="coverDisplaySrc"
          submit-label="Salvar projeto"
          image-description="Escolha uma imagem .jpg ou .png no seu dispositivo"
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
