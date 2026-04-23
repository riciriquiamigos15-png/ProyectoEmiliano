import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'contenido');
const targetDir = path.join(rootDir, 'dist', 'contenido');

if (!fs.existsSync(sourceDir)) {
  console.warn('[sync-contenido] No se encontro la carpeta contenido, se omite copia.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(targetDir), { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });

console.log(`[sync-contenido] Copiado: ${sourceDir} -> ${targetDir}`);
