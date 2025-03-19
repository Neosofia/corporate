import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { DynamicPublicDirectory } from "vite-multiple-assets";

import Unfonts from 'unplugin-fonts/vite'

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    Unfonts({
      google: {
        families: ['Inter'],
      }
    }
    ),
    DynamicPublicDirectory([
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
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true
    }
  }
});


