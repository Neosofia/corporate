import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { DynamicPublicDirectory } from "vite-multiple-assets";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    DynamicPublicDirectory([
      { 
        input: "blog/**",
        output: "/blog"
      },
      { 
        input: "qms/**",
        output: "/qms"
      },
      { 
        input: "resources/**",
        output: "/resources"
      },
      { 
        input: "public/**",
        output: "/public"
      },
    ]),
  ],
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true, // Enables polling for file changes
      interval: 2500,    // Polling interval in milliseconds
    }
  }
});


