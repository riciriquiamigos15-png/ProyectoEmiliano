# 📊 Árbol de Estructura Completa del Proyecto

```
diablada-pillareña-cms/
│
├── 📁 contenido/                          # ✨ NUEVA ESTRUCTURA DE CONTENIDOS
│   ├── 📁 imagenes/                      # Almacenamiento de imágenes
│   │   ├── artesanos/
│   │   ├── instrumentos/
│   │   ├── ritual/
│   │   └── eventos/
│   │
│   ├── 📁 arte/                          # Contenido artístico
│   │   ├── artesanos.json
│   │   ├── tecnicas.md
│   │   └── mascaras.json
│   │
│   ├── 📁 informacion/                   # Información general
│   │   ├── guia_turista.md
│   │   ├── horarios.json
│   │   ├── seguridad.md
│   │   └── gastronomia.json
│   │
│   ├── 📁 historia/                      # Narrativa histórica
│   │   ├── narrativa.md
│   │   ├── personajes.json
│   │   └── evolucion.md
│   │
│   ├── 📁 inicio/                        # Contenido de portada
│   │   ├── hero.json
│   │   ├── bienvenida.md
│   │   └── cta.json
│   │
│   ├── 📁 musica/                        # Información musical
│   │   ├── bandas.json
│   │   ├── ritmos.md
│   │   └── instrumentos.json
│   │
│   └── README.md                         # Documentación de contenidos
│
├── 📁 src/
│   ├── 📁 pages/
│   │   ├── 📁 admin/                     # ✨ PANEL DE ADMINISTRADOR
│   │   │   ├── README.md
│   │   │   ├── MediaManager.tsx          # (futuro)
│   │   │   ├── ContentEditor.tsx         # (futuro)
│   │   │   ├── ArtisanManager.tsx        # (futuro)
│   │   │   └── EventManager.tsx          # (futuro)
│   │   │
│   │   ├── HomePage.tsx                  # 🌐 PÁGINAS PÚBLICAS
│   │   ├── HistoryPage.tsx
│   │   ├── ArtPage.tsx
│   │   ├── MusicPage.tsx
│   │   ├── InfoPage.tsx
│   │   │
│   │   ├── Dashboard.tsx                 # 👨‍💼 CMS DASHBOARD
│   │   │
│   │   └── ❌ HistoryEditor.tsx          # (ELIMINADO DE RUTAS)
│   │
│   ├── 📁 components/
│   │   ├── Layout.tsx                    # Layout principal
│   │   └── (otros componentes)
│   │
│   ├── 📁 lib/
│   │   ├── utils.ts
│   │   └── (utilidades)
│   │
│   ├── App.tsx                           # Enrutamiento principal
│   ├── main.tsx                          # Punto de entrada
│   └── index.css                         # Estilos globales
│
├── 📁 public/
│   └── (assets públicos)
│
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 metadata.json
├── 📄 index.html
│
├── 📄 ESTRUCTURA_PROYECTO.md             # 📚 DOCUMENTACIÓN
├── 📄 CAMBIOS_REALIZADOS.md
├── 📄 README.md
│
└── 📄 .gitignore

```

---

## 📍 Mapeo de Secciones

### Contenido → Página Pública → Admin

```
/contenido/inicio/          →  /              →  /cms
/contenido/historia/        →  /history       →  /cms/sections
/contenido/arte/            →  /art           →  /cms/sections
/contenido/musica/          →  /music         →  /cms/sections
/contenido/informacion/     →  /info          →  /cms/sections
/contenido/imagenes/        →  (todas)        →  /cms/media
```

---

## 🎯 Flujo de Trabajo

```
Administrador
     ↓
Panel Admin (/cms)
     ↓
Gestor de Contenidos
     ↓
Carpeta /contenido/
     ↓
Página Pública
     ↓
Usuario
```

---

## 🔐 Permisos (por implementar)

| Acción | Admin | Editor | Visitante |
|--------|-------|--------|-----------|
| Ver público | ✅ | ✅ | ✅ |
| Crear contenido | ✅ | ✅ | ❌ |
| Editar contenido | ✅ | ✅ | ❌ |
| Eliminar contenido | ✅ | ❌ | ❌ |
| Gestionar usuarios | ✅ | ❌ | ❌ |

---

**Última actualización:** 16 de abril de 2026
**Versión de estructura:** 1.0
