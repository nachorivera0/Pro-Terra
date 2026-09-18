import fs from 'node:fs';
import path from 'node:path';

/** Tamaño legible de un archivo de /public (solo para componentes de servidor). */
export function fileSize(publicPath: string): string | null {
  try {
    const bytes = fs.statSync(path.join(process.cwd(), 'public', publicPath)).size;
    if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1).replace('.', ',')} MB`;
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null;
  }
}
