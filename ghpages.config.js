import commonConfig from './nuxt.config';

export default {
  ...commonConfig,
  axios: {
    baseURL: 'https://suikwasha.github.io/'
  },
  generate: {
    dir: 'docs'
  },
  router: {
    base: "passgen"
  },
  env: {
    services: './services.json'
  }
}
