# Panel de Administrador - La Diablada Pillareña

## Descripción

Esta carpeta contiene los componentes del panel de administración de La Diablada Pillareña CMS.

El panel de administrador es el centro de control para gestionar todo el contenido del sitio web, incluyendo:

- **Imágenes** - Gestión y optimización de medios visuales
- **Arte** - Información de artesanos y técnicas
- **Información** - Datos turísticos y de seguridad
- **Historia** - Narrativa y personajes
- **Inicio** - Contenido de la página principal
- **Música** - Información de bandas e instrumentos

## Estructura

```
/admin
  ├── Dashboard.tsx         # Inicio del panel (resumen)
  ├── MediaManager.tsx      # Gestor de medios (imágenes)
  ├── ContentEditor.tsx     # Editor de contenido general
  ├── ArtisanManager.tsx    # Gestor de artesanos
  ├── EventManager.tsx      # Gestor de eventos
  └── (más componentes según se agreguen)
```

## Acceso

El panel de administrador es accesible desde:
- URL: `http://localhost:3000/cms`
- Requiere autenticación (por implementar)

## Permisos

El administrador tiene acceso completo para:
- ✅ Crear nuevos contenidos
- ✅ Leer/ver contenidos existentes
- ✅ Actualizar/editar contenidos
- ✅ Eliminar contenidos
- ✅ Gestionar multimedia
- ✅ Configurar estilos globales

## Secciones del Panel

1. **Dashboard** - Resumen general del sitio
2. **Biblioteca de Medios** - Gestión de imágenes
3. **Configuración de Estilos** - Editor de tema
4. **Centro Multimedia** - Videos y medios externos
5. **Secciones Editoriales** - Gestión de contenido

---

*Versión 1.0 - Abril 2026*
