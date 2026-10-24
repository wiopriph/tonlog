export default defineNuxtConfig({
  compatibilityDate: '2026-10-24',
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  ui: { fonts: false },
  colorMode: { preference: 'light' },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Tonlog — Equipment work and finances, in one place',
      meta: [
        { name: 'description', content: 'Track jobs, repairs, fuel, and finances in one place. Tonlog helps heavy equipment owners understand what each machine earns. Join the early access list.' },
        { name: 'theme-color', content: '#f6f5f0' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true,
      // Keep wrangler.jsonc as the single deployment configuration, including D1.
      deployConfig: false,
    },
  },
})
