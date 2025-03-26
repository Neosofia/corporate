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
    ])
  ],
  base: "/",
  server: {
    host: '0.0.0.0',
    port: 3000,
  }
});


