# IGCSE Study App

Una aplicación web progresiva (PWA) interactiva de estudio desarrollada con React, TypeScript y Tailwind CSS, diseñada para el aprendizaje de conceptos clave de Tecnologías de la Información y la Comunicación (TIC/ICT) a través de recursos multimedia (audio, video, PDF e infografías) y el seguimiento automático del progreso del usuario.

## 🚀 Características Clave

1. **Aprendizaje Multi-Formato**: Cada uno de los 10 capítulos incluye:
   - **Infografía Interactiva**: Imagen `.jpg` detallada con controles de zoom (rueda de mouse o botones `+` / `-`) y arrastre (*drag-and-pan*).
   - **Contenido de Audio**: Reproductor de audio HTML5 local (`.mp3`).
   - **Contenido de Video**: Soporte para videos embebidos de YouTube y videos locales.
   - **Lectura en PDF**: Visor PDF integrado desarrollado con la biblioteca `PDF.js`, que permite paginación (Next/Previous) y descarga directa.
2. **Seguimiento del Progreso del Usuario**:
   - Guarda automáticamente en `localStorage` el estado de completado, el progreso del audio, el progreso del video y la última fecha de acceso para cada capítulo.
   - Cuenta con una pantalla principal que resume la cantidad de capítulos completados y muestra el progreso individual de cada uno.
3. **Soporte PWA (Progressive Web App)**:
   - Configurado con `vite-plugin-pwa` para registrar un Service Worker que inyecta estrategias de almacenamiento en caché fuera de línea (`CacheFirst`) para assets estáticos, la biblioteca externa `PDF.js` y recursos de audio/video.
4. **Diseño Moderno y Adaptable**:
   - Estilizado con Tailwind CSS, compatible con layouts responsivos (móvil, tablet, escritorio) y optimizado con transiciones suaves y efectos de hover.
   - Cuenta con un ecosistema completo de componentes Shadcn UI listos para usar.

---

## 🛠️ Tecnologías y Librerías

- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [React Router DOM v6](https://reactrouter.com/) (para navegación de rutas).
- **Estilos y UI**: [Tailwind CSS v3](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Shadcn UI](https://ui.shadcn.com/) (diseño de componentes consistente y accesible), [Lucide React](https://lucide.dev/) (iconos).
- **Herramienta de Construcción**: [Vite v8](https://vite.dev/) y `@vitejs/plugin-react-swc`.
- **Gestión de Estado y Peticiones**: [React Query (TanStack Query) v5](https://tanstack.com/query/latest) y hooks personalizados de React.
- **Visor PDF**: [PDF.js](https://mozilla.github.io/pdf.js/) cargado a través de CDN de Cloudflare con almacenamiento en caché persistente.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```text
graceful-beaver-scurry/
├── public/                     # Recursos estáticos servidos directamente
│   ├── icons/                  # Iconos de la aplicación PWA
│   ├── jpgs/                   # Infografías de cada capítulo (ch01.jpg - ch10.jpg)
│   ├── media/                  # Archivos de audio mp3 para cada capítulo (ch01.mp3 - ch10.mp3)
│   ├── pdfs/                   # Documentos PDF de estudio (ch01.pdf - ch10.pdf)
│   ├── manifest.json           # Manifiesto de la aplicación PWA
│   └── placeholder.svg         # SVG de marcador de posición genérico
│
├── src/                        # Código fuente de la aplicación
│   ├── components/             # Componentes principales del sistema
│   │   ├── ui/                 # Componentes genéricos de Shadcn UI (Card, Progress, Button, etc.)
│   │   ├── Chapter.tsx         # Vista detallada de un capítulo individual
│   │   ├── ChapterCard.tsx     # Tarjeta de capítulo con barra de progreso en la página de inicio
│   │   ├── InfographicViewer.tsx # Visor interactivo de infografías (Zoom y Arrastre)
│   │   ├── MediaPlayer.tsx     # Reproductor multimedia de audio y video
│   │   ├── PDFViewer.tsx       # Visor de archivos PDF usando canvas de PDF.js
│   │   └── made-with-dyad.tsx  # Créditos de la plataforma Dyad
│   │
│   ├── data/                   # Datos locales y tipos TypeScript
│   │   ├── chapters.ts         # Definición de los 10 capítulos de la aplicación y sus URLs
│   │   └── types.ts            # Interfaces TypeScript para tipado estructurado de datos
│   │
│   ├── hooks/                  # React Hooks personalizados
│   │   ├── use-mobile.tsx      # Detector para responsividad móvil
│   │   ├── use-progress.ts     # Manejador de persistencia del progreso del usuario en LocalStorage
│   │   └── use-toast.ts        # Manejo de notificaciones flotantes (toast)
│   │
│   ├── pages/                  # Vistas de página completa
│   │   ├── Index.tsx           # Página principal con lista de capítulos y progreso global
│   │   └── NotFound.tsx        # Página de error 404 (no encontrado)
│   │
│   ├── utils/                  # Utilidades y funciones auxiliares
│   ├── App.css                 # Estilos específicos a nivel de aplicación
│   ├── App.tsx                 # Enrutamiento y proveedores globales
│   ├── globals.css             # Importación de Tailwind y variables de diseño CSS
│   └── main.tsx                # Punto de entrada de React
│
├── vite.config.ts              # Configuración de Vite y del plugin PWA con estrategias de caché
├── tailwind.config.ts          # Configuración del motor Tailwind CSS
├── postcss.config.js           # Procesamiento CSS con PostCSS
├── eslint.config.js            # Configuración de validación de código con ESLint
├── components.json             # Configuración de componentes de Shadcn UI
└── package.json                # Dependencias, scripts de construcción y metadatos
```

---

## 📊 Modelos de Datos

### Estructura de Capítulos (`types.ts`)
```typescript
export interface ChapterData {
  id: number;
  title: string;
  description: string;
  audioUrl: string;
  videoUrl: string;
  pdfUrl: string;
  jpgUrl: string;
}
```

### Progreso del Usuario (`types.ts`)
El estado de progreso se almacena como un mapa de IDs de capítulo a su progreso individual en el Local Storage bajo la clave `"study_app_progress"`:
```typescript
export interface ChapterProgress {
  completed: boolean;
  audioPosition: number;
  videoPosition: number;
  lastAccessed: string;
}

export interface UserProgress {
  [key: number]: ChapterProgress;
}
```

---

## 📖 Temario de Capítulos
El archivo `src/data/chapters.ts` contiene la información de los siguientes 10 capítulos orientados a conceptos esenciales de computación e informática (TIC):

1. **Capítulo 1**: Types and Components *(Tipos y componentes)*
2. **Capítulo 2**: Input and Output Devices *(Dispositivos de entrada y salida)*
3. **Capítulo 3**: Storage Devices and Media *(Medios y dispositivos de almacenamiento)*
4. **Capítulo 4**: Networks *(Redes)*
5. **Capítulo 5**: Effects of Using IT *(Efectos del uso de las tecnologías de la información)*
6. **Capítulo 6**: ICT Applications *(Aplicaciones de las TIC)*
7. **Capítulo 7**: System Life Cycles *(Ciclos de vida de sistemas)*
8. **Capítulo 8**: Safety and Security *(Seguridad y protección)*
9. **Capítulo 9**: Audiences *(Audiencias y públicos objetivos)*
10. **Capítulo 10**: Communication *(Comunicación y transmisión)*

---

## ⚙️ Comandos del Proyecto

Este proyecto utiliza `pnpm` o `npm` para la gestión de dependencias y scripts de desarrollo.

### Instalación de dependencias
```bash
npm install
# o si utilizas pnpm:
pnpm install
```

### Ejecutar en modo desarrollo
Inicia un servidor local de desarrollo:
```bash
npm run dev
# o si utilizas pnpm:
pnpm dev
```

### Construcción para producción
Compila el proyecto optimizado en el directorio `dist/`, generando los service workers de la PWA:
```bash
npm run build
# o si utilizas pnpm:
pnpm build
```

### Vista previa local de la versión de producción
Prueba la build de producción localmente:
```bash
npm run preview
# o si utilizas pnpm:
pnpm preview
```

### Análisis estático de código (Lint)
```bash
npm run lint
# o si utilizas pnpm:
pnpm lint
```

---

## 📶 Funcionalidad Sin Conexión (PWA)
La aplicación cuenta con estrategias de almacenamiento en caché implementadas mediante **Workbox** en `vite.config.ts`:
- **Recursos estáticos**: Todos los archivos JS, CSS, HTML, SVG, PNG e iconos se almacenan para acceso instantáneo offline.
- **Librería PDF.js**: La URL CDN se almacena con la estrategia `CacheFirst` por hasta 30 días.
- **Medios externos**: Las consultas a dominios multimedia externos como SoundHelix, w3schools o w3.org se procesan mediante `CacheFirst` con soporte para range-requests para mejorar la reproducción y el almacenamiento del progreso de audio/video.
