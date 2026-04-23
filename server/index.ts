import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { initializeStorage } from './services/StorageService.js';
import historiaRoutes from './routes/historia.js';
import arteRoutes from './routes/arte.js';
import musicaRoutes from './routes/musica.js';
import otrasRoutes from './routes/otras.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Servir archivos estáticos desde la carpeta contenido
app.use('/contenido', express.static(path.join(__dirname, '../contenido')));

// Inicializar almacenamiento
initializeStorage();

// Rutas API
app.use('/api', historiaRoutes);
app.use('/api', arteRoutes);
app.use('/api', musicaRoutes);
app.use('/api', otrasRoutes);

// Endpoint para listar imágenes de una carpeta
app.get('/api/images/:folder', (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(__dirname, '../contenido', folder);

  try {
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    const files = fs.readdirSync(folderPath).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });

    res.json({
      folder,
      images: files.map(file => ({
        name: file,
        path: `/contenido/${folder}/${file}`,
        url: `/contenido/${folder}/${file}`,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al leer carpeta' });
  }
});

// Endpoint para subir imágenes
app.post('/api/upload/:folder', (req, res) => {
  const folder = req.params.folder;
  const folderPath = path.join(__dirname, '../contenido', folder);

  try {
    // Crear carpeta si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const { filename, base64data } = req.body;

    if (!filename || !base64data) {
      return res.status(400).json({ error: 'filename y base64data requeridos' });
    }

    // Decodificar base64 y guardar archivo
    const buffer = Buffer.from(base64data, 'base64');
    const filePath = path.join(folderPath, filename);

    fs.writeFileSync(filePath, buffer);

    res.json({
      success: true,
      message: 'Imagen subida exitosamente',
      path: `/contenido/${folder}/${filename}`,
      url: `/contenido/${folder}/${filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir imagen' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API working' });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📁 Contenido guardado en: /contenido`);
});
