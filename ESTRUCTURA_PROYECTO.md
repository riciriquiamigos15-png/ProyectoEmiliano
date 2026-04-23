# Estructura de Proyecto - La Diablada Pillareña CMS

## Resumen de la organización

```
diablada-pillareña-cms/
├── contenido/                          # Carpeta de contenidos del sitio
│   ├── imagenes/                      # Almacenamiento de imágenes
│   ├── arte/                          # Contenido artístico y artesanos
│   ├── informacion/                   # Información turística
│   ├── historia/                      # Narrativa histórica
│   ├── inicio/                        # Contenido de portada
│   ├── musica/                        # Información musical
│   └── README.md                      # Documentación de contenidos
│
├── src/
│   ├── pages/
│   │   ├── admin/                     # Panel de administración
│   │   │   └── README.md              # Documentación del admin
│   │   ├── HomePage.tsx               # Página de inicio
│   │   ├── HistoryPage.tsx            # Página de historia
│   │   ├── ArtPage.tsx                # Página de arte
│   │   ├── MusicPage.tsx              # Página de música
│   │   ├── InfoPage.tsx               # Página de información
│   │   ├── Dashboard.tsx              # Panel principal CMS
│   │   └── (HistoryEditor.tsx eliminado)
│   │
│   ├── components/
│   │   ├── Layout.tsx                 # Layout principal
│   │   └── (otros componentes)
│   │
│   ├── App.tsx                        # Rutas principales
│   ├── main.tsx                       # Punto de entrada
│   └── index.css                      # Estilos globales
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Cambios realizados

### ✅ Carpetas creadas

1. **`/contenido`** - Estructura de carpetas para organizar el contenido:
   - `imagenes/` - Medios visuales
   - `arte/` - Contenido artístico
   - `informacion/` - Datos generales
   - `historia/` - Narrativa
   - `inicio/` - Página principal
   - `musica/` - Contenido musical

2. **`/src/pages/admin`** - Panel de administración

### ✅ Cambios en código

- ✅ Removida importación de `HistoryEditor` del `App.tsx`
- ✅ Eliminada ruta `/cms/editor/:section` 
- ✅ Mantenidas todas las rutas públicas funcionando
- ✅ Mantenido acceso al panel CMS en `/cms`

### ✅ Archivos eliminados (lógicamente)

- `HistoryEditor.tsx` - La funcionalidad de editor ahora será implementada en el panel de administrador

## Acceso a las secciones

### Páginas públicas

- `/` - Inicio
- `/history` - Historia
- `/art` - Arte
- `/music` - Música
- `/info` - Información

### Panel de Administrador

- `/cms` - Dashboard principal
- `/cms/sections` - Gestión de secciones
- `/cms/media` - Biblioteca de medios
- `/cms/styles` - Configuración de estilos
- `/cms/multimedia` - Centro multimedia

## Próximos pasos

1. Crear componentes específicos en `/src/pages/admin/` para:
   - Editor de contenidos
   - Gestor de imágenes
   - Gestor de artesanos
   - Etc.

2. Implementar autenticación en el panel

3. Crear API para gestionar contenidos en las carpetas de `/contenido/`

4. Conectar los formularios del admin con el almacenamiento de contenidos

---

**Estado:** Estructura base completada ✅
**Versión:** 1.0
**Última actualización:** 16 de abril de 2026
