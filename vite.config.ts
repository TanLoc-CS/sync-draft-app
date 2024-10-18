import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/sync-draft/",

  // server: {
  //   port: 3000
  // },

  plugins: [
    react(),
    tsconfigPaths(),
    nodePolyfills(),
    wasm(),
    topLevelAwait()
  ],
  worker: {
    format: "es",
    plugins: () => [wasm()],
  },
})
