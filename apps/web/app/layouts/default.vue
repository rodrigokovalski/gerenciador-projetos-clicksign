<template>
  <div class="main">
    <Header />
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f4f2ff;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 60px 42px;

  @media (max-width: 768px) {
    margin: 42px 24px;
  }

  @media (max-width: 480px) {
    margin: 24px 16px;
  }
}
</style>
