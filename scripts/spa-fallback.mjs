import { copyFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const pasta = process.argv[2] ?? 'docs';

copyFileSync(join(pasta, 'index.html'), join(pasta, '404.html'));
writeFileSync(join(pasta, '.nojekyll'), '');

console.log(`Fallback de SPA gerado em ${join(pasta, '404.html')}`);
