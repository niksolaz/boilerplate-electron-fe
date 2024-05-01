import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import electron from 'vite-plugin-electron'
import { ElectronOptions } from 'vite-plugin-electron'
import pkg from './package.json'
import svgLoader from 'vite-svg-loader'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    svelte(),
    svgLoader({ defaultImport: 'component' }),
    Pages(),
    electron([
      {
        entry: 'electron/main.ts',
        onstart(options: any) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          } else {
            options.startup()
          }
        },
        vite: {
          build: {
            sourcemap: "development" ,
            minify: false,  //isProduction, // todo: enable minification and check why it breaks the app into main.js
            outDir: 'dist-electron/',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {} as any)
            }
          }
        }
      },
      {
        entry: 'electron/preload.ts',
        onstart(options: any) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          } else {
            options.startup()
          }
        },
        vite: {
          build: {
            sourcemap: "development" ,
            minify: false,  //isProduction, // todo: enable minification and check why it breaks the app into preload.js
            outDir: 'dist-electron/',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {} as any)
            }
          }
        }
      },
   ] as ElectronOptions),
  ],
  build: {
    // Remove the 'entry' property
  },
})
    
