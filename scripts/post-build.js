const fs = require('node:fs');
const path = require('node:path');

const outDir = path.join(__dirname, '..', 'out');
const zhDir = path.join(outDir, 'zh');

fs.rmSync(path.join(outDir, '404.html'));
fs.mkdirSync(zhDir, { recursive: true });
fs.copyFileSync(path.join(outDir, 'zh.html'), path.join(zhDir, 'index.html'));
fs.copyFileSync(path.join(outDir, 'zh.txt'), path.join(zhDir, 'index.txt'));
