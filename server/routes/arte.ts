import { Router } from 'express';
import { StorageService } from '../services/StorageService.js';

const router = Router();

router.get('/arte/editor-content', (req, res) => {
  try {
    const data = StorageService.arte.getEditorContent();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener el editor de Arte' });
  }
});

router.post('/arte/editor-content', (req, res) => {
  try {
    const saved = StorageService.arte.saveEditorContent(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar el editor de Arte' });
  }
});

router.delete('/arte/editor-content', (req, res) => {
  try {
    const success = StorageService.arte.resetEditorContent();
    res.json({ success, message: success ? 'Editor restablecido' : 'Error al restablecer' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al restablecer el editor de Arte' });
  }
});

// GET - Obtener contenido principal de Arte
router.get('/arte', (req, res) => {
  try {
    const data = StorageService.arte.getMain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener Arte' });
  }
});

// POST - Actualizar contenido principal de Arte
router.post('/arte', (req, res) => {
  try {
    const saved = StorageService.arte.saveMain(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar Arte' });
  }
});

// GET - Obtener todas las máscaras
router.get('/arte/masks', (req, res) => {
  try {
    const masks = StorageService.arte.getMasks();
    res.json({ success: true, data: masks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener máscaras' });
  }
});

// GET - Obtener una máscara específica
router.get('/arte/masks/:id', (req, res) => {
  try {
    const mask = StorageService.arte.getMask(req.params.id);
    if (!mask) {
      return res.status(404).json({ success: false, error: 'Máscara no encontrada' });
    }
    res.json({ success: true, data: mask });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener máscara' });
  }
});

// POST - Crear nueva máscara
router.post('/arte/masks', (req, res) => {
  try {
    const mask = StorageService.arte.addMask(req.body);
    res.json({ success: true, data: mask, message: 'Máscara creada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear máscara' });
  }
});

// PUT - Actualizar máscara
router.put('/arte/masks/:id', (req, res) => {
  try {
    const mask = StorageService.arte.updateMask(req.params.id, req.body);
    if (!mask) {
      return res.status(404).json({ success: false, error: 'Máscara no encontrada' });
    }
    res.json({ success: true, data: mask, message: 'Máscara actualizada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar máscara' });
  }
});

// DELETE - Eliminar máscara
router.delete('/arte/masks/:id', (req, res) => {
  try {
    const success = StorageService.arte.deleteMask(req.params.id);
    res.json({ success, message: 'Máscara eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar máscara' });
  }
});

export default router;
