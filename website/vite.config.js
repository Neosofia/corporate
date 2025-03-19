import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { DynamicPublicDirectory } from "vite-multiple-assets";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    DynamicPublicDirectory([
      { 
        input: "public/**",
        output: "/"
      },
      { 
        input: "blog/**",
        output: "/blog"
      },
      { 
        input: "qms/**",
        output: "/qms"
      },
    ])
  ],
  publicDir: false,
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  }
});


