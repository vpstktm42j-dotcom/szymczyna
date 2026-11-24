// Downloads every image referenced in src/data/assets.ts from the Framer CDN
// into public/images/ and rewrites assets.ts to use the local paths.
// Usage: npm run fetch-assets
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const assetsFile = path.resolve('src/data/assets.ts');
const outDir = path.resolve('public/images');
await mkdir(outDir, { recursive: true });

let source = await readFile(assetsFile, 'utf8');
const entries = [...source.matchAll(/(\w+):\s*framer\('([^']+)'\)/g)];
if (entries.length === 0) {
  console.log('Nothing to fetch — assets.ts already uses local paths.');
  process.exit(0);
}

for (const [match, key, id] of entries) {
  const ext = path.extname(id);
  const fileName = `${key}${ext}`;
  const res = await fetch(`https://framerusercontent.com/images/${id}`);
  if (!res.ok) throw new Error(`Failed to download ${id}: ${res.status}`);
  await writeFile(path.join(outDir, fileName), Buffer.from(await res.arrayBuffer()));
  source = source.replace(match, `${key}: '/images/${fileName}'`);
  console.log(`✓ ${fileName}`);
}

source = source.replace(/const framer = .*\n\n?/, '');
await writeFile(assetsFile, source);
console.log(`\nSaved ${entries.length} images to public/images and updated src/data/assets.ts`);
