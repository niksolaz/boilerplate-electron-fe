import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-expect-error no routes type
import routes from '~pages'
import App from './App.vue'
import "./style.css"

// Locales
import en from './locales/en.json'
import it from './locales/it.json'
import es from './locales/es.json'

declare global {
  interface Window {
    api?: any;
  }
}

const languageStorage = localStorage.getItem('language');

console.log('#####[languageStorage]', languageStorage ? languageStorage : 'en');

const i18n = createI18n({
  legacy: false,
  compositionOnly: true,
  globalInjection: true,
  locale: languageStorage ? languageStorage : 'en',
  fallbackLocale: languageStorage ? languageStorage : 'en',
  messages: {
    en,
    it,
    es
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'long', day: 'numeric',
        weekday: 'long'
      }
    },
    it: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'long', day: 'numeric',
        weekday: 'long'
      }
    },
    es: {
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'long', day: 'numeric',
        weekday: 'long'
      }
    }
  },
  numberFormats: {
    'en': {
      currency: {
        style: 'currency', currency: 'EUR', notation: 'standard'
      },
      milliliter: {
        style: 'unit', unit: 'milliliter', unitDisplay: 'short'
      },
      percentage: {
        style: 'percent', unitDisplay: 'narrow', maximumFractionDigits: 1
      }
    },
    'it': {
      currency: {
        style: 'currency', currency: 'EUR', notation: 'standard'
      },
      milliliter: {
        style: 'unit', unit: 'milliliter', unitDisplay: 'short'
      },
      percentage: {
        style: 'percent', unitDisplay: 'narrow', maximumFractionDigits: 1
      }
    },
    'es': {
      currency: {
        style: 'currency', currency: 'EUR', notation: 'standard'
      },
      milliliter: {
        style: 'unit', unit: 'milliliter', unitDisplay: 'short'
      },
      percentage: {
        style: 'percent', unitDisplay: 'narrow', maximumFractionDigits: 1
      }
    }
  }
})

const router = createRouter({
  history: createWebHashHistory(), // https://router.vuejs.org/api/#createwebhashhistory
  routes
})


const pinia = createPinia()

createApp(App)
  .use(router)
  .use(i18n)
  .use(pinia)
  .mount('#app')
