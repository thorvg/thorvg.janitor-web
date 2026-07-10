import { defineConfig } from 'vite';

// The multi-threaded ThorVG build relies on SharedArrayBuffer / pthreads, which
// browsers only expose to cross-origin-isolated pages. These headers opt the
// dev and preview servers into isolation so the "Thread" setting can work.
const crossOriginIsolation = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

export default defineConfig({
  server: { headers: crossOriginIsolation },
  preview: { headers: crossOriginIsolation },
});
