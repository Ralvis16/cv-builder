# DevCV 🚀 // Creador de Currículum para Desarrolladores

Una aplicación web moderna, premium e interactiva diseñada para crear currículums técnicos profesionales adaptados al formato estándar de impresión **A4**. Desarrollado especialmente pensando en perfiles técnicos (como estudiantes de DAM/DAW e ingenieros de software) que buscan una presentación limpia, minimalista y de alto impacto visual.

---

## ✨ Características Principales

*   **Edición en Tiempo Real:** Visualiza cómo se va estructurando tu currículum a doble columna a medida que escribes en los formularios.
*   **Temas de Color Premium:** Elige entre 4 esquemas cromáticos modernos y vibrantes con un clic:
    *   💧 **Sapphire** (Azul corporativo premium)
    *   ⚡ **Cyberpunk** (Tonos neón y futuristas)
    *   🌲 **Emerald** (Verde menta sofisticado)
    *   ❤️ **Ruby** (Rojo vino elegante)
*   **Secciones Flexibles y Visibilidad Dinámica:** Activa o desactiva secciones enteras (Sobre mí, Experiencia, Proyectos, Educación, Habilidades o Idiomas) usando cómodos *checkboxes* integrados en las cabeceras del editor.
*   **Optimización de Impresión A4:** Diseñado con márgenes nativos CSS (`@page { margin: 12mm 14mm; }`) y división de bloques inteligente (`break-inside: avoid`), asegurando que la exportación a PDF sea perfecta y aproveche al máximo el espacio de la hoja sin dejar huecos en blanco.
*   **Confirmaciones Seguras y UX Fluida:** El botón de limpiar datos utiliza un modal de confirmación HTML/CSS personalizado, previniendo congelamientos por bloqueadores de pop-ups en previsualizadores integrados.
*   **Persistencia Local Automática:** Guarda el progreso automáticamente en el `localStorage` del navegador para que no pierdas nada al recargar o cerrar la pestaña.
*   **Carga de Ejemplo DAM:** Incluye un botón para cargar datos de prueba reales para un perfil de estudiante de Desarrollo de Aplicaciones Multiplataforma (DAM) junior.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5** semántico y estructurado.
*   **CSS3** responsivo y moderno (Variables nativas, efectos de cristal/glassmorphism, animaciones fluidas, Grid y Flexbox).
*   **JavaScript Vanilla** (Programación modular y defensiva, manipulación reactiva del DOM).
*   **Lucide Icons** para la iconografía interactiva SVG.

---

## 🚀 Cómo Ejecutar el Proyecto en Local

Dado que la aplicación es puramente estática, solo requiere un servidor HTTP básico para funcionar de forma óptima y permitir la persistencia local:

### Opción 1: Servidor rápido con Python
Abre la terminal en la raíz del proyecto y ejecuta:
```bash
python3 -m http.server 8080
```
Luego entra en tu navegador en [http://localhost:8080](http://localhost:8080).

### Opción 2: VS Code - Live Server
Si utilizas Visual Studio Code, puedes instalar la extensión **Live Server** y pulsar el botón **Go Live** situado en la barra inferior.

---

## 📄 Guía de Exportación a PDF / Impresión

Para conseguir el resultado ideal de una página limpia sin cabeceras extrañas del navegador:

1.  Haz clic en el botón **Exportar a PDF** en la esquina superior derecha de la aplicación.
2.  En el cuadro de diálogo de impresión de tu sistema o navegador:
    *   **Destino:** Guardar como PDF / Imprimir en PDF.
    *   **Páginas:** Todo.
    *   **Diseño:** Vertical.
    *   **Tamaño de papel:** A4.
    *   **Márgenes:** Predeterminado (el diseño ya gestiona los márgenes físicos de 12mm x 14mm internamente).
    *   ⚠️ **Opciones adicionales / Configuración avanzada:** Desmarca la opción **"Cabeceras y pies de página"** para evitar que aparezca la fecha, la URL o el título del documento en el PDF.
    *   Activa **"Gráficos de fondo"** si deseas que se exporten correctamente todos los degradados e intensidades de color elegidos.

---

## 📁 Estructura de Archivos

```
cv-builder/
├── index.html        # Estructura del maquetado (Paneles de Editor y Vista Previa)
├── style.css         # Estilos visuales, variables de tema y optimizaciones de impresión
├── script.js        # Lógica de renderizado, inputs dinámicos y localStorage
├── .gitignore        # Exclusión de metadatos de sistema y entornos
└── README.md         # Documentación del proyecto
```
