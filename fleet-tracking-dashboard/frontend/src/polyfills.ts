// Polyfills for Node globals used by some CommonJS libraries in the browser
(window as any).global = window as any;
(window as any).process = (window as any).process || { env: { NODE_ENV: development } };
