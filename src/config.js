function config() {
  switch (process.env.VUE_APP_APP_ENV) {
    case 'staging':
      return {
        baseURL: process.env.VUE_APP_STAGING_API_URL,
        indexName: 'staging_CASES',
      };
    case 'production':
      return {
        baseURL: process.env.VUE_APP_API_URL,
        indexName: 'CASES',
      };
    default:
      return {
        baseURL: process.env.VUE_APP_DEV_API_BASE_URL,
        indexName: 'dev_CASES',
      };
  }
}

export default config();