<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink class="text-decoration-none" to="/">Home</RouterLink>
    <RouterLink class="text-decoration-none" to="/about">About</RouterLink>
    <RouterLink class="text-decoration-none" to="/project">Project</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-01">Exercise-01</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-02">Exercise-02</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-03">Exercise-03</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-04">Exercise-04</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-05">Exercise-05</RouterLink>
    <RouterLink class="text-decoration-none" to="/api">api</RouterLink>
    <RouterLink class="text-decoration-none" to="/Exercise-07">Exercise-07</RouterLink>
    <RouterLink class="text-decoration-none" to="/node">node (sql)</RouterLink>
    <RouterLink class="text-decoration-none" to="/image_generation">Image Generation</RouterLink>
    <RouterLink class="text-decoration-none" to="/mongodb">MongoDB</RouterLink>
    <RouterLink class="text-decoration-none" to="/fileupload">File Upload</RouterLink>
    <RouterLink class="text-decoration-none" to="/awsrevision">aws test</RouterLink>
    <RouterLink class="text-decoration-none" to="/firebase">Firebase</RouterLink>
    <RouterLink class="text-decoration-none" to="/neurallove">Neural.love AI image Generation</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
