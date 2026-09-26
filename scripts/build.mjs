import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const nextCli = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const child = spawn(process.execPath, [nextCli, 'build'], {
  env: { ...process.env, CSI_BUILD_OUTPUT: '1' },
  stdio: 'inherit',
});

child.on('exit', (code) => process.exit(code ?? 1));
