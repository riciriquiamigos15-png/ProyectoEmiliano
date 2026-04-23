# 🔐 Sistema de Autenticación - Documentación

## 📋 Resumen

Se ha implementado un sistema completo de autenticación con:

- ✅ Contexto de autenticación (AuthContext)
- ✅ Página de Login
- ✅ Página de Registro (Signup)
- ✅ Menú de usuario en la barra superior
- ✅ Protección de rutas del admin
- ✅ Persistencia de sesión en localStorage

---

## 🎯 Características Principales

### 1. **Autenticación en Contexto**
- Se reemplazó el botón "Entradas" con un ícono de usuario
- El ícono muestra diferentes opciones según el estado de autenticación
- Las rutas del admin están protegidas y solo accesibles para admins

### 2. **Flujo de Usuarios**

#### Usuario No Autenticado
```
[Ícono Usuario] 
    ↓
[Acceder] [Registrarse]
    ↓
Opciones de Login/Signup
```

#### Usuario Autenticado (Admin)
```
[Nombre Usuario] ↓
    ↓
┌─────────────────────┐
│ 📊 Panel de Control │
│ ⚙️ Configuración    │
│ 🌐 Ver Sitio        │
│ 🚪 Cerrar Sesión    │
└─────────────────────┘
```

#### Usuario Autenticado (Normal)
```
[Nombre Usuario] ↓
    ↓
┌─────────────────────┐
│ 🌐 Ver Sitio        │
│ 🚪 Cerrar Sesión    │
└─────────────────────┘
```

---

## 📁 Archivos Creados

### 1. `src/contexts/AuthContext.tsx`
**Propósito:** Gestionar el estado global de autenticación

**Funciones principales:**
- `login()` - Inicia sesión con email y contraseña
- `signup()` - Registra un nuevo usuario
- `logout()` - Cierra la sesión
- `useAuth()` - Hook para acceder al contexto

**Estado que maneja:**
- `user` - Objeto del usuario autenticado
- `isAuthenticated` - Boolean si está logueado
- `isLoading` - Si hay operación en progreso
- `error` - Mensaje de error si hay

### 2. `src/pages/LoginPage.tsx`
**Propósito:** Página de inicio de sesión

**Características:**
- Formulario con email y contraseña
- Validaciones en cliente
- Muestra credenciales demo (admin@diablada.com / admin123)
- Diseño consistente con el proyecto
- Redirección automática si ya está logueado
- Enlace para ir a registro

### 3. `src/pages/SignupPage.tsx`
**Propósito:** Página de registro de nuevos usuarios

**Características:**
- Formulario con nombre, email, contraseña y confirmación
- Validaciones (mínimo 6 caracteres, contraseñas coinciden)
- Los nuevos usuarios son normales (no admins)
- Mensaje de éxito con redirección automática
- Enlace para ir a login

### 4. `src/components/UserMenu.tsx`
**Propósito:** Menú de usuario en la barra superior

**Estados:**
- **No autenticado:** Muestra botones [Acceder] y [Registrarse]
- **Autenticado:** Muestra dropdown con nombre de usuario
- **Admin:** Opciones adicionales de panel de control
- **Usuario normal:** Opciones limitadas

**Funcionalidades:**
- Dropdown que se cierra al hacer clic fuera
- Iconos de lucide-react
- Responsive (muestra solo ícono en móvil)

### 5. Cambios en `src/App.tsx`
- Agregada importación de AuthProvider
- Agregada función ProtectedAdminRoute
- App envuelve AppRoutes en AuthProvider
- Rutas `/login` y `/signup` añadidas
- Rutas del admin protegidas con ProtectedAdminRoute

### 6. Cambios en `src/components/Layout.tsx`
- Reemplazado el botón "Entradas" con componente UserMenu
- Importado UserMenu

---

## 🔑 Credenciales Demo

Para probar el sistema como administrador:

```
Email:    admin@diablada.com
Password: admin123
```

**Nota:** Esto es solo para demostración. En producción, usarías autenticación real con JWT.

---

## 🛡️ Protección de Rutas

Las siguientes rutas del admin están **protegidas**:

```
/admin
/admin/sections/historia
/admin/sections/:section
/admin/media
/admin/styles
/admin/multimedia
/admin/settings
```

Si un usuario intenta acceder sin autenticarse o sin rol de admin, será redirigido a `/login`.

---

## 💾 Persistencia de Sesión

Las sesiones se guardan en **localStorage**:

```javascript
// Datos guardados
localStorage.setItem('user', JSON.stringify(userData))
localStorage.setItem('auth_token', 'token-value')

// Se recuperan al refrescar la página
```

---

## 🔄 Flujo de Autenticación Típico

