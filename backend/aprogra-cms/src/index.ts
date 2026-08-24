import type { Core } from '@strapi/strapi';

const DEFAULT_GLOBAL_CONFIG_SEED_DATA = {
  header: {
    siteTitle: 'Aprogra',
    displayMode: 'logo_and_text' as const,
    logoUrl: '',
    navLinks: [
      { label: 'Home', url: '/', order: 1, isExternal: false },
      { label: 'About', url: '/about', order: 2, isExternal: false },
      { label: 'Products', url: '/products', order: 3, isExternal: false },
      { label: 'Services', url: '/services', order: 4, isExternal: false },
      { label: 'Blog', url: '/blog', order: 5, isExternal: false },
      { label: 'Contact', url: '/contact', order: 6, isExternal: false },
    ],
  },
  footer: {
    brandTitle: 'Aprogra',
    brandSubtitle: 'Technologies',
    displayMode: 'logo_and_text' as const,
    logoUrl: '',
    description: 'Engineering Infinite Possibilities. Full-cycle custom software, autonomous AI platforms, and mission-critical cloud systems built for hyper-scale enterprises.',
    statusText: 'All Systems Operational • 99.99% Uptime',
    badge1_text: 'SOC2 Type II',
    badge2_text: 'San Francisco & Global',
    columns: [
      {
        title: 'Products & Platforms',
        order: 1,
        links: [
          { label: 'SmartSchool ERP', url: '/products/school-erp', badge: 'v3.2', badgeColor: 'orange', isExternal: false, order: 1 },
          { label: 'OmniChat AI Suite', url: '/products/omnichat', badge: 'Active', badgeColor: 'green', isExternal: false, order: 2 },
          { label: 'Enterprise Product Suite', url: '/products', isExternal: false, order: 3 },
          { label: 'Custom Platform Request', url: '/services', isExternal: false, order: 4 },
          { label: 'Architecture Sandbox', url: '/contact', isExternal: false, order: 5 },
        ],
      },
      {
        title: 'Services & Solutions',
        order: 2,
        links: [
          { label: 'Full-Stack Cloud Systems', url: '/services', isExternal: false, order: 1 },
          { label: 'Autonomous AI & LLM Agents', url: '/services', isExternal: false, order: 2 },
          { label: 'Native & Cross-Platform Apps', url: '/services', isExternal: false, order: 3 },
          { label: 'DevOps & Infrastructure', url: '/services', isExternal: false, order: 4 },
          { label: 'Legacy Modernization Audits', url: '/services', isExternal: false, order: 5 },
        ],
      },
      {
        title: 'Company',
        order: 3,
        links: [
          { label: 'About Aprogra', url: '/about', isExternal: false, order: 1 },
          { label: 'Engineering Journal', url: '/blog', isExternal: false, order: 2 },
          { label: 'Careers', url: '/careers', badge: 'Hiring', badgeColor: 'dark', isExternal: false, order: 3 },
          { label: 'Contact Architects', url: '/contact', isExternal: false, order: 4 },
        ],
      },
    ],
    socialLinks: [
      { platform: 'github' as const, label: 'GitHub', url: 'https://github.com', order: 1 },
      { platform: 'linkedin' as const, label: 'LinkedIn', url: 'https://linkedin.com', order: 2 },
      { platform: 'twitter' as const, label: 'X Twitter', url: 'https://twitter.com', order: 3 },
    ],
    legalLinks: [
      { label: 'Privacy Policy', url: '/contact', isExternal: false, order: 1 },
      { label: 'Terms of Service', url: '/contact', isExternal: false, order: 2 },
      { label: 'Security & Compliance', url: '/contact', isExternal: false, order: 3 },
      { label: 'Cookie Settings', url: '/contact', isExternal: false, order: 4 },
    ],
    copyrightText: '© 2026 Aprogra Technologies Inc. All rights reserved.',
    backToTopText: 'Back to top',
  },
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      // 1. Grant public permission to global-config
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
        populate: ['permissions'],
      });

      if (publicRole) {
        const action = 'api::global-config.global-config.find';
        const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: { role: publicRole.id, action },
        });

        if (!existing) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id,
            },
          });
          strapi.log.info('[Bootstrap] Granted Public permission for global-config.find');
        }
      }

      // 2. Initialize or sync Global Config Single Type
      const strapiAny = strapi as any;
      const existingConfig = await strapiAny.documents('api::global-config.global-config').findFirst();

      if (!existingConfig) {
        await strapiAny.documents('api::global-config.global-config').create({
          data: DEFAULT_GLOBAL_CONFIG_SEED_DATA,
          status: 'published',
        });
        strapi.log.info('[Bootstrap] Created and published Header & Footer Global Configuration in Strapi.');
      } else {
        await strapiAny.documents('api::global-config.global-config').update({
          documentId: existingConfig.documentId,
          data: DEFAULT_GLOBAL_CONFIG_SEED_DATA,
        });
        strapi.log.info('[Bootstrap] Synchronized Header & Footer Global Configuration in Strapi.');
      }
    } catch (err: any) {
      strapi.log.warn('[Bootstrap] Global config auto-setup notice:', err?.message || err);
    }
  },
};
