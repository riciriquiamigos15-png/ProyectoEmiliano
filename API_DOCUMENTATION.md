# 🎭 CMS Backend - Documentación Completa

## 📋 Descripción General

Sistema backend basado en **Express + JSON** para persistencia de contenido. El servidor API maneja todas las operaciones CRUD (Create, Read, Update, Delete) para cada sección del sitio web.

---

## 🏗️ Estructura del Proyecto

```
server/
├── index.ts                    ← Servidor Express principal
├── services/
│   └── StorageService.ts      ← Servicio de persistencia JSON
└── routes/
    ├── historia.ts            ← Rutas Historia + Personajes
    ├── arte.ts                ← Rutas Arte + Máscaras
    ├── musica.ts              ← Rutas Música + Bandas
    └── otras.ts               ← Rutas Información + Inicio

contenido/                      ← Datos guardados en JSON
├── historia/
│   ├── data.json             ← Contenido principal
│   └── personajes.json       ← Personajes dinámicos
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

---

## 🚀 Iniciar el Servidor

```bash
# Instalar dependencias
npm install

# Desarrollo (con hot reload)
npm run dev:api

# El servidor estará en: http://localhost:5000
```

---

## 📡 Endpoints de la API

### **HISTORIA**

#### Contenido Principal
```
GET    /api/historia              → Obtener contenido
POST   /api/historia              → Guardar contenido
```

#### Personajes
```
GET    /api/historia/personajes              → Obtener todos
GET    /api/historia/personajes/:id          → Obtener uno
POST   /api/historia/personajes              → Crear
PUT    /api/historia/personajes/:id          → Actualizar
DELETE /api/historia/personajes/:id          → Eliminar
```

**Estructura de Personaje:**
```json
{
  "id": "1634567890",
  "nombre": "El Diablo",
  "descripcion": "El personaje principal",
  "imagen": "url-imagen",
  "informacion": "Detalles adicionales",
  "orden": 1
}
```

---

### **ARTE**

#### Contenido Principal
```
GET    /api/arte                  → Obtener contenido
POST   /api/arte                  → Guardar contenido
```

#### Máscaras
```
GET    /api/arte/masks                       → Obtener todas
GET    /api/arte/masks/:id                   → Obtener una
POST   /api/arte/masks                       → Crear
PUT    /api/arte/masks/:id                   → Actualizar
DELETE /api/arte/masks/:id                   → Eliminar
```

**Estructura de Máscara:**
```json
{
  "id": "1634567890",
  "nombre": "Careta del Diablo",
  "artista": "Ángel Velasco",
  "imagen": "url-imagen",
  "descripcion": "Descripción",
  "galeria": ["url1", "url2"],
  "videos": ["tiktok-url"],
  "detalles": "Info adicional"
}
```

---

### **MÚSICA**

#### Contenido Principal
```
GET    /api/musica                 → Obtener contenido
POST   /api/musica                 → Guardar contenido
```

#### Bandas
```
GET    /api/musica/bandas                    → Obtener todas
GET    /api/musica/bandas/:id                → Obtener una
POST   /api/musica/bandas                    → Crear
PUT    /api/musica/bandas/:id                → Actualizar
DELETE /api/musica/bandas/:id                → Eliminar
```

**Estructura de Banda:**
```json
{
  "id": "1634567890",
  "nombre": "Banda Local",
  "informacion": "Historia de la banda",
  "contacto": "+593 123456789",
  "audio": "url-audio.mp3",
  "imagen": "url-imagen",
  "musicos": ["Músico 1", "Músico 2"]
}
```

---

### **INFORMACIÓN**

```
GET    /api/informacion            → Obtener contenido
POST   /api/informacion            → Guardar contenido
```

**Estructura:**
```json
{
  "titulo": "Información Práctica",
  "fechas": [
    { "fecha": "1 enero", "evento": "Inicio" }
  ],
  "horarios": [
    { "hora": "10:00", "actividad": "Desfile" }
  ],
  "rutas": [
    { "nombre": "Ruta 1", "descripcion": "..." }
  ],
  "recomendaciones": [...]
}
```

---

### **INICIO**

```
GET    /api/inicio                 → Obtener contenido
POST   /api/inicio                 → Guardar contenido
```

**Estructura:**
```json
{
  "titulo": "La Diablada Pillareña",
  "descripcion": "Celebración",
  "imagen": "url",
  "contenido": "Texto principal"
}
```

---

## 🔄 Flujo de Datos

```
Panel Admin (React)
        ↓ HTTP Request
    Express API
        ↓
   StorageService
        ↓
   /contenido/ (JSON)
        ↓ HTTP Response
