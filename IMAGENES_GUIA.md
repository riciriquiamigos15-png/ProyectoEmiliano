# 📸 Gestión de Imágenes del Proyecto

## Estructura de Carpetas de Imágenes

```
public/
└── images/
    ├── inicio-hero.jpg          ← Imagen del Hero de Inicio (3840x2160 recomendado)
    ├── historia-bg.jpg          ← Fondo para sección Historia
    ├── arte-gallery/
    │   ├── mascaras-1.jpg
    │   ├── mascaras-2.jpg
    │   └── ...
    ├── musica/
    │   ├── banda-1.jpg
    │   └── ...
    └── otros-recursos/
```

---

## Imagen Actual

### `inicio-hero.jpg`
- **Ubicación:** `public/images/inicio-hero.jpg`
- **Tamaño recomendado:** 3840 x 2160 px (16:9)
- **Peso:** Máximo 2MB (comprimida)
- **Formato:** JPG (optimizado)
- **Contenido:** "El Ritual del Fuego" - Diablos en danza
- **Descripción:** Imagen épica del hero de la página de inicio

**Estado:** ⏳ Pendiente de colocar en la carpeta

---

## Cómo Agregar Imágenes

### Paso 1: Prepara tu imagen
```
- Tamaño recomendado: 3840x2160px (web optimizado 1920x1080px)
- Formato: JPG (más ligero) o PNG (si necesitas transparencia)
- Comprime: Usa TinyPNG o ImageOptim
```

### Paso 2: Coloca en la carpeta correcta
```bash
# Copia tu imagen a:
public/images/inicio-hero.jpg
```

### Paso 3: Referencia en código
```typescript
// En src/pages/HomePage.tsx (ya está actualizado)
<img src="/images/inicio-hero.jpg" alt="..." />

// Las imágenes en public/ se sirven directamente en /
```

### Paso 4: Refresca el navegador
```
Ctrl+Shift+R  (Recarga forzada con caché limpio)
```

---

## Imágenes Actuales en HomePage.tsx

| Imagen | Ruta | Estado |
|--------|------|--------|
| Hero/Inicio | `/images/inicio-hero.jpg` | ⏳ Por agregar |
| Welcome Section | `https://lh3.googleusercontent.com/...` | ✅ Externa (Google) |

---

## Optimización de Imágenes

### Para Comprimir
```bash
# Usa herramientas online:
- TinyPNG.com
- ImageOptim.com
- Squoosh.app
```

### Tamaños Recomendados

| Uso | Ancho | Alto | Ratio |
|-----|-------|------|-------|
| Hero Full Screen | 1920px | 1080px | 16:9 |
| Galería | 600px | 600px | 1:1 |
| Thumb | 300px | 300px | 1:1 |
| Card | 400px | 300px | 4:3 |

---

## ¿Cómo Cambiar Imágenes?

### Para actualizar `inicio-hero.jpg`:
1. Prepara tu nueva imagen (1920x1080px)
2. Reemplaza el archivo en `public/images/`
3. Refresca con `Ctrl+Shift+R`

### Para agregar más secciones:
```typescript
// Agregar en HomePage.tsx
<img src="/images/nueva-seccion.jpg" alt="..." />

// Y colocar el archivo en public/images/nueva-seccion.jpg
```

---

## 🎨 Próximas Imágenes Necesarias

Para completar el sitio:

- [ ] `inicio-hero.jpg` - Página de inicio
- [ ] `historia-hero.jpg` - Hero de Historia
- [ ] `arte-hero.jpg` - Hero de Arte
- [ ] `musica-hero.jpg` - Hero de Música
- [ ] `info-hero.jpg` - Hero de Información
- [ ] Galerías de máscaras (Arte)
- [ ] Fotos de bandas (Música)
- [ ] Logos y banners

---

## ✅ Checklist

- [ ] Crear carpeta `public/images/` ✅
- [ ] Guardar `inicio-hero.jpg` en la carpeta
- [ ] Refrescar página (Ctrl+Shift+R)
- [ ] Verificar que la imagen aparece en el hero
- [ ] Agregar más imágenes según sea necesario

---

**Última actualización:** 16 de abril de 2026
**Ruta de imágenes:** `public/images/`
