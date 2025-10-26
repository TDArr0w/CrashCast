// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    // <-- THIS is what the running `vite` dev server actually reads
    allowedHosts: [
      'crash-cast.com',
      'www.crash-cast.com',
      '13.216.14.117',
      'ec2-54-85-61-166.compute-1.amazonaws.com'
    ],
    // optional: if HMR is fussy behind proxies, you can pin it:
    // hmr: { host: 'crash-cast.com', clientPort: 5173 },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'ec2-54-85-61-166.compute-1.amazonaws.com',
      '54.85.61.166',
      '13.216.14.117',
      'crash-cast.com',
      'www.crash-cast.com'
    ],
  },
})
