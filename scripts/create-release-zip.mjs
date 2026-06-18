import { createHash } from 'node:crypto';
import { readdir, readFile, rm, stat, writeFile, mkdir } from 'node:fs/promises';
import { basename, join, relative, sep } from 'node:path';
import { deflateRawSync } from 'node:zlib';

const projectRoot = process.cwd();
const distDir = join(projectRoot, 'dist');
const releasesDir = join(projectRoot, 'releases');
const packageJson = JSON.parse(await readFile(join(projectRoot, 'package.json'), 'utf8'));
const packageName = packageJson.name || basename(projectRoot);
const safeName = packageName.replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '');
const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
const zipPath = join(releasesDir, `${safeName}-${stamp}.zip`);

function crc32(buf) {
  const table = crc32.table || (crc32.table = Array.from({ length: 256 }, (_, n) => {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    return c >>> 0;
  }));
  let crc = 0xffffffff;
  for (const byte of buf) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { dosTime, dosDate };
}

function u16(n) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n & 0xffff, 0);
  return b;
}

function u32(n) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n >>> 0, 0);
  return b;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

async function makeZip(files, outPath) {
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const file of files) {
    const source = await readFile(file);
    const compressed = deflateRawSync(source, { level: 9 });
    const name = relative(distDir, file).split(sep).join('/');
    const nameBuf = Buffer.from(name, 'utf8');
    const { dosTime, dosDate } = dosDateTime((await stat(file)).mtime);
    const crc = crc32(source);

    const localHeader = Buffer.concat([
      u32(0x04034b50), u16(20), u16(0x0800), u16(8), u16(dosTime), u16(dosDate),
      u32(crc), u32(compressed.length), u32(source.length), u16(nameBuf.length), u16(0), nameBuf,
    ]);
    chunks.push(localHeader, compressed);

    central.push(Buffer.concat([
      u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(8), u16(dosTime), u16(dosDate),
      u32(crc), u32(compressed.length), u32(source.length), u16(nameBuf.length), u16(0), u16(0),
      u16(0), u16(0), u32(0), u32(offset), nameBuf,
    ]));

    offset += localHeader.length + compressed.length;
  }

  const centralOffset = offset;
  const centralBuffer = Buffer.concat(central);
  const end = Buffer.concat([
    u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
    u32(centralBuffer.length), u32(centralOffset), u16(0),
  ]);

  const zip = Buffer.concat([...chunks, centralBuffer, end]);
  await writeFile(outPath, zip);
  return { bytes: zip.length, sha256: createHash('sha256').update(zip).digest('hex') };
}

await stat(distDir).catch(() => {
  throw new Error('dist/ does not exist. Run vite build before creating the release zip.');
});

await rm(releasesDir, { recursive: true, force: true });
await mkdir(releasesDir, { recursive: true });

const files = (await walk(distDir)).sort();
if (files.length === 0) throw new Error('dist/ is empty; no release zip was created.');

const result = await makeZip(files, zipPath);
console.log(`Created ${relative(projectRoot, zipPath)} (${files.length} files, ${result.bytes} bytes)`);
console.log(`SHA256 ${result.sha256}`);
