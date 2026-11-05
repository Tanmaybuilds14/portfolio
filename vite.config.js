import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // Allow the Arena preview proxy host (*.e2b.app) in dev.
    allowedHosts: true,
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: true,
    port: 4173,
  },
});
