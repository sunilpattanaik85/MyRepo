// Polyfills for Node globals used by some CommonJS libraries in the browser
(window as any).global = window as any;
try {
  (window as any).process = (window as any).process || { env: { NODE_ENV: development } };
} catch {
  (window as any).process = { env: { NODE_ENV: development } } as any;
}
