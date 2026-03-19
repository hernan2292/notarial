#!/bin/bash

# ============================================
# Script de Conversión a PDF - Notarial
# ETHArgentina 2025
# ============================================

echo "🏠 Notarial - Conversión de Documentos a PDF"
echo "============================================="
echo ""

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que pandoc esté instalado
if ! command -v pandoc &> /dev/null; then
    echo -e "${RED}❌ Error: Pandoc no está instalado${NC}"
    echo ""
    echo "Por favor instala Pandoc:"
    echo "  Windows: choco install pandoc"
    echo "  Mac: brew install pandoc"
    echo "  Linux: sudo apt-get install pandoc"
    echo ""
    echo "O descarga desde: https://pandoc.org/installing.html"
    exit 1
fi

echo -e "${GREEN}✅ Pandoc encontrado: $(pandoc --version | head -n 1)${NC}"
echo ""

# Crear carpeta de output
mkdir -p pdfs
echo -e "${BLUE}📁 Carpeta 'pdfs/' creada${NC}"
echo ""

# Configuración de Pandoc
PANDOC_OPTS="--pdf-engine=xelatex -V geometry:margin=1in -V fontsize=11pt -V colorlinks=true"

# ============================================
# 1. Pitch Deck
# ============================================
echo -e "${BLUE}📄 Convirtiendo Pitch Deck...${NC}"
if [ -f "PITCH.md" ]; then
    pandoc PITCH.md -o pdfs/Notarial_Pitch_Deck.pdf \
        $PANDOC_OPTS \
        --toc \
        --metadata title="Notarial - Pitch Deck" \
        --metadata subtitle="ETHArgentina 2025" \
        --metadata author="Hernán" \
        --metadata date="$(date +%Y-%m-%d)"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Pitch Deck generado${NC}"
    else
        echo -e "${RED}  ❌ Error al generar Pitch Deck${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  PITCH.md no encontrado${NC}"
fi
echo ""

# ============================================
# 2. Brainstorming
# ============================================
echo -e "${BLUE}📄 Convirtiendo Brainstorming...${NC}"
if [ -f "docs/Notarial_Brainstorming.md" ]; then
    pandoc docs/Notarial_Brainstorming.md -o pdfs/Notarial_Brainstorming.pdf \
        $PANDOC_OPTS \
        --metadata title="Notarial - Brainstorming" \
        --metadata subtitle="Sesión de Ideación" \
        --metadata author="Hernán" \
        --metadata date="$(date +%Y-%m-%d)"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Brainstorming generado${NC}"
    else
        echo -e "${RED}  ❌ Error al generar Brainstorming${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  Notarial_Brainstorming.md no encontrado${NC}"
fi
echo ""

# ============================================
# 3. Business Model Canvas
# ============================================
echo -e "${BLUE}📄 Convirtiendo Business Model Canvas...${NC}"
if [ -f "docs/Notarial_Business_Model_Canvas.md" ]; then
    pandoc docs/Notarial_Business_Model_Canvas.md -o pdfs/Notarial_Business_Model_Canvas.pdf \
        $PANDOC_OPTS \
        --metadata title="Notarial - Business Model Canvas" \
        --metadata subtitle="Modelo de Negocio" \
        --metadata author="Hernán" \
        --metadata date="$(date +%Y-%m-%d)"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Business Model Canvas generado${NC}"
    else
        echo -e "${RED}  ❌ Error al generar Business Model Canvas${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  Notarial_Business_Model_Canvas.md no encontrado${NC}"
fi
echo ""

# ============================================
# 4. Modelo de Datos
# ============================================
echo -e "${BLUE}📄 Convirtiendo Modelo de Datos...${NC}"
if [ -f "docs/Notarial_Modelo_Datos.md" ]; then
    pandoc docs/Notarial_Modelo_Datos.md -o pdfs/Notarial_Modelo_Datos.pdf \
        $PANDOC_OPTS \
        -V fontsize=10pt \
        --metadata title="Notarial - Modelo de Datos" \
        --metadata subtitle="Arquitectura de Datos" \
        --metadata author="Hernán" \
        --metadata date="$(date +%Y-%m-%d)"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Modelo de Datos generado${NC}"
    else
        echo -e "${RED}  ❌ Error al generar Modelo de Datos${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  Notarial_Modelo_Datos.md no encontrado${NC}"
fi
echo ""

# ============================================
# 5. Diseño y Wireframes
# ============================================
echo -e "${BLUE}📄 Convirtiendo Diseño y Wireframes...${NC}"
if [ -f "docs/Notarial_Diseno_Wireframes.md" ]; then
    pandoc docs/Notarial_Diseno_Wireframes.md -o pdfs/Notarial_Diseno_Wireframes.pdf \
        $PANDOC_OPTS \
        --metadata title="Notarial - Diseño y Wireframes" \
        --metadata subtitle="UI/UX Design System" \
        --metadata author="Hernán" \
        --metadata date="$(date +%Y-%m-%d)"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}  ✅ Diseño y Wireframes generado${NC}"
    else
        echo -e "${RED}  ❌ Error al generar Diseño y Wireframes${NC}"
    fi
else
    echo -e "${YELLOW}  ⚠️  Notarial_Diseno_Wireframes.md no encontrado${NC}"
fi
echo ""

# ============================================
# Resumen
# ============================================
echo "============================================="
echo -e "${GREEN}🎉 Conversión Completada${NC}"
echo "============================================="
echo ""
echo "PDFs generados en la carpeta 'pdfs/':"
echo ""

# Listar archivos generados
if [ -d "pdfs" ]; then
    ls -lh pdfs/*.pdf 2>/dev/null | awk '{print "  📄 " $9 " (" $5 ")"}'
    echo ""
    
    # Contar archivos
    count=$(ls -1 pdfs/*.pdf 2>/dev/null | wc -l)
    echo -e "${GREEN}Total: $count PDFs generados${NC}"
else
    echo -e "${RED}No se generaron PDFs${NC}"
fi

echo ""
echo "============================================="
echo "Próximos pasos:"
echo "  1. Revisar los PDFs en la carpeta 'pdfs/'"
echo "  2. Verificar que todo se vea bien"
echo "  3. Compartir con el equipo o jurado"
echo "============================================="
echo ""
