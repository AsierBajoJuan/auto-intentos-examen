<template>
  <h1>Resultados</h1>
  <div v-if="store.resultado" class="card">
    <p><b>Aciertos:</b> {{ store.resultado.aciertos }}</p>
    <p><b>Fallos:</b> {{ store.resultado.fallos }} <small>(penalización {{ store.config.penalizacion }})</small></p>
    <p><b>Blancos:</b> {{ store.resultado.blancos }}</p>
    <hr/>
    <p style="font-size:1.25rem;"><b>Nota final:</b> {{ store.resultado.nota }}</p>
    <div style="display:flex; gap:12px; margin-top:8px;">
      <RouterLink to="/examen"><button>Revisar respuestas</button></RouterLink>
      <button @click="store.reset()">Reiniciar intento</button>
    </div>
  </div>
  <div v-else class="card">Aún no has corregido este intento. Ve a <RouterLink to="/examen">Examen</RouterLink>.</div>
</template>

<script setup lang="ts">
import { useTestStore } from '@/stores/useTestStore'
const store = useTestStore()
</script>
