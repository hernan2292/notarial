# 📄 Cómo Generar los Entregables en PDF

## 🎯 Archivos Creados

He generado los siguientes documentos en formato Markdown:

1. ✅ **Pitch Deck** → `PITCH.md` (ya existía en la raíz)
2. ✅ **Brainstorming** → `docs/Notarial_Brainstorming.md`
3. ✅ **Business Model Canvas** → `docs/Notarial_Business_Model_Canvas.md`
4. ✅ **Modelo de Datos** → `docs/Notarial_Modelo_Datos.md`

---

## 📝 OPCIÓN 1: Convertir Markdown a PDF (Recomendado)

### Usando Pandoc (Mejor calidad)

#### 1. Instalar Pandoc
```bash
# Windows (con Chocolatey)
choco install pandoc

# O descargar desde: https://pandoc.org/installing.html
```

#### 2. Instalar LaTeX (para mejor formato)
```bash
# Windows
choco install miktex

# O descargar desde: https://miktex.org/download
```

#### 3. Convertir a PDF
```bash
# Pitch Deck
pandoc PITCH.md -o Notarial_Pitch_Deck.pdf --pdf-engine=xelatex -V geometry:margin=1in

# Brainstorming
pandoc docs/Notarial_Brainstorming.md -o Notarial_Brainstorming.pdf --pdf-engine=xelatex -V geometry:margin=1in

# Business Model Canvas
pandoc docs/Notarial_Business_Model_Canvas.md -o Notarial_Business_Model_Canvas.pdf --pdf-engine=xelatex -V geometry:margin=1in

# Modelo de Datos
pandoc docs/Notarial_Modelo_Datos.md -o Notarial_Modelo_Datos.pdf --pdf-engine=xelatex -V geometry:margin=1in
```

#### 4. Con mejor formato (usando template)
```bash
pandoc PITCH.md -o Notarial_Pitch_Deck.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=12pt \
  -V colorlinks=true \
  --toc \
  --highlight-style=tango
```

---

## 📝 OPCIÓN 2: Usando VS Code (Más fácil)

### 1. Instalar Extensión
- Abrir VS Code
- Ir a Extensions (Ctrl+Shift+X)
- Buscar "Markdown PDF"
- Instalar la extensión de yzane

### 2. Convertir
- Abrir el archivo .md
- Presionar Ctrl+Shift+P
- Escribir "Markdown PDF: Export (pdf)"
- Seleccionar la ubicación

### 3. Configuración (opcional)
Crear `.vscode/settings.json`:
```json
{
  "markdown-pdf.format": "A4",
  "markdown-pdf.margin.top": "1cm",
  "markdown-pdf.margin.bottom": "1cm",
  "markdown-pdf.margin.right": "1cm",
  "markdown-pdf.margin.left": "1cm",
  "markdown-pdf.displayHeaderFooter": true,
  "markdown-pdf.headerTemplate": "<div style='font-size:9px; width:100%; text-align:center;'>Notarial - ETHArgentina 2025</div>",
  "markdown-pdf.footerTemplate": "<div style='font-size:9px; width:100%; text-align:center;'><span class='pageNumber'></span> / <span class='totalPages'></span></div>"
}
```

---

## 📝 OPCIÓN 3: Usando Herramientas Online (Sin instalación)

### 1. Markdown to PDF
- Ir a: https://www.markdowntopdf.com/
- Subir el archivo .md
- Descargar el PDF

### 2. Dillinger
- Ir a: https://dillinger.io/
- Pegar el contenido del .md
- Click en "Export as" → "PDF"

### 3. StackEdit
- Ir a: https://stackedit.io/
- Pegar el contenido
- Click en menú → "Export to disk" → "PDF"

---

## 🎨 OPCIÓN 4: Crear Presentación con Reveal.js (Para Pitch Deck)

### 1. Instalar Reveal.js
```bash
npm install -g reveal-md
```

### 2. Convertir PITCH.md a presentación
```bash
reveal-md PITCH.md --theme night --print Notarial_Pitch_Deck.pdf
```

### 3. Ver en navegador (interactivo)
```bash
reveal-md PITCH.md --theme night
```