```
1. Usuario hace clic en ícono de usuario
   ↓
2. Si NO autenticado → Muestra [Acceder] [Registrarse]
   ↓
3. Usuario hace clic en "Acceder"
   ↓
4. Va a /login
   ↓
5. Ingresa email/contraseña
   ↓
6. Sistema valida credenciales
   ↓
7. Si son válidas:
   - Se guarda user en localStorage
   - Se guarda auth_token
   - Redirige a /admin
   - UserMenu muestra nombre del usuario
   ↓
8. Si no son válidas:
   - Muestra error
   - Mantiene en /login
```

---

## 🎨 Componentes del UserMenu

### Estados Visuales

**No Autenticado:**
```
[🔐 Acceder]  [➕ Registrarse]
```

**Autenticado:**
```
[👤 Juan Perez ▼]

Dropdown:
├── 📊 Panel de Control (solo admin)
├── ⚙️ Configuración (solo admin)
├── ─────────────────
├── 🌐 Ver Sitio Público
└── 🚪 Cerrar Sesión
```

---

## 📝 Casos de Uso

### Caso 1: Acceso de Administrador
```
1. Navega a http://localhost:3000
2. Hace clic en ícono de usuario (arriba a la derecha)
3. Hace clic en "Acceder"
4. Ingresa: admin@diablada.com / admin123
5. ✅ Es redirigido a /admin
6. 👑 Menú muestra "Administrador"
7. Puede acceder a todas las secciones de admin
```

### Caso 2: Registro de Usuario Normal
```
1. Hace clic en "Registrarse"
2. Completa: nombre, email, contraseña
3. Se registra con rol "usuario" (no admin)
4. ✅ Es redirigido a /admin
5. ❌ Pero NO puede acceder a rutas protegidas
6. Ve solo opción "Ver Sitio Público"
```

### Caso 3: Intento de Acceso a Ruta Protegida
```
1. Usuario intenta ir a /admin (sin autenticar)
2. ❌ Es redirigido a /login
3. Debe autenticarse primero
4. Después de login → redirige a /admin
```

---

## 🚀 Cómo Usar en Componentes

### Verificar si está autenticado

```typescript
import { useAuth } from '@/contexts/AuthContext';

export function MiComponente() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Por favor inicia sesión</div>;
  }

  return <div>¡Bienvenido {user?.name}!</div>;
}
```

### Solo para admins

```typescript
export function SoloAdmin() {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <div>Acceso denegado</div>;
  }

  return <div>Panel solo para admins</div>;
}
```

### Logout

```typescript
export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>
      Cerrar sesión
    </button>
  );
}
```

---

## 🔗 Próximos Pasos

### Fase 1 (Actual - Simulado)
- ✅ Sistema con credenciales demo
- ✅ Autenticación en memoria + localStorage
- ✅ Rutas protegidas
- ✅ UI completa

### Fase 2 (Integración con Backend)
- [ ] Crear endpoint `/api/auth/login` en Express
- [ ] Crear endpoint `/api/auth/signup` en Express
- [ ] Implementar JWT tokens
- [ ] Validar tokens en el servidor
- [ ] Guardar usuarios en base de datos

### Fase 3 (Seguridad Mejorada)
- [ ] Encriptación de contraseñas (bcrypt)
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] 2FA (autenticación de dos factores)
- [ ] Recuperación de contraseña

---

## ⚙️ Configuración

### Para Cambiar Credenciales Demo

Edita `src/contexts/AuthContext.tsx`:

```typescript
const login = async (email: string, password: string) => {
  // Línea ~35: Cambiar validación
  if (email === 'tu-email@ejemplo.com' && password === 'tu-password') {
    // Tu lógica
  }
};
```

### Para Cambiar Roles

```typescript
// En src/contexts/AuthContext.tsx
const mockUser: User = {
  id: 'admin-001',
  email: 'admin@diablada.com',
  name: 'Administrador',
  role: 'admin', // Cambiar a 'user' para usuario normal
};
```

---

## 🐛 Troubleshooting

### "Cannot find module '@/contexts/AuthContext'"
- Verifica que el archivo existe en `src/contexts/AuthContext.tsx`
- Recarga el IDE (Ctrl+Shift+P → TypeScript: Restart TS Server)

### "AuthProvider is not defined"
- Asegúrate de que `App.tsx` importa y usa AuthProvider
- Revisa que `App.tsx` esté correctamente actualizado

### Las sesiones no persisten
- Abre DevTools (F12)
- Ve a Application → localStorage
- Verifica que `user` y `auth_token` estén guardados

### El menú de usuario no aparece
- Verifica que Layout.tsx importa UserMenu
- Verifica que Layout.tsx usa el componente en JSX

---

## 📚 Referencias

- Hook useAuth: `src/contexts/AuthContext.tsx`
- Login: `src/pages/LoginPage.tsx`
- Signup: `src/pages/SignupPage.tsx`
- UserMenu: `src/components/UserMenu.tsx`
- Rutas Protegidas: `src/App.tsx`

---

**¡Sistema de autenticación completamente funcional! 🔐✨**
