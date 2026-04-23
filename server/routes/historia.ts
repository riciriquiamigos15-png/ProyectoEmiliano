import { Router } from 'express';
import { StorageService } from '../services/StorageService.js';

const router = Router();

// GET - Obtener contenido principal de Historia
router.get('/historia', (req, res) => {
  try {
    const data = StorageService.historia.getMain();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener Historia' });
  }
});

// POST - Actualizar contenido principal de Historia
router.post('/historia', (req, res) => {
  try {
    const saved = StorageService.historia.saveMain(req.body);
    res.json({ success: saved, message: saved ? 'Guardado exitosamente' : 'Error al guardar' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar Historia' });
  }
});

router.get('/historia/editor-content', (req, res) => {
  try {
    const data = StorageService.historia.getEditorContent();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener el editor de Historia' });
  }
});

router.post('/historia/editor-content', (req, res) => {
  try {
    const saved = StorageService.historia.saveEditorContent(req.body);
    res.json({ success: saved, message: saved ? 'Editor de Historia guardado' : 'Error al guardar el editor de Historia' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al guardar el editor de Historia' });
  }
});

router.delete('/historia/editor-content', (req, res) => {
  try {
    const success = StorageService.historia.resetEditorContent();
    res.json({ success, message: success ? 'Editor de Historia restablecido' : 'No se pudo restablecer el editor de Historia' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al restablecer el editor de Historia' });
  }
});

// GET - Obtener todos los personajes
router.get('/historia/personajes', (req, res) => {
  try {
    const personajes = StorageService.historia.getPersonajes();
    res.json({ success: true, data: personajes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener personajes' });
  }
});

// GET - Obtener un personaje específico
router.get('/historia/personajes/:id', (req, res) => {
  try {
    const personaje = StorageService.historia.getPersonaje(req.params.id);
    if (!personaje) {
      return res.status(404).json({ success: false, error: 'Personaje no encontrado' });
    }
    res.json({ success: true, data: personaje });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al obtener personaje' });
  }
});

// POST - Crear nuevo personaje
router.post('/historia/personajes', (req, res) => {
  try {
    const personaje = StorageService.historia.addPersonaje(req.body);
    res.json({ success: true, data: personaje, message: 'Personaje creado' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al crear personaje' });
  }
});

// PUT - Actualizar personaje
router.put('/historia/personajes/:id', (req, res) => {
  try {
    const personaje = StorageService.historia.updatePersonaje(req.params.id, req.body);
    if (!personaje) {
      return res.status(404).json({ success: false, error: 'Personaje no encontrado' });
    }
    res.json({ success: true, data: personaje, message: 'Personaje actualizado' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al actualizar personaje' });
  }
});

// DELETE - Eliminar personaje
router.delete('/historia/personajes/:id', (req, res) => {
  try {
    const success = StorageService.historia.deletePersonaje(req.params.id);
    res.json({ success, message: 'Personaje eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Error al eliminar personaje' });
  }
});

export default router;
