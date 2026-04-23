import { Router } from 'express';
import { StorageService } from '../services/StorageService.js';

const router = Router();

// GET - Obtener Información
router.get('/informacion', (req, res) => {
  try {
    const data = StorageService.informacion.getMain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener Información' });
  }
});

// POST - Actualizar Información
router.post('/informacion', (req, res) => {
  try {
    const saved = StorageService.informacion.saveMain(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar Información' });
  }
});

// GET - Obtener Inicio
router.get('/inicio', (req, res) => {
  try {
    const data = StorageService.inicio.getMain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener Inicio' });
  }
});

// POST - Actualizar Inicio
router.post('/inicio', (req, res) => {
  try {
    const saved = StorageService.inicio.saveMain(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar Inicio' });
  }
});

export default router;
