<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink class="brand" to="/cargar">
        <span class="brand-mark">✓</span>
        <span>AutoExamen</span>
      </RouterLink>
      <nav class="main-nav" aria-label="Navegación principal">
        <RouterLink to="/cargar">Importar</RouterLink>
        <RouterLink to="/examen">Mi examen</RouterLink>
        <RouterLink to="/resultados">Resultados</RouterLink>
        <RouterLink class="settings-link" to="/configuracion" aria-label="Configuración">⚙</RouterLink>
        <button class="theme-toggle" type="button" :aria-label="store.config.modoOscuro ? 'Activar modo claro' : 'Activar modo oscuro'" @click="store.config.modoOscuro = !store.config.modoOscuro">
          {{ store.config.modoOscuro ? '☀' : '☾' }}
        </button>
      </nav>
    </header>
    <main class="page-container"><RouterView /></main>
    <footer class="footer">Estudia a tu ritmo · Tus documentos permanecen en tu navegador</footer>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useTestStore } from '@/stores/useTestStore'

const store = useTestStore()

watch(() => store.config.modoOscuro, (enabled) => {
  document.documentElement.dataset.theme = enabled ? 'dark' : 'light'
  localStorage.setItem('autoexamen-dark-mode', String(enabled))
}, { immediate: true })
</script>
