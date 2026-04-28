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

// Endpoint para listar carpetas y archivos multimedia en una ruta de /contenido
app.get('/api/images', (req, res) => {
  const folder = '';
  const folderPath = path.join(__dirname, '../contenido');

  try {
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => ({
        name: entry.name,
        path: entry.name,
      }));

    const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp3', '.m4a', '.mp4', '.wav', '.ogg'];
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
      .filter(file => mediaExtensions.includes(path.extname(file).toLowerCase()));

    res.json({
      folder,
      folders,
      images: files.map(file => ({
        name: file,
        path: `/contenido/${file}`,
        url: `/contenido/${file}`,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al leer carpeta' });
  }
});

app.get('/api/images/*', (req, res) => {
  const rawFolder = typeof req.params[0] === 'string' ? req.params[0] : '';
  const folder = rawFolder.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');

  const contenidoRoot = path.resolve(path.join(__dirname, '../contenido'));
  const folderPath = path.resolve(path.join(contenidoRoot, folder));

  if (!folderPath.startsWith(contenidoRoot)) {
    return res.status(400).json({ error: 'Ruta inválida' });
  }

  try {
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'Carpeta no encontrada' });
    }

    const entries = fs.readdirSync(folderPath, { withFileTypes: true });
    const folders = entries
      .filter(entry => entry.isDirectory())
      .map(entry => ({
        name: entry.name,
        path: `${folder}/${entry.name}`,
      }));

    const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp3', '.m4a', '.mp4', '.wav', '.ogg'];
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
      .filter(file => mediaExtensions.includes(path.extname(file).toLowerCase()));

    res.json({
      folder,
      folders,
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

// Endpoint para subir archivos a carpetas dinámicas
app.post('/api/upload', (req, res) => {
  const rawFolder = typeof req.body?.folder === 'string' ? req.body.folder : '';
  const safeFolder = rawFolder.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.\./g, '');
  const folderPath = path.join(__dirname, '../contenido', safeFolder);

  try {
    // Crear carpeta si no existe
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const { filename, base64data } = req.body;

    if (!safeFolder || !filename || !base64data) {
      return res.status(400).json({ error: 'folder, filename y base64data requeridos' });
    }

    // Decodificar base64 y guardar archivo
    const buffer = Buffer.from(base64data, 'base64');
    const filePath = path.join(folderPath, filename);

    fs.writeFileSync(filePath, buffer);

    res.json({
      success: true,
      message: 'Archivo subido exitosamente',
      path: `/contenido/${safeFolder}/${filename}`,
      url: `/contenido/${safeFolder}/${filename}`,
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
