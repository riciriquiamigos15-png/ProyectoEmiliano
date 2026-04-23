# 🎭 Fase 1 - Backend API Completado

## ✅ Lo que se ha creado

Un sistema **Express + JSON** completamente funcional que permite:

- ✅ Guardar y recuperar contenido de todas las secciones
- ✅ Gestionar personajes, máscaras, bandas de forma dinámica
- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Persistencia en archivos JSON en la carpeta `/contenido/`
- ✅ API RESTful lista para usar
- ✅ Cliente API en React para facilitar llamadas

---

## 📁 Estructura Creada

### Backend (Servidor Express)
```
server/
├── index.ts                    # Servidor principal en puerto 5000
├── services/
│   └── StorageService.ts       # Manejo de archivos JSON
└── routes/
    ├── historia.ts            # Endpoints Historia + Personajes
    ├── arte.ts                # Endpoints Arte + Máscaras  
    ├── musica.ts              # Endpoints Música + Bandas
    └── otras.ts               # Endpoints Información + Inicio
```

### Storage (Datos persistentes)
```
contenido/                      # Se crea automáticamente
├── historia/
│   ├── data.json             # Contenido principal
│   └── personajes.json       # Dinámico - agregar/editar/eliminar
├── arte/
│   ├── data.json
│   └── masks.json
├── musica/
│   ├── data.json
│   └── bandas.json
├── informacion/
│   └── data.json
└── inicio/
    └── data.json
```

### Frontend (Cliente API)
```
src/
├── services/
│   ├── api.ts                # Cliente centralizado para llamadas API
│   └── api-examples.tsx      # Ejemplos de uso + hooks personalizados
```

---

## 🚀 Cómo Usar

### Paso 1: Instalar dependencias

```bash
npm install
# Se instalarán: express, cors, multer, body-parser, etc.
```

### Paso 2: Iniciar el servidor API

En una terminal:
```bash
npm run dev:api
```

Verás:
```
🚀 API Server running on http://localhost:5000
📁 Contenido guardado en: /contenido
```

### Paso 3: Iniciar el frontend (otra terminal)

```bash
npm run dev
```

El sitio estará en `http://localhost:3000`

---

## 📡 Endpoints Disponibles

### HISTORIA
```
GET  /api/historia                    # Obtener contenido
POST /api/historia                    # Guardar contenido

GET  /api/historia/personajes         # Listar personajes
GET  /api/historia/personajes/:id     # Un personaje
POST /api/historia/personajes         # Crear
PUT  /api/historia/personajes/:id     # Actualizar
DEL  /api/historia/personajes/:id     # Eliminar
```

### ARTE
```
GET  /api/arte                        # Contenido
POST /api/arte                        # Guardar

GET  /api/arte/masks                  # Listar máscaras
POST /api/arte/masks                  # Crear
PUT  /api/arte/masks/:id              # Actualizar
DEL  /api/arte/masks/:id              # Eliminar
```

### MÚSICA
```
GET  /api/musica                      # Contenido
POST /api/musica                      # Guardar

GET  /api/musica/bandas               # Listar bandas
POST /api/musica/bandas               # Crear
PUT  /api/musica/bandas/:id           # Actualizar
DEL  /api/musica/bandas/:id           # Eliminar
```

### INFORMACIÓN e INICIO
```
GET  /api/informacion                 # Obtener
POST /api/informacion                 # Guardar

GET  /api/inicio                      # Obtener
POST /api/inicio                      # Guardar
```

---

## 💻 Ejemplos Rápidos

### Obtener personajes (JavaScript)
```javascript
const personajes = await fetch('http://localhost:5000/api/historia/personajes')
  .then(r => r.json());
console.log(personajes.data);
```

### Crear personaje
```javascript
const nuevoPersonaje = await fetch('http://localhost:5000/api/historia/personajes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: 'El Diablo',
    descripcion: 'Personaje principal',
    imagen: 'https://...',
    informacion: 'Detalles'
  })
}).then(r => r.json());
```

### Usando el cliente API (React)
```typescript
import { apiClient } from '@/services/api';

// En un componente
const personajes = await apiClient.historia.personajes.getAll();
await apiClient.historia.personajes.create({ nombre: 'Nuevo' });
```

---

## 🔄 Flujo Completo

```
1. Usuario entra al panel admin (/admin)
                ↓
2. Hace clic en "Historia" 
                ↓
3. El componente carga datos:
   fetch('http://localhost:5000/api/historia')
                ↓
4. Express recibe la solicitud
                ↓
5. StorageService lee /contenido/historia/data.json
                ↓
6. Devuelve JSON al componente React
                ↓
7. React muestra los datos en el editor
                ↓
8. Admin edita y hace clic en "Guardar"
                ↓
9. React envía POST con datos nuevos
                ↓
10. Express guarda en /contenido/historia/data.json
                ↓
11. Responde al frontend
                ↓
12. Frontend muestra "Guardado exitosamente"
```

---

## 📊 Estructura de Datos

### Personaje de Historia
```json
{
  "id": "1634567890",           // Generado automáticamente
  "nombre": "El Diablo",
  "descripcion": "El protagonista",
  "imagen": "https://example.com/img.jpg",
  "informacion": "Datos adicionales",
  "orden": 1                    // Para ordenamiento
}
```

### Máscara de Arte
```json
{
  "id": "1634567890",
  "nombre": "Careta del Diablo",
  "artista": "Ángel Velasco",
  "imagen": "https://...",
  "descripcion": "Descripción breve",
  "galeria": ["img1.jpg", "img2.jpg"],
  "videos": ["tiktok-url"],
  "detalles": "Más información"
}
```

### Banda de Música
```json
{
  "id": "1634567890",
  "nombre": "Banda Local",
  "informacion": "Historia de la banda",
  "contacto": "+593 123456789",
  "audio": "https://example.com/audio.mp3",
  "imagen": "https://...",
  "musicos": ["Músico 1", "Músico 2"]
}
```

---

## 📖 Documentación Completa

Ver archivos:
- `API_DOCUMENTATION.md` - Documentación técnica completa
- `src/services/api-examples.tsx` - Ejemplos de uso en React

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "CORS error"
- El backend debe estar en `http://localhost:5000`
- El frontend en `http://localhost:3000`
- CORS ya está habilitado en el servidor

### Error: "Port 5000 already in use"
```bash
# Cambiar puerto en server/index.ts
const PORT = 5001;  // o cualquier otro puerto
```

### Contenido no se guarda
- Verifica que la carpeta `/contenido` existe
- Revisa permisos de escritura
- Mira la consola del servidor para errores

---

## 🎯 Próximos Pasos

1. **Integrar en componentes** ← Siguiente
   - Actualizar HistoryEditor para usar API
   - Agregar personalización dinámica

2. **Upload de archivos**
   - Crear endpoint para imágenes
   - Manejo de multer

3. **Autenticación**
   - JWT tokens
   - Login seguro

4. **Validación**
   - Validar datos antes de guardar
   - Límites de tamaño

5. **Base de datos** (Fase 2)
   - Migrar de JSON a SQLite/PostgreSQL
   - Mejor performance

---

## ✨ Características

- ✅ CRUD completo
- ✅ Persistencia JSON
- ✅ API RESTful
- ✅ Cliente React integrado
- ✅ CORS habilitado
- ✅ Manejo de errores
- ✅ Documentación completa
- ✅ Ejemplos de uso

---

**¡Sistema listo para usar! 🚀**

Próximo: Integrar en componentes React
