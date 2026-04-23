# 🔐 Sistema de Autenticación - Guía Rápida

## ✨ ¿Qué cambió?

### Antes
```
Barra Superior:
[Inicio] [Historia] [Arte] [Música] [Información]     [Entradas]
```

### Ahora
```
Barra Superior:
[Inicio] [Historia] [Arte] [Música] [Información]  [👤 Usuario ▼]
                                                        ↓
                                    ┌──────────────────┐
                                    │ No autenticado:  │
                                    │ [Acceder]        │
                                    │ [Registrarse]    │
                                    └──────────────────┘
                                    
                                    O si está logueado:
                                    ┌──────────────────┐
                                    │ 📊 Panel Admin   │
                                    │ ⚙️ Configuración │
                                    │ 🌐 Ver Sitio     │
                                    │ 🚪 Cerrar sesión │
                                    └──────────────────┘
```

---

## 🎯 Flujo de Uso

### 1️⃣ Primer acceso (Usuario nuevo)
```
Usuario anónimo visita el sitio
        ↓
Hace clic en [👤 Usuario] arriba a la derecha
        ↓
Ve dos opciones: [Acceder] [Registrarse]
        ↓
Elige uno de los dos
```

### 2️⃣ Opción A: Acceder como Admin
```
Hace clic en [Acceder]
        ↓
Llega a /login
        ↓
Ingresa credenciales demo:
  Email:    admin@diablada.com
  Password: admin123
        ↓
✅ Inicia sesión exitoso
        ↓
Se ve el nombre en la barra
        ↓
👑 Menú muestra: Panel Admin, Configuración, etc.
        ↓
Puede acceder a /admin y editar contenido
```

### 3️⃣ Opción B: Registrarse (Usuario Normal)
```
Hace clic en [Registrarse]
        ↓
Llega a /signup
        ↓
Completa formulario:
  Nombre: Tu Nombre
  Email: tu@email.com
  Contraseña: tu-password
  Confirmar: tu-password
        ↓
✅ Cuenta creada
        ↓
Redirige automáticamente a /admin
        ↓
❌ Pero acceso denegado (solo lee "Usuario")
        ↓
Solo puede ver sitio público
```

---

## 📁 Archivos Nuevos Creados

| Archivo | Propósito |
|---------|-----------|
| `src/contexts/AuthContext.tsx` | Estado global de autenticación + hook useAuth |
| `src/pages/LoginPage.tsx` | Página de login con credenciales demo |
| `src/pages/SignupPage.tsx` | Página de registro de nuevos usuarios |
| `src/components/UserMenu.tsx` | Menú dropdown de usuario en barra superior |
| `AUTH_SYSTEM_DOCUMENTATION.md` | Documentación técnica completa |

---

## 🔑 Credenciales Demo

Para probar todo el sistema:

```
┌─────────────────────────────────┐
│ EMAIL:    admin@diablada.com    │
│ PASSWORD: admin123              │
└─────────────────────────────────┘
```

---

## 🛡️ Rutas Protegidas

Estas rutas **requieren login como admin**:

- `/admin` - Panel de control
- `/admin/sections/historia` - Editor de historia
- `/admin/sections/:section` - Editores genéricos
- `/admin/media` - Biblioteca de medios
- `/admin/styles` - Configuración de estilos
- `/admin/multimedia` - Centro multimedia
- `/admin/settings` - Configuración

Si intentas acceder sin autenticar → **Redirige a /login**

---

## 💡 Pruebas Rápidas

### Test 1: Ver el menú de usuario
```
1. Abre http://localhost:3000
2. Busca arriba a la derecha el ícono de usuario (👤)
3. Haz clic
4. Deberías ver [Acceder] [Registrarse]
```

### Test 2: Login como admin
```
1. Haz clic en [Acceder]
2. Ingresa: admin@diablada.com / admin123
3. ✅ Deberías ser redirigido a /admin
4. El menú debería mostrar tu nombre "Administrador"
```

### Test 3: Acceso a ruta protegida sin login
```
1. Abre nueva ventana/pestaña
2. Ve a http://localhost:3000/admin
3. ❌ Serás redirigido a /login
4. Inicia sesión primero
```

### Test 4: Registro como usuario normal
```
1. Haz clic en [Registrarse]
2. Completa el formulario
3. Password debe ser mínimo 6 caracteres
4. Después de registrarse → redirige a /admin
5. ❌ Pero verás acceso denegado
6. Deberías ver solo [Ver Sitio Público]
```

---

## 🎨 Detalles Visuales

### Color del Ícono de Usuario
- **No autenticado:** Botón secundario (rojo/naranja)
- **Autenticado:** Botón primario (rojo más intenso)

### Dropdown Menu
- Fondo: Oscuro semi-transparente (neutral-900)
- Borde: Blanco translúcido
- Íconos: Emojis + lucide-react

### Páginas de Login/Signup
- Fondo: Gradiente negro
- Elementos decorativos: Bloobs rojos
- Formulario: Card semi-transparente
- Demo credentials mostradas en login

---

## 🔒 Seguridad Actual

⚠️ **IMPORTANTE:** Este es un sistema DEMO. Para producción:

- ❌ Las credenciales están en el código (cambiar a backend)
- ❌ No hay encriptación de contraseñas (agregar bcrypt)
- ❌ No hay JWT tokens (agregar autenticación real)
- ❌ Sesiones en localStorage (vulnerable en sitios reales)

**Fase siguiente:** Conectar con backend Express para autenticación real.

---

## 📱 Responsive Design

El menú de usuario es **responsive**:

| Pantalla | Muestra |
|----------|---------|
| Desktop | Texto completo: "Admin ▼" |
| Tablet | Ícono + nombre corto |
| Mobile | Solo ícono "👤" |

---

## 🚀 Próximos Pasos

1. ✅ Sistema de autenticación completado
2. ⏳ Conectar con API backend (Express)
3. ⏳ Crear endpoints `/api/auth/login` y `/api/auth/signup`
4. ⏳ Implementar JWT tokens
5. ⏳ Base de datos de usuarios

---

## 📞 Resumen de Cambios

**En el Layout:**
- Botón "Entradas" → Componente UserMenu
- Menú contextual + funcionalidades de login/logout

**En la App:**
- Agregado AuthProvider (envuelve toda la app)
- Agregadas rutas /login y /signup
- Rutas /admin/* protegidas con ProtectedAdminRoute

**Nuevos contextos y páginas:**
- AuthContext.tsx para estado global
- LoginPage.tsx para autenticación
- SignupPage.tsx para registro
- UserMenu.tsx para UI del usuario

---

**¡Todo listo para usar! 🎉**

Inicia el servidor y prueba el sistema:
```bash
npm run dev
```

Luego navega a: `http://localhost:3000`
