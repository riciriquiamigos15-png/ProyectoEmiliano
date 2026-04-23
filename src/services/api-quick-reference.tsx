/**
 * Quick Reference - Llamadas API Más Comunes
 * Copiar y pegar directamente en tus componentes
 */

import { apiClient } from '@/services/api';
import { useEffect, useState } from 'react';

// ============================================================================
// 1️⃣ CARGAR Y MOSTRAR PERSONAJES
// ============================================================================

export function HistoryList() {
  const [personajes, setPersonajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.historia.personajes.getAll().then((res) => {
      if (res.success) setPersonajes(res.data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {personajes.map((p) => (
        <div key={p.id} className="p-4 border rounded">
          {p.imagen && <img src={p.imagen} alt={p.nombre} className="w-full" />}
          <h3 className="font-bold mt-2">{p.nombre}</h3>
          <p>{p.descripcion}</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 2️⃣ AGREGAR NUEVO PERSONAJE
// ============================================================================

export function AddPersonajeForm() {
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await apiClient.historia.personajes.create(formData);
    
    if (res.success) {
      alert('¡Personaje agregado!');
      setFormData({ nombre: '', descripcion: '' });
    } else {
      alert('Error: ' + res.error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre del personaje"
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        required
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Guardando...' : 'Agregar'}
      </button>
    </form>
  );
}

// ============================================================================
// 3️⃣ EDITAR PERSONAJE EXISTENTE
// ============================================================================

export function EditPersonaje({ personajeId }: { personajeId: string }) {
  const [personaje, setPersonaje] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.historia.personajes.getOne(personajeId).then((res) => {
      if (res.success) setPersonaje(res.data);
      setLoading(false);
    });
  }, [personajeId]);

  const handleSave = async () => {
    const res = await apiClient.historia.personajes.update(personajeId, personaje);
    if (res.success) {
      alert('¡Actualizado!');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (!personaje) return <div>No encontrado</div>;

  return (
    <div className="space-y-4">
      <input
        value={personaje.nombre}
        onChange={(e) => setPersonaje({ ...personaje, nombre: e.target.value })}
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        value={personaje.descripcion}
        onChange={(e) =>
          setPersonaje({ ...personaje, descripcion: e.target.value })
        }
        className="w-full px-4 py-2 border rounded"
      />
      <button
        onClick={handleSave}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Guardar Cambios
      </button>
    </div>
  );
}

// ============================================================================
// 4️⃣ ELIMINAR PERSONAJE
// ============================================================================

export function DeletePersonajeButton({ personajeId }: { personajeId: string }) {
  const handleDelete = async () => {
    if (confirm('¿Estás seguro? No se puede deshacer.')) {
      const res = await apiClient.historia.personajes.delete(personajeId);
      if (res.success) {
        alert('¡Eliminado!');
        // Recargar lista o redirigir
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Eliminar
    </button>
  );
}

// ============================================================================
// 5️⃣ GUARDAR CONTENIDO PRINCIPAL DE SECCIÓN
// ============================================================================

export function SaveSectionContent() {
  const [content, setContent] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
  });

  const handleSave = async () => {
    // Elegir la sección (cambiar según necesites)
    const res = await apiClient.historia.saveMain(content);
    // O: apiClient.arte.saveMain(content)
    // O: apiClient.musica.saveMain(content)
    
    if (res.success) {
      alert('¡Contenido guardado!');
    } else {
      alert('Error: ' + res.error);
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={content.titulo}
        onChange={(e) => setContent({ ...content, titulo: e.target.value })}
        placeholder="Título"
        className="w-full px-4 py-2 border rounded"
      />
      <textarea
        value={content.descripcion}
        onChange={(e) => setContent({ ...content, descripcion: e.target.value })}
        placeholder="Descripción"
        className="w-full px-4 py-2 border rounded"
      />
      <input
        value={content.imagen}
        onChange={(e) => setContent({ ...content, imagen: e.target.value })}
        placeholder="URL de imagen"
        className="w-full px-4 py-2 border rounded"
      />
      <button
        onClick={handleSave}
        className="w-full bg-blue-500 text-white px-4 py-3 rounded font-bold"
      >
        Guardar Contenido
      </button>
    </div>
  );
}

// ============================================================================
// 6️⃣ CARGAR CON MANEJO DE ERRORES
// ============================================================================

export function LoadWithErrorHandling() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await apiClient.historia.getMain();
        
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.error || 'Error desconocido');
        }
      } catch (err) {
        setError('Error de conexión con el servidor');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>⏳ Cargando...</div>;
  if (error) return <div className="text-red-500">❌ {error}</div>;
  if (!data) return <div>📭 Sin datos</div>;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{data.titulo}</h2>
      <p>{data.descripcion}</p>
    </div>
  );
}

// ============================================================================
// 7️⃣ COMBINAR MÚLTIPLES SECCIONES
// ============================================================================

export function DashboardOverview() {
  const [historia, setHistoria] = useState<any>(null);
  const [arte, setArte] = useState<any>(null);
  const [musica, setMusica] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.historia.getMain(),
      apiClient.arte.getMain(),
      apiClient.musica.getMain(),
    ]).then(([hRes, aRes, mRes]) => {
      if (hRes.success) setHistoria(hRes.data);
      if (aRes.success) setArte(aRes.data);
      if (mRes.success) setMusica(mRes.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 border rounded">
        <h3>Historia</h3>
        <p>{historia?.descripcion}</p>
      </div>
      <div className="p-4 border rounded">
        <h3>Arte</h3>
        <p>{arte?.descripcion}</p>
      </div>
      <div className="p-4 border rounded">
        <h3>Música</h3>
        <p>{musica?.descripcion}</p>
      </div>
    </div>
  );
}

// ============================================================================
// 8️⃣ REFRESCAR DATOS MANUALMENTE
// ============================================================================

export function RefreshableList() {
  const [personajes, setPersonajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const res = await apiClient.historia.personajes.getAll();
    if (res.success) {
      setPersonajes(res.data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <button
        onClick={loadData}
        disabled={loading}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        {loading ? '🔄 Recargando...' : '🔄 Refrescar'}
      </button>

      {personajes.map((p) => (
        <div key={p.id} className="p-2 border-b">
          {p.nombre}
        </div>
      ))}
    </div>
  );
}
