import { rmSync, readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import Pages from 'vite-plugin-pages'
// import renderer from 'vite-plugin-electron-renderer'
import svgLoader from 'vite-svg-loader'
import pkg from './package.json'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

rmSync('dist-electron', { recursive: true, force: true })

const isDevelopment = process.env.NODE_ENV === "development" || !!process.env.VSCODE_DEBUG
const isProduction = process.env.NODE_ENV === "production"

const listElectronEventsPaths = readdirSync('electron/main/events/').map(file => `electron/main/events/${file}`)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      runtimeOnly: isDevelopment,
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**'),
    }),
    svgLoader({ defaultImport: 'component' }),
    Pages(), // todo: this plugin is kinda deprecated, change it for the one suggested at: https://github.com/hannoeru/vite-plugin-pages#vue
    electron([
      {
        // Main-Process entry file of the Electron App.
        entry: 'electron/main/index.ts',
        onstart(options) {
          if (process.env.VSCODE_DEBUG) {
            console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App')
          } else {
            options.startup()
          }
        },
        vite: {
          build: {
            sourcemap: isDevelopment,
            minify: false,  //isProduction, // todo: enable minification and check why it breaks the app into main.js
            outDir: 'dist-electron/main',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
            }
          }
        }
      },
      {
        entry: 'electron/preload/index.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
        vite: {
          build: {
            sourcemap: isDevelopment,
            minify: false, //isProduction,
            outDir: 'dist-electron/preload',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
            }
          }
        }
      },
      {
        entry: listElectronEventsPaths,
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
        vite: {
          build: {
            sourcemap: isDevelopment,
            minify: false, //isProduction,
            outDir: 'dist-electron/main/events/',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
            }
          }
        }
      },
      {
        entry: 'electron/env.ts',
        onstart(options) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
          // instead of restarting the entire Electron App.
          options.reload()
        },
        vite: {
          build: {
            sourcemap: isDevelopment,
            minify: false, //isProduction,
            outDir: 'dist-electron/',
            rollupOptions: {
              external: Object.keys("dependencies" in pkg ? pkg.dependencies : {})
            }
          }
        }
      }
    ])
  ],
  server: !!process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port
    }
  })() : undefined,
  clearScreen: false,
  build: {
    sourcemap: true
  }
})
