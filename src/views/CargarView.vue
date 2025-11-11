<template>
  <h1>Importar Examen y Respuestas (PDF)</h1>

  <div class="controls">
    <label class="badge">Examen</label>
    <input type="file" accept="application/pdf" @change="onExam" />
    <span>{{ examFile?.name }}</span>

    <label class="badge">Respuestas</label>
    <input type="file" accept="application/pdf" @change="onAns" />
    <span>{{ ansFile?.name }}</span>

    <button @click="procesar" :disabled="loading">
      {{ loading ? 'Procesando…' : 'Fusionar y Guardar' }}
    </button>
  </div>

  <div class="log" v-if="msg">LOG: {{ msg }}</div>

  <div class="card" v-if="debug">
    <p><b>Longitud txtEx:</b> {{ debug.txtExLen }}</p>
    <p><b>Longitud txtCl:</b> {{ debug.txtClLen }}</p>
    <p><b>Preguntas detectadas:</b> {{ debug.numPregs }}</p>
    <p><b>Con clave:</b> {{ debug.numConClave }}</p>
  </div>

  <div v-if="store.banco.length">
    <div class="badge">{{ store.banco.length }} preguntas cargadas</div>
    <RouterLink to="/examen" style="margin-left:12px;">Ir al examen →</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pdfToText } from '@/utils/pdf'
import { parseExamen, parseClave, fusionar } from '@/utils/parse'
import { useTestStore } from '@/stores/useTestStore'

const store = useTestStore()
const examFile = ref<File>()
const ansFile = ref<File>()
const loading = ref(false)
const msg = ref('')
const debug = ref<{txtExLen:number; txtClLen:number; numPregs:number; numConClave:number} | null>(null)

function onExam(e: Event) { examFile.value = (e.target as HTMLInputElement).files?.[0] ?? undefined }
function onAns(e: Event) { ansFile.value = (e.target as HTMLInputElement).files?.[0] ?? undefined }

async function procesar() {
  msg.value = ''
  debug.value = null
  if (!examFile.value || !ansFile.value) { msg.value = 'Selecciona ambos PDFs.'; return }
  loading.value = true
  try {
    const [txtEx, txtCl] = await Promise.all([ pdfToText(examFile.value), pdfToText(ansFile.value) ])
    const preguntas = parseExamen(txtEx)
    const clave = parseClave(txtCl)
    const banco = fusionar(preguntas, clave).filter(p => p.correcta)

    debug.value = { txtExLen: txtEx.length, txtClLen: txtCl.length, numPregs: preguntas.length, numConClave: banco.length }
    store.setBanco(banco)
    msg.value = `Fusionado: preguntas=${preguntas.length}, conClave=${banco.length}.`
  } catch (e:any) {
    msg.value = `Error: ${e?.message ?? e}`
    console.error(e)
  } finally { loading.value = false }
}
</script>
