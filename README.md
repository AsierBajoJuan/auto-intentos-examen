# Auto-Intentos-Examen 🧠

Aplicación web desarrollada en **Vue 3 + Vite + Pinia** que permite cargar exámenes en PDF (preguntas y plantilla de respuestas), 
realizar el test en modo interactivo, corregir automáticamente y obtener nota con penalización configurable.

---

## 🚀 Características
- 📄 Carga PDF de examen y respuestas.
- 🤖 OCR opcional (Tesseract.js) para PDFs escaneados.
- 🧩 Parser automático de preguntas y opciones (formato tipo test).
- 🧮 Corrección con penalización (1/3 por fallo).
- 💾 Guardado de resultados en local.
- 🌙 Tema oscuro optimizado para estudio nocturno.
- 📚 Modo examen con 5 preguntas por página.

---

## 🛠️ Instalación

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/auto-intentos-examen.git
cd auto-intentos-examen

# Instalar dependencias
npm install

# Iniciar entorno de desarrollo
npm run dev

Accede en http://localhost:5173
```

## 🧪 Tecnologías

- Vue 3 (Composition API)
- Vite
- Pinia
- pdf.js
- Tesseract.js
- TypeScript


## 📜 Licencia

Este proyecto se distribuye bajo la licencia MIT.
Puedes modificarlo, adaptarlo y usarlo libremente, manteniendo los créditos.



## ✨ Autor

Desarrollado por Asier



## ⚖️ 4️⃣ Licencia recomendada
- ✅ **MIT** → Libre, puedes modificarlo y distribuirlo.  
- Alternativas:
  - **GPLv3** → obliga a mantener código abierto si se redistribuye.
  - **Apache 2.0** → similar a MIT pero con protección legal adicional.

👉 Crea un archivo `LICENSE` en la raíz con el contenido MIT:
```text
MIT License

Copyright (c) 2025 Asier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...