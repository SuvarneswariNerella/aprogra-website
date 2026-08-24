import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_columns';
  info: {
    displayName: 'Footer Column';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.footer-link', true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_footer_links';
  info: {
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    badge: Schema.Attribute.String;
    badgeColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'orange'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsNavLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_nav_links';
  info: {
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    platform: Schema.Attribute.Enumeration<
      [
        'github',
        'linkedin',
        'twitter',
        'x',
        'instagram',
        'youtube',
        'discord',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'github'>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBlogHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_hero_sections';
  info: {
    displayName: 'Blog Hero Section';
    icon: 'layout';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'APROGRA TECH RADAR \u2022 ENGINEERING BLOG'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Deep architectural breakdowns, real-world agentic AI workflows, modern web design systems, and enterprise systems engineering directly from our architects.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering, AI &'>;
    heroImage: Schema.Attribute.Media<'images'>;
    heroImageUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80'>;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Product Insights.'>;
    metric1_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'45+ Articles'>;
    metric2_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'12k+ Monthly Readers'>;
    metric3_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Weekly Technical Deep Dives'>;
    searchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search articles by tech stack, topic, or keyword...'>;
  };
}

export interface SectionsFooterConfig extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_configs';
  info: {
    displayName: 'Footer Config';
    icon: 'layout';
  };
  attributes: {
    backToTopText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Back to top'>;
    badge1_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SOC2 Type II'>;
    badge2_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'San Francisco & Global'>;
    brandSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technologies'>;
    brandTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Aprogra'>;
    columns: Schema.Attribute.Component<'elements.footer-column', true>;
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2026 Aprogra Technologies Inc. All rights reserved.'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Engineering Infinite Possibilities. Full-cycle custom software, autonomous AI platforms, and mission-critical cloud systems built for hyper-scale enterprises.'>;
    displayMode: Schema.Attribute.Enumeration<
      ['logo_and_text', 'logo_only', 'text_only']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'logo_and_text'>;
    legalLinks: Schema.Attribute.Component<'elements.footer-link', true>;
    logo: Schema.Attribute.Media<'images'>;
    logoUrl: Schema.Attribute.String;
    socialLinks: Schema.Attribute.Component<'elements.social-link', true>;
    statusText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'All Systems Operational \u2022 99.99% Uptime'>;
  };
}

export interface SectionsHeaderConfig extends Struct.ComponentSchema {
  collectionName: 'components_sections_header_configs';
  info: {
    displayName: 'Header Config';
    icon: 'layout';
  };
  attributes: {
    displayMode: Schema.Attribute.Enumeration<
      ['logo_and_text', 'logo_only', 'text_only']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'logo_and_text'>;
    logo: Schema.Attribute.Media<'images'>;
    logoUrl: Schema.Attribute.String;
    navLinks: Schema.Attribute.Component<'elements.nav-link', true>;
    siteTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Aprogra'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'elements.footer-column': ElementsFooterColumn;
      'elements.footer-link': ElementsFooterLink;
      'elements.nav-link': ElementsNavLink;
      'elements.social-link': ElementsSocialLink;
      'sections.blog-hero-section': SectionsBlogHeroSection;
      'sections.footer-config': SectionsFooterConfig;
      'sections.header-config': SectionsHeaderConfig;
    }
  }
}
