import { Router } from 'express';
import { StorageService } from '../services/StorageService.js';

const router = Router();

// GET - Obtener contenido principal de Música
router.get('/musica', (req, res) => {
  try {
    const data = StorageService.musica.getMain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener Música' });
  }
});

// POST - Actualizar contenido principal de Música
router.post('/musica', (req, res) => {
  try {
    const saved = StorageService.musica.saveMain(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar Música' });
  }
});

// GET - Obtener todas las bandas
router.get('/musica/bandas', (req, res) => {
  try {
    const bandas = StorageService.musica.getBandas();
    res.json({ success: true, data: bandas });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener bandas' });
  }
});

// GET - Obtener una banda específica
router.get('/musica/bandas/:id', (req, res) => {
  try {
    const banda = StorageService.musica.getBanda(req.params.id);
    if (!banda) {
      return res.status(404).json({ success: false, error: 'Banda no encontrada' });
    }
    res.json({ success: true, data: banda });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener banda' });
  }
});

// POST - Crear nueva banda
router.post('/musica/bandas', (req, res) => {
  try {
    const banda = StorageService.musica.addBanda(req.body);
    res.json({ success: true, data: banda, message: 'Banda creada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear banda' });
  }
});

// PUT - Actualizar banda
router.put('/musica/bandas/:id', (req, res) => {
  try {
    const banda = StorageService.musica.updateBanda(req.params.id, req.body);
    if (!banda) {
      return res.status(404).json({ success: false, error: 'Banda no encontrada' });
    }
    res.json({ success: true, data: banda, message: 'Banda actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar banda' });
  }
});

// DELETE - Eliminar banda
router.delete('/musica/bandas/:id', (req, res) => {
  try {
    const success = StorageService.musica.deleteBanda(req.params.id);
    res.json({ success, message: 'Banda eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar banda' });
  }
});

export default router;
