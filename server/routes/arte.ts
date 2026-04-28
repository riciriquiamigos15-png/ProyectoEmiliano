import { Router } from 'express';
import { StorageService } from '../services/StorageService.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

function sanitizeSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

router.post('/arte/artisans/ensure-folders', (req, res) => {
  try {
    const rawSlug = typeof req.body?.slug === 'string' ? req.body.slug : '';
    const artisanSlug = sanitizeSlug(rawSlug);

    if (!artisanSlug) {
      return res.status(400).json({ success: false, error: 'Slug de artesano inválido' });
    }

    const artisanRoot = path.join(__dirname, '../../contenido/arte', artisanSlug);
    const folders = ['01_perfil', '02_galeria', '03_equipo', '04_video'];

    folders.forEach((folder) => {
      fs.mkdirSync(path.join(artisanRoot, folder), { recursive: true });
    });

    res.json({
      success: true,
      data: {
        slug: artisanSlug,
        root: `/contenido/arte/${artisanSlug}`,
        profile: `/contenido/arte/${artisanSlug}/01_perfil`,
        gallery: `/contenido/arte/${artisanSlug}/02_galeria`,
        team: `/contenido/arte/${artisanSlug}/03_equipo`,
        video: `/contenido/arte/${artisanSlug}/04_video`,
      },
      message: 'Estructura de carpetas lista',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'No se pudieron crear las carpetas del artesano' });
  }
});

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
