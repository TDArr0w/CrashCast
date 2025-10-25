import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // if you use it

export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0' },        // for `vite` dev server (optional here)
  preview: {
    host: '0.0.0.0',                  // bind to all interfaces
    port: 4173,
    allowedHosts: [
      'ec2-54-85-61-166.compute-1.amazonaws.com',
      '54.85.61.166',  
      'crash-cast.com', 
      'www.crash-cast.com'
    ],
  },
})