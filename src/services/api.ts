/**
 * API Client Service
 * Centraliza todas las llamadas al backend
 * Uso: import { apiClient } from '@/services/api'
 */

const API_BASE = 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Función auxiliar para hacer requests
async function request<T>(
  method: string,
  endpoint: string,
  body?: any,
  options?: { silent?: boolean }
): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error en la solicitud');
    }

    return result;
  } catch (error) {
    if (!options?.silent) {
      console.error(`Error en ${method} ${endpoint}:`, error);
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * API Client con todas las operaciones CRUD
 */
export const apiClient = {
  // ==================== HISTORIA ====================
  historia: {
    // Contenido principal
    getMain: () =>
      request<any>('GET', '/historia'),

    saveMain: (data: any) =>
      request<any>('POST', '/historia', data),

    editorContent: {
      get: () =>
        request<any>('GET', '/historia/editor-content'),

      save: (data: any) =>
        request<any>('POST', '/historia/editor-content', data),

      reset: () =>
        request<any>('DELETE', '/historia/editor-content'),
    },

    // Personajes
    personajes: {
      getAll: () =>
        request<any[]>('GET', '/historia/personajes'),

      getOne: (id: string) =>
        request<any>('GET', `/historia/personajes/${id}`),

      create: (data: any) =>
        request<any>('POST', '/historia/personajes', data),

      update: (id: string, data: any) =>
        request<any>('PUT', `/historia/personajes/${id}`, data),

      delete: (id: string) =>
        request<any>('DELETE', `/historia/personajes/${id}`),
    },
  },

  // ==================== ARTE ====================
  arte: {
    // Contenido principal
    getMain: () =>
      request<any>('GET', '/arte'),

    saveMain: (data: any) =>
      request<any>('POST', '/arte', data),

    editorContent: {
      get: () =>
        request<any>('GET', '/arte/editor-content', undefined, { silent: true }),

      save: (data: any) =>
        request<any>('POST', '/arte/editor-content', data),

      reset: () =>
        request<any>('DELETE', '/arte/editor-content'),
    },

    artisans: {
      ensureFolders: (slug: string) =>
        request<any>('POST', '/arte/artisans/ensure-folders', { slug }),
    },

    // Máscaras
    masks: {
      getAll: () =>
        request<any[]>('GET', '/arte/masks'),

      getOne: (id: string) =>
        request<any>('GET', `/arte/masks/${id}`),

      create: (data: any) =>
        request<any>('POST', '/arte/masks', data),

      update: (id: string, data: any) =>
        request<any>('PUT', `/arte/masks/${id}`, data),

      delete: (id: string) =>
        request<any>('DELETE', `/arte/masks/${id}`),
    },
  },

  // ==================== MÚSICA ====================
  musica: {
    // Contenido principal
    getMain: () =>
      request<any>('GET', '/musica'),

    saveMain: (data: any) =>
      request<any>('POST', '/musica', data),

    // Bandas
    bandas: {
      getAll: () =>
        request<any[]>('GET', '/musica/bandas'),

      getOne: (id: string) =>
        request<any>('GET', `/musica/bandas/${id}`),

      create: (data: any) =>
        request<any>('POST', '/musica/bandas', data),

      update: (id: string, data: any) =>
        request<any>('PUT', `/musica/bandas/${id}`, data),

      delete: (id: string) =>
        request<any>('DELETE', `/musica/bandas/${id}`),
    },
  },

  // ==================== INFORMACIÓN ====================
  informacion: {
    getMain: () =>
      request<any>('GET', '/informacion'),

    saveMain: (data: any) =>
      request<any>('POST', '/informacion', data),
  },

  // ==================== INICIO ====================
  inicio: {
    getMain: () =>
      request<any>('GET', '/inicio'),

    saveMain: (data: any) =>
      request<any>('POST', '/inicio', data),
  },

  // ==================== HEALTH CHECK ====================
  health: () =>
    request<any>('GET', '/health'),
};

export default apiClient;
