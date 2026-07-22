import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

// The multi-threaded ThorVG build relies on SharedArrayBuffer
// Cross-Origin-Embedder-Policy required
const crossOriginIsolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

const THREAD_SHIM = 'import "./webcanvas.esm.js";\n';

function thorvgThread(): Plugin {
  const require = createRequire(import.meta.url);
  const threadDir = path.join(path.dirname(require.resolve('@thorvg/webcanvas')), 'thread');
  const files = ['webcanvas.esm.js', 'webcanvas.esm.js.map', 'thorvg.wasm'];
  const mimes: Record<string, string> = {
    '.js': 'text/javascript',
    '.map': 'application/json',
    '.wasm': 'application/wasm',
  };

  return {
    name: 'thorvg-thread',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = req.url?.match(/^\/thorvg-thread\/([^?]+)/)?.[1];
        if (!name || (name !== 'thorvg.js' && !files.includes(name))) return next();
        //worker scripts must carry COEP themselves to load in an isolated page
        for (const [key, value] of Object.entries(crossOriginIsolation)) res.setHeader(key, value);
        res.setHeader('Content-Type', mimes[path.extname(name)]);
        res.end(name === 'thorvg.js' ? THREAD_SHIM : readFileSync(path.join(threadDir, name)));
      });
    },
    generateBundle() {
      for (const name of files) {
        this.emitFile({
          type: 'asset',
          fileName: `thorvg-thread/${name}`,
          source: readFileSync(path.join(threadDir, name)),
        });
      }
      this.emitFile({ type: 'asset', fileName: 'thorvg-thread/thorvg.js', source: THREAD_SHIM });
    },
  };
}

export default defineConfig({
  plugins: [thorvgThread()],
  server: { headers: crossOriginIsolation },
  preview: { headers: crossOriginIsolation },
});