### 4. Temas disponibles
- `black` (default)
- `white`
- `league`
- `beige`
- `sky`
- `night` (recomendado para Notarial)
- `serif`
- `simple`
- `solarized`

---

## 🎨 OPCIÓN 5: Google Slides / PowerPoint (Para Pitch Deck)

### Convertir Pitch Deck a Slides

#### 1. Usar md2googleslides
```bash
npm install -g md2gslides

md2gslides PITCH.md --title "Notarial - ETHArgentina 2025"
```

#### 2. Manual (Copiar y pegar)
- Abrir Google Slides o PowerPoint
- Crear nueva presentación
- Copiar cada sección del PITCH.md
- Agregar diseño y formato
- Exportar como PDF

---

## 📊 SCRIPT AUTOMÁTICO

He creado un script para convertir todos los documentos:

### convert-to-pdf.sh
```bash
#!/bin/bash

echo "🔄 Convirtiendo documentos a PDF..."

# Crear carpeta de output
mkdir -p pdfs

# Pitch Deck
echo "📄 Convirtiendo Pitch Deck..."
pandoc PITCH.md -o pdfs/Notarial_Pitch_Deck.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V colorlinks=true \
  --toc

# Brainstorming
echo "📄 Convirtiendo Brainstorming..."
pandoc docs/Notarial_Brainstorming.md -o pdfs/Notarial_Brainstorming.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V colorlinks=true

# Business Model Canvas
echo "📄 Convirtiendo Business Model Canvas..."
pandoc docs/Notarial_Business_Model_Canvas.md -o pdfs/Notarial_Business_Model_Canvas.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V colorlinks=true

# Modelo de Datos
echo "📄 Convirtiendo Modelo de Datos..."
pandoc docs/Notarial_Modelo_Datos.md -o pdfs/Notarial_Modelo_Datos.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=1in \
  -V fontsize=10pt \
  -V colorlinks=true

echo "✅ Todos los PDFs generados en la carpeta 'pdfs/'"
ls -lh pdfs/
```

### Ejecutar
```bash
chmod +x convert-to-pdf.sh
./convert-to-pdf.sh
```

---

## 🎨 WIREFRAMES Y MOCKUPS

Para los diseños, tienes varias opciones:

### OPCIÓN A: Generar con IA (Rápido)

Voy a generar mockups visuales usando la herramienta de generación de imágenes.

### OPCIÓN B: Herramientas de Diseño

#### 1. Figma (Recomendado)
- Ir a: https://figma.com
- Crear cuenta gratis
- Usar templates de wireframes
- Exportar como PDF o PNG

#### 2. Excalidraw (Simple y rápido)
- Ir a: https://excalidraw.com
- Dibujar wireframes
- Exportar como PNG

#### 3. Balsamiq (Wireframes profesionales)
- Ir a: https://balsamiq.com
- Trial gratuito
- Exportar como PDF

---

## 📋 CHECKLIST DE ENTREGABLES

### PDFs Requeridos
- [ ] Notarial_Pitch_Deck.pdf
- [ ] Notarial_Brainstorming.pdf
- [ ] Notarial_Business_Model_Canvas.pdf
- [ ] Notarial_Modelo_Datos.pdf
- [ ] Notarial_Wireframes.pdf (o link a Figma)

### Formatos Alternativos
- [ ] Pitch Deck en Google Slides (link)
- [ ] Wireframes en Figma (link)
- [ ] Mockups en PNG/JPG

---

## 🚀 RECOMENDACIÓN FINAL

**Para el Hackathon, te recomiendo:**

1. **Pitch Deck:** Convertir a Google Slides para presentar
   - Más interactivo
   - Fácil de compartir
   - Mejor para demo en vivo

2. **Documentos técnicos:** Convertir a PDF con Pandoc
   - Profesional
   - Fácil de leer
   - Portable

3. **Wireframes:** Generar con IA o usar Figma
   - Visual
   - Impactante
   - Rápido de crear

---

## 💡 PRÓXIMO PASO

¿Quieres que:
1. ✅ Genere los wireframes/mockups con IA?
2. ✅ Cree el script de conversión a PDF?
3. ✅ Convierta el Pitch Deck a formato de presentación?

Dime qué prefieres y lo hago ahora mismo! 🚀
