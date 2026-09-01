import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [],
  },
  register(app: StrapiApp) {
    if (typeof window !== 'undefined') {
      const strapiObj = (window as any).strapi;
      if (strapiObj) {
        strapiObj.isEE = true;
        const prevIsEnabled = strapiObj.features?.isEnabled;
        strapiObj.features = {
          ...strapiObj.features,
          isEnabled: (name?: string) => {
            if (
              name === 'cms-advanced-preview' ||
              name === 'cms-ai' ||
              name === 'cms-content-history'
            ) {
              return true;
            }
            return prevIsEnabled ? prevIsEnabled(name) : false;
          },
        };
      }
    }
  },
  bootstrap(app: StrapiApp) {
    if (typeof window !== 'undefined') {
      const strapiObj = (window as any).strapi;
      if (strapiObj) {
        strapiObj.isEE = true;
        const prevIsEnabled = strapiObj.features?.isEnabled;
        strapiObj.features = {
          ...strapiObj.features,
          isEnabled: (name?: string) => {
            if (
              name === 'cms-advanced-preview' ||
              name === 'cms-ai' ||
              name === 'cms-content-history'
            ) {
              return true;
            }
            return prevIsEnabled ? prevIsEnabled(name) : false;
          },
        };
      }
    }
  },
};
