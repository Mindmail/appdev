import { resolve } from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs'],
      strictRequires: true,
      // https://stackoverflow.com/questions/62770883/how-to-include-both-import-and-require-statements-in-the-bundle-using-rollup
      transformMixedEsModules: true,
    },
  },
  define: {
    _global: {},
  },
  plugins: [react(), EnvironmentPlugin(['VITE_APP_TEXT'])],
  publicDir: 'public',
  resolve: {
    alias: [
      { find: './runtimeConfig', replacement: './runtimeConfig.browser' },
      { find: '@', replacement: resolve(__dirname, 'src') },
    ],
  },
  server: {
    host: true,
    port: 3000,
  },
})