Panel Admin (React)
```

---

## 💾 Ejemplo: Guardar un Personaje

### Desde el Frontend (React):

```typescript
async function savePersonaje(personaje: any) {
  const response = await fetch('http://localhost:5000/api/historia/personajes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'El Diablo',
      descripcion: 'El protagonista',
      imagen: 'https://...',
      informacion: 'Detalles'
    })
  });
  const result = await response.json();
  return result.data;
}
```

### En el Backend:

1. Express recibe POST a `/api/historia/personajes`
2. StorageService lee `personajes.json`
3. Añade el nuevo personaje con ID único
4. Guarda en `contenido/historia/personajes.json`
5. Devuelve el personaje creado

### Resultado en `/contenido/historia/personajes.json`:

```json
[
  {
    "id": "1634567890",
    "nombre": "El Diablo",
    "descripcion": "El protagonista",
    "imagen": "https://...",
    "informacion": "Detalles"
  }
]
```

---

## 🔌 Integración con Frontend

### 1. Crear servicio API en React:

**`src/services/api.ts`**

```typescript
const API = 'http://localhost:5000/api';

export const apiClient = {
  // Historia
  historia: {
    get: () => fetch(`${API}/historia`).then(r => r.json()),
    save: (data: any) => fetch(`${API}/historia`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(r => r.json()),
    
    personajes: {
      getAll: () => fetch(`${API}/historia/personajes`).then(r => r.json()),
      get: (id: string) => fetch(`${API}/historia/personajes/${id}`).then(r => r.json()),
      create: (data: any) => fetch(`${API}/historia/personajes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(r => r.json()),
      update: (id: string, data: any) => fetch(`${API}/historia/personajes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(r => r.json()),
      delete: (id: string) => fetch(`${API}/historia/personajes/${id}`, {
        method: 'DELETE'
      }).then(r => r.json())
    }
  },
  // Similar para arte, musica, etc.
};
```

### 2. Usar en componentes:

```typescript
import { apiClient } from '@/services/api';

export default function HistoryEditor() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    // Cargar personajes al montar
    apiClient.historia.personajes.getAll()
      .then(res => setPersonajes(res.data));
  }, []);

  const handleAddPersonaje = async (newPersonaje: any) => {
    const result = await apiClient.historia.personajes.create(newPersonaje);
    setPersonajes([...personajes, result.data]);
  };

  return (
    // Tu componente...
  );
}
```

---

## ⚠️ Consideraciones Importantes

### ✅ Ventajas del Sistema JSON
- Sin configuración de BD
- Fácil de entender
- Rápido para desarrollo
- Datos siempre editables manualmente
- Backup simple (copiar carpeta `contenido/`)

### ❌ Limitaciones
- No ideal para miles de registros
- No hay concurrencia (un usuario a la vez)
- No hay autenticación aún
- Performance limitada en operaciones grandes

### 🔐 Próximas Fases (Después)
- Autenticación de admin
- Validación de datos
- Límite de tamaño de archivos
- Migración a SQLite o PostgreSQL
- Sistema de versiones

---

## 🛠️ Desarrollo

### Estructura de datos guardada:

Cada vez que guardes contenido, se crea/actualiza en:
```
contenido/
├── historia/
│   ├── data.json          (contenido principal)
│   └── personajes.json    (personajes dinámicos)
```

Puedes ver/editar estos archivos directamente si lo necesitas.

---

## 📊 Estados de Respuesta

Todas las respuestas siguen este formato:

**Éxito:**
```json
{ "success": true, "data": {...}, "message": "Guardado exitosamente" }
```

**Error:**
```json
{ "success": false, "error": "Descripción del error" }
```

---

## 🎯 Próximos Pasos

1. ✅ Crear el API (hecho)
2. ⏳ Integrar con componentes React
3. ⏳ Crear gestor de archivos/imágenes
4. ⏳ Añadir autenticación
5. ⏳ Optimizar para producción
