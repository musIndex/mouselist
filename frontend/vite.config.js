// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require("path");

export default defineConfig({
  plugins: [vue()],
  root: './', // Your project root directory
  build: {
      outDir: 'dist', // The directory to output the build files to
      rollupOptions: {
        input: './index.html' // Path to your index.html file
      },
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});