# AutoExamen

Aplicación web para practicar exámenes tipo test a partir de dos archivos PDF:
el PDF con las preguntas y el PDF con la plantilla de respuestas.

La aplicación extrae el texto con PDF.js y utiliza OCR con Tesseract.js cuando el PDF está escaneado. Después detecta las preguntas, fusiona sus respuestas correctas y permite realizar el examen y calcular la nota.

## Funciones

- Importación de examen y plantilla de respuestas en PDF.
- OCR para documentos escaneados.
- Corrección automática con penalización configurable.
- Configuración del número de preguntas por página.
- Navegación por páginas y barra de progreso.
- Revisión de respuestas acertadas, falladas y solución correcta.
- Modo claro y modo oscuro.
- Procesamiento local en el navegador: los PDFs no se suben a ningún servidor.

## Cómo usarlo

1. Abre la aplicación y entra en **Importar**.
2. Selecciona el PDF del examen.
3. Selecciona el PDF de la plantilla de respuestas.
4. Pulsa **Preparar examen** y espera a que termine el procesamiento.
5. Entra en **Mi examen** y responde las preguntas.
6. Usa **Siguiente** y **Anterior** para moverte por las páginas.
7. Pulsa **Entregar y corregir** para obtener la nota.
8. Consulta el detalle en **Resultados**.
9. En **Configuración** puedes cambiar la penalización y el número de preguntas por página.
10. Pulsa el icono de luna o sol para cambiar el tema visual.

## Ejecutarlo con Docker

Necesitas tener Docker Desktop instalado y abierto.

Desde la carpeta del proyecto ejecuta:

```bash
docker build -t auto-intentos-examen .
docker run --rm -p 8080:80 auto-intentos-examen
```

Después abre [http://localhost:8080](http://localhost:8080) en el navegador.

Para detenerlo, pulsa `Ctrl+C` si está en primer plano o ejecuta:

```bash
docker ps
docker stop <ID_DEL_CONTENEDOR>
```

## Ejecutarlo sin Docker

Necesitas Node.js 22 o una versión compatible:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente [http://localhost:5173](http://localhost:5173).

Para crear la versión de producción:

```bash
npm run build
npm run preview
```

## Formato esperado

El parser funciona mejor cuando las preguntas siguen un formato similar a:

```text
1. Enunciado de la pregunta
A) Primera opción
B) Segunda opción
C) Tercera opción
D) Cuarta opción
```

Y la plantilla de respuestas contiene entradas como:

```text
1. A
2. C
3. D
```

## Tecnologías

- Vue 3 y Composition API
- Vite
- TypeScript
- Pinia
- Vue Router
- PDF.js
- Tesseract.js
- Docker y Nginx

## Autor y licencia

Desarrollado por Asier. Licencia MIT.
