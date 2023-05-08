import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Import this if you are using the Vite React plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Include this if you are using the Vite React plugin
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
