import type { Pregunta, Opcion } from '@/stores/useTestStore'


export function corregir(
  preguntas: Pregunta[],
  respuestas: Record<string, Opcion | undefined>,
  penalizacion = 0
) {
  let ac = 0, fa = 0, bl = 0
  for (const p of preguntas) {
    const r = respuestas[p.id]
    if (!r) { bl++; continue }
    if (r === p.correcta) ac++
    else fa++
  }
  const nota = Math.max(0, ((ac - penalizacion * fa) / preguntas.length) * 10)
  return { aciertos: ac, fallos: fa, blancos: bl, nota: +nota.toFixed(2) }
}
