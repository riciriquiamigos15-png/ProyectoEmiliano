/**
 * EJEMPLO: Cómo integrar el API con el panel de administrador
 * Este archivo muestra cómo usar apiClient en componentes React
 */

// Ejemplo 1: Hook personalizado para usar con Personajes
import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';

export const usePersonajes = () => {
  const [personajes, setPersonajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar personajes al montar
  useEffect(() => {
    loadPersonajes();
  }, []);

  const loadPersonajes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.historia.personajes.getAll();
      if (response.success) {
        setPersonajes(response.data || []);
      } else {
        setError(response.error || 'Error al cargar');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const add = async (personaje: any) => {
    try {
      const response = await apiClient.historia.personajes.create(personaje);
      if (response.success) {
        setPersonajes([...personajes, response.data]);
        return response.data;
      }
      throw new Error(response.error);
    } catch (err) {
      console.error('Error al crear personaje:', err);
      throw err;
    }
  };

  const update = async (id: string, personaje: any) => {
    try {
      const response = await apiClient.historia.personajes.update(id, personaje);
      if (response.success) {
        setPersonajes(
          personajes.map((p) => (p.id === id ? response.data : p))
        );
        return response.data;
      }
      throw new Error(response.error);
    } catch (err) {
      console.error('Error al actualizar personaje:', err);
      throw err;
    }
  };

  const remove = async (id: string) => {
    try {
      const response = await apiClient.historia.personajes.delete(id);
      if (response.success) {
        setPersonajes(personajes.filter((p) => p.id !== id));
        return true;
      }
      throw new Error(response.error);
    } catch (err) {
      console.error('Error al eliminar personaje:', err);
      throw err;
    }
  };

  return { personajes, loading, error, add, update, remove, reload: loadPersonajes };
};

// ============================================================================

// Ejemplo 2: Componente que usa el hook
import { Plus, Edit, Trash2 } from 'lucide-react';

export function PersonajesManager() {
  const { personajes, loading, error, add, update, remove } = usePersonajes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: '',
  });

  const handleAdd = async () => {
    if (!formData.nombre) return;
    try {
      await add(formData);
      setFormData({ nombre: '', descripcion: '', imagen: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await update(id, formData);
      setEditingId(null);
      setFormData({ nombre: '', descripcion: '', imagen: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro?')) {
      try {
        await remove(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-error">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Formulario */}
      <div className="bg-surface-container p-6 rounded-xl space-y-4">
        <h3 className="text-xl font-bold">Agregar Personaje</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full px-4 py-2 bg-surface-dim border border-outline-variant/30 rounded-lg"
        />
        <textarea
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="w-full px-4 py-2 bg-surface-dim border border-outline-variant/30 rounded-lg min-h-24"
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          className="w-full px-4 py-2 bg-surface-dim border border-outline-variant/30 rounded-lg"
        />
        <button
          onClick={handleAdd}
          className="w-full bg-secondary text-on-secondary-fixed py-3 rounded-lg font-bold hover:brightness-110"
        >
          <Plus className="inline w-5 h-5 mr-2" /> Agregar
        </button>
      </div>

      {/* Lista de personajes */}
      <div className="space-y-3">
        {personajes.map((personaje) => (
          <div
            key={personaje.id}
            className="bg-surface-container p-4 rounded-lg flex items-center justify-between"
          >
            <div className="flex-1">
              <h4 className="font-bold">{personaje.nombre}</h4>
              <p className="text-on-surface-variant text-sm">
                {personaje.descripcion}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(personaje.id);
                  setFormData(personaje);
                }}
                className="p-2 hover:bg-surface-container-highest rounded-lg"
              >
                <Edit className="w-5 h-5 text-secondary" />
              </button>
              <button
                onClick={() => handleDelete(personaje.id)}
                className="p-2 hover:bg-surface-container-highest rounded-lg"
              >
                <Trash2 className="w-5 h-5 text-error" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================

// Ejemplo 3: Usar en el HistoryEditor

export function HistoryEditorWithAPI() {
  const [historia, setHistoria] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos de Historia
    apiClient.historia.getMain().then((response) => {
      if (response.success) {
        setHistoria(response.data);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    try {
      const response = await apiClient.historia.saveMain(historia);
      if (response.success) {
        alert('¡Guardado exitosamente!');
      }
    } catch (err) {
      alert('Error al guardar');
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      {/* Tu UI del editor */}
      <input
        type="text"
        value={historia?.titulo || ''}
        onChange={(e) => setHistoria({ ...historia, titulo: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Título"
      />

      <textarea
        value={historia?.contenido || ''}
        onChange={(e) =>
          setHistoria({ ...historia, contenido: e.target.value })
        }
        className="w-full px-4 py-2 border rounded-lg min-h-64"
        placeholder="Contenido"
      />

      <button
        onClick={handleSave}
        className="bg-secondary text-white px-6 py-3 rounded-lg font-bold"
      >
        Guardar Cambios
      </button>

      {/* Gestor de personajes */}
      <PersonajesManager />
    </div>
  );
}
