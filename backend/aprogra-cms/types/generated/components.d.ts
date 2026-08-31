import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsAboutFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_about_faq_items';
  info: {
    description: 'Single FAQ item for the About page';
    displayName: 'About FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    category: Schema.Attribute.String & Schema.Attribute.DefaultTo<'General'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsContactChannel extends Struct.ComponentSchema {
  collectionName: 'components_elements_contact_channels';
  info: {
    description: 'Direct communication channel card';
    displayName: 'Contact Channel';
    icon: 'phone';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    iconName: Schema.Attribute.Enumeration<
      ['mail', 'phone', 'map-pin', 'globe', 'message-square']
    > &
      Schema.Attribute.DefaultTo<'mail'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    primaryValue: Schema.Attribute.String & Schema.Attribute.Required;
    subtext: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['email', 'phone', 'office', 'hub', 'custom']
    > &
      Schema.Attribute.DefaultTo<'email'>;
  };
}

export interface ElementsCultureItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_culture_items';
  info: {
    description: 'Operating principle or culture card';
    displayName: 'Culture Item';
    icon: 'shieldCheck';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsDeliverableItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_deliverable_items';
  info: {
    description: 'Single deliverable bullet point';
    displayName: 'Deliverable Item';
    icon: 'bulletList';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface ElementsHomeHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_hero_slides';
  info: {
    description: 'A scroll phase slide for the Home Hero section';
    displayName: 'Home Hero Slide';
    icon: 'picture';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Modern Software & AI'>;
    image: Schema.Attribute.Media<'images'>;
    imageLabel: Schema.Attribute.String;
    imageSublabel: Schema.Attribute.String;
    imageUrl: Schema.Attribute.String;
    primaryValue: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    tags: Schema.Attribute.Component<'elements.option-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsHomeProductCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_product_cards';
  info: {
    description: 'Stacked card for Products We Own section';
    displayName: 'Home Product Card';
    icon: 'apps';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'NOTIFICATION 01 / 02 \u2022 SCHOOL ERP'>;
    category: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EdTech Platform'>;
    categorySubtext: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Multi-Campus Ready'>;
    demoUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/contact'>;
    demoUrlText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Request Demo \u2192'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    productUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/products'>;
    productUrlText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View Product Details'>;
    specs: Schema.Attribute.Component<'elements.option-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    versionStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'v3.2 OPERATIONAL'>;
  };
}

export interface ElementsHomeServiceSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_service_slides';
  info: {
    description: 'Horizontal sliding card for Services section on homepage';
    displayName: 'Home Service Slide';
    icon: 'layer';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Core Service'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    orderNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'01'>;
    serviceUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/services'>;
    serviceUrlText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Service'>;
    tags: Schema.Attribute.Component<'elements.option-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsHomeStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_stats';
  info: {
    description: 'A single stat for the home page counters';
    displayName: 'Home Stat';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String & Schema.Attribute.DefaultTo<'+'>;
    target: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ElementsHomeStatement extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_statements';
  info: {
    description: 'Large typography scrolling statement';
    displayName: 'Home Statement';
    icon: 'cursor';
  };
  attributes: {
    mainText: Schema.Attribute.String & Schema.Attribute.Required;
    subText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsHomeStoryPhase extends Struct.ComponentSchema {
  collectionName: 'components_elements_home_story_phases';
  info: {
    description: 'A scrolling phase in the About Company narrative';
    displayName: 'Home Story Phase';
    icon: 'book';
  };
  attributes: {
    badgeText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    showMetricsGrid: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsKpiStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_kpi_stats';
  info: {
    description: 'Hero section KPI metric stat';
    displayName: 'KPI Stat';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ElementsOptionItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_option_items';
  info: {
    description: 'Single option or bullet point';
    displayName: 'Option Item';
    icon: 'bulletList';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPanelHighlight extends Struct.ComponentSchema {
  collectionName: 'components_elements_panel_highlights';
  info: {
    description: 'Highlight row for parallax panels (Who We Are / Vision)';
    displayName: 'Panel Highlight';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPillarItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_pillar_items';
  info: {
    description: 'Hero section pillar/capability item';
    displayName: 'Pillar Item';
    icon: 'layout';
  };
  attributes: {
    accentColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#FF4A1C'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Layers'>;
    orderNumber: Schema.Attribute.String & Schema.Attribute.DefaultTo<'01'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsProductFeature extends Struct.ComponentSchema {
  collectionName: 'components_elements_product_features';
  info: {
    description: 'Product feature / campus module item';
    displayName: 'Product Feature Module';
    icon: 'puzzle';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlights: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Users'>;
    image: Schema.Attribute.Media<'images'>;
    metricLabel: Schema.Attribute.String;
    metricValue: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsRoadmapStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_roadmap_steps';
  info: {
    description: 'Lifecycle engagement step';
    displayName: 'Roadmap Step';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    timeframe: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsServiceFlipCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_service_flip_cards';
  info: {
    description: '3D Flip Card for the Services page discipline grid';
    displayName: 'Service Flip Card';
    icon: 'grid';
  };
  attributes: {
    actionText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Inspect Architecture'>;
    actionUrl: Schema.Attribute.String;
    cardOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#3B82F6'>;
    coverImage: Schema.Attribute.Media<'images'>;
    coverImageUrl: Schema.Attribute.String;
    deliverables: Schema.Attribute.Component<'elements.deliverable-item', true>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      [
        'web',
        'ai',
        'saas',
        'design',
        'cloud',
        'mobile',
        'security',
        'database',
        'sparkles',
      ]
    > &
      Schema.Attribute.DefaultTo<'web'>;
    iconMedia: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsServiceShowcaseItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_service_showcase_items';
  info: {
    description: 'Horizontal showcase and architecture deep-dive discipline item';
    displayName: 'Service Showcase Item';
    icon: 'compass';
  };
  attributes: {
    accentColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#3B82F6'>;
    cardOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    category: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Core Engineering'>;
    customUrl: Schema.Attribute.String;
    deliverables: Schema.Attribute.Component<'elements.deliverable-item', true>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Enumeration<
      [
        'web',
        'ai',
        'saas',
        'design',
        'cloud',
        'mobile',
        'security',
        'database',
        'sparkles',
      ]
    > &
      Schema.Attribute.DefaultTo<'web'>;
    iconMedia: Schema.Attribute.Media<'images'>;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    kpiLabel: Schema.Attribute.String;
    kpiNumber: Schema.Attribute.String;
    shortSummary: Schema.Attribute.Text;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.String;
    tabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Discipline'>;
    tags: Schema.Attribute.Component<'elements.tech-tag', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface ElementsTeamSkill extends Struct.ComponentSchema {
  collectionName: 'components_elements_team_skills';
  info: {
    description: 'A single skill tag for a team member';
    displayName: 'Team Skill';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechTag extends Struct.ComponentSchema {
  collectionName: 'components_elements_tech_tags';
  info: {
    description: 'Tech stack tag';
    displayName: 'Tech Tag';
    icon: 'tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTrustItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_trust_items';
  info: {
    description: 'Why Teams Trust Aprogra metric item';
    displayName: 'Trust Item';
    icon: 'shieldCheck';
  };
  attributes: {
    actionText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn More'>;
    badge: Schema.Attribute.String;
    decimals: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    href: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/contact'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    prefix: Schema.Attribute.String;
    suffix: Schema.Attribute.String;
    target: Schema.Attribute.Decimal & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsAboutContactCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_cta_sections';
  info: {
    description: 'Contact CTA section at the bottom of the About page';
    displayName: 'About Contact CTA';
    icon: 'phone';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"LET'S CONNECT">;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Submit Project Brief'>;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/contact'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Whether you have a fully scoped product brief or just an ambitious concept, our technical architects are standing by to explore your vision.'>;
    email: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'hello@aprogra.com'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Ready to Build Something Infinite?'>;
    officeLocation: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hyderabad, India \u2022 Global Remote Pods'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+1 (800) 555-0199'>;
  };
}

export interface SectionsAboutFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_faq_sections';
  info: {
    description: 'FAQ Accordion section for About Us page';
    displayName: 'About FAQ Section';
    icon: 'question';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Got Questions?'>;
    description: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'And honest answers to all of them.'>;
    faqs: Schema.Attribute.Component<'elements.about-faq-item', true>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Questions We Actually Get Asked'>;
  };
}

export interface SectionsAboutHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_heroes';
  info: {
    description: 'Hero section of the About page';
    displayName: 'About Hero Section';
    icon: 'layout';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full-Stack Engineering & AI Studio'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Architecting the Future of High-Scale Software & Autonomous Intelligence'>;
    heroImage: Schema.Attribute.Media<'images'>;
    kpiStats: Schema.Attribute.Component<'elements.kpi-stat', true>;
    primaryCtaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Start Your Brief'>;
    primaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    secondaryCtaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Our Story'>;
    secondaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#story'>;
    subheadline: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We combine senior-only engineering pods with proprietary SaaS engines to build mission-critical web platforms, AI agents, and enterprise design systems for ambitious global businesses.'>;
  };
}

export interface SectionsAboutMission extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_missions';
  info: {
    description: 'Story Panel 02: Our Mission';
    displayName: 'About Panel: Our Mission';
    icon: 'bulletList';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Mission'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Our mission is simple \u2014 engineer products that solve real problems, for real people, with real business impact. We measure success not in lines of code but in businesses transformed.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Build software that actually matters.'>;
    missionQuote: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'"To make world-class engineering accessible to every visionary who dares to build."'>;
  };
}

export interface SectionsAboutParallaxPanel extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_parallax_panels';
  info: {
    description: 'A single repeatable parallax panel for the About page story section (Who We Are, Mission, Vision, etc.)';
    displayName: 'About Parallax Panel';
    icon: 'stack';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Who We Are'>;
    coverImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Exceptional software demands exceptional people working in exceptional ways.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Not just another dev shop.'>;
    highlightRows: Schema.Attribute.Component<'elements.panel-highlight', true>;
    missionQuote: Schema.Attribute.Text;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<1>;
    type: Schema.Attribute.Enumeration<
      ['who_we_are', 'mission', 'vision', 'custom']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'custom'>;
    visionBadgeYear: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'2030 Vision'>;
  };
}

export interface SectionsAboutStorySlide extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_story_slides';
  info: {
    description: 'Repeatable alternating story slide for About Us page (Who We Are, Mission, Vision, etc.)';
    displayName: 'About Story Slide';
    icon: 'stack';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Who We Are'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'AProgra was built on a single belief \u2014 that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Not just another dev shop.'>;
    highlights: Schema.Attribute.Component<'elements.panel-highlight', true>;
    image: Schema.Attribute.Media<'images'>;
    imageUrl: Schema.Attribute.String;
    orderNumber: Schema.Attribute.String & Schema.Attribute.DefaultTo<'01'>;
    quote: Schema.Attribute.Text;
  };
}

export interface SectionsAboutVision extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_visions';
  info: {
    description: 'Story Panel 03: Our Vision';
    displayName: 'About Panel: Our Vision';
    icon: 'eye';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Vision'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We envision a world where founders and enterprises can build, scale, and transform their digital capabilities with zero compromise on engineering standards or velocity.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'The engineering partner for the next generation of global tech leaders.'>;
    highlights: Schema.Attribute.Component<'elements.panel-highlight', true>;
  };
}

export interface SectionsAboutWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_sections_about_who_we_ares';
  info: {
    description: 'Story Panel 01: Who We Are';
    displayName: 'About Panel: Who We Are';
    icon: 'userCheck';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Who We Are'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'AProgra was built on a single belief \u2014 that exceptional software demands exceptional people working in exceptional ways. No outsourcing. No middlemen. Just a team that cares about your product as much as you do.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Not just another dev shop.'>;
    highlights: Schema.Attribute.Component<'elements.panel-highlight', true>;
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

export interface SectionsContactBrief extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_briefs';
  info: {
    description: 'Interactive contact and project brief form settings';
    displayName: 'Contact Brief Form Section';
    icon: 'write';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'02 / INTERACTIVE SPECIFICATION'>;
    budgetQuestion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Expected Investment Range'>;
    budgetRangesList: Schema.Attribute.Component<'elements.option-item', true>;
    capabilitiesList: Schema.Attribute.Component<'elements.option-item', true>;
    capabilitiesQuestion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What capabilities do you require?'>;
    fieldCompanyLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Company / Organization (optional)'>;
    fieldCompanyPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'e.g. NextGen SaaS or Stealth Startup'>;
    fieldEmailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Work Email *'>;
    fieldEmailPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'alex@company.com'>;
    fieldNameLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Your Name *'>;
    fieldNamePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'e.g. Alex Morgan'>;
    formHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Project Requirements Form'>;
    formSubheading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Select your project attributes to help us match the right technical team.'>;
    messagePlaceholder: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Describe your current tech stack, desired architecture, target timeline, and success criteria...'>;
    messageQuestion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Project Overview & Objectives *'>;
    submitButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SUBMIT PROJECT BRIEF'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Fill out the brief below to generate your custom project preview and start a direct conversation with our technical team.'>;
    successTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Project Brief Received!'>;
    timelineQuestion: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Target Timeline'>;
    timelineRangesList: Schema.Attribute.Component<
      'elements.option-item',
      true
    >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Configure Your Project Brief'>;
  };
}

export interface SectionsContactHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_heroes';
  info: {
    description: 'Contact page top hero and direct info bar';
    displayName: 'Contact Hero Section';
    icon: 'layout';
  };
  attributes: {
    availabilityBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ACCEPTING SELECT H2 / Q3 2026 ENGAGEMENTS'>;
    bookIntroCallButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book 15-Min Intro Call'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Have a breakthrough product, an enterprise platform to scale, or an AI workflow to automate? Connect directly with our lead architects to turn your vision into production-ready software.'>;
    directChannelsTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DIRECT CHANNELS'>;
    email: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'hello@aprogra.com'>;
    emailCopyButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Copy'>;
    emailLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'PRIMARY INQUIRIES'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Engineering Partnerships &'>;
    heroImage: Schema.Attribute.Media<'images'>;
    heroImageUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80'>;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Project Inquiries.'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+1 (800) 555-0199'>;
    phoneCopyButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Copy'>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DIRECT PHONE LINE'>;
    podStatus: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Active Pods Online'>;
    primaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Start Your Brief'>;
    secondaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Schedule Intro Call'>;
    slaBadge1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'< 2 hrs Response SLA'>;
    slaBadge2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'100% NDA Protected'>;
    slaBadge3: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Lead Architect Access'>;
    studioHqLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'STUDIO HQ'>;
    studioHqValue: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hyderabad, India \u2022 Global Remote Pods'>;
  };
}

export interface SectionsContactModal extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_modals';
  info: {
    description: 'Intro call modal settings';
    displayName: 'Contact Modal Section';
    icon: 'calendar';
  };
  attributes: {
    submitButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Confirm Calendar Reservation'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Directly with our Lead Solutions Architect. 15 minutes to evaluate technical fit.'>;
    successTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Call Reserved!'>;
    timeSlots: Schema.Attribute.Component<'elements.option-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering Kickoff Call'>;
    topicOptions: Schema.Attribute.Component<'elements.option-item', true>;
  };
}

export interface SectionsContactPreview extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_previews';
  info: {
    description: 'Right side live project draft preview';
    displayName: 'Contact Preview Section';
    icon: 'eye';
  };
  attributes: {
    capabilitiesLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Capabilities in Scope'>;
    cardBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'LIVE DRAFT'>;
    cardTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'REAL-TIME BRIEF SPECIFICATION'>;
    engagementSteps: Schema.Attribute.Component<'elements.roadmap-step', true>;
    engagementTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engagement Architecture'>;
    guarantee1_desc: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'100% IP Protection'>;
    guarantee1_title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Strict Mutual NDA'>;
    guarantee2_desc: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Bank-grade security'>;
    guarantee2_title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SOC2 Type II'>;
    guaranteesTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enterprise Guarantees'>;
    investmentLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Investment'>;
    readyReviewText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ready for Review'>;
    slaResponseText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SLA: < 2 hrs Response SLA'>;
    timelineLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Timeline'>;
    videoButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'BOOK A 15-MIN INTRO CALL'>;
    videoDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Schedule an immediate 15-minute intro with our engineering leads to talk through your platform requirements.'>;
    videoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Prefer a face-to-face video call?'>;
  };
}

export interface SectionsContactRoadmap extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_roadmaps';
  info: {
    description: 'Lifecycle and timeline steps on contact page';
    displayName: 'Contact Roadmap Section';
    icon: 'bulletList';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'01 / ENGAGEMENT LIFECYCLE'>;
    steps: Schema.Attribute.Component<'elements.roadmap-step', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'From First Contact to Sprint 1'>;
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

export interface SectionsHomeStatsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_home_stats_sections';
  info: {
    description: 'The wrapper section for the homepage statistics';
    displayName: 'Home Stats Section';
    icon: 'apps';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'PROVEN PERFORMANCE & GLOBAL FOOTPRINT'>;
    stats: Schema.Attribute.Component<'elements.home-stat', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsServicesCardsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_cards_sections';
  info: {
    description: 'Header settings for the flip cards section on the Services page';
    displayName: 'Services Cards Section Settings';
    icon: 'grid';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CORE DISCIPLINES'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Hover or tap each discipline card to inspect deliverables, architecture patterns, and engineering capabilities.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering Without Compromise'>;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Pillars of Excellence'>;
  };
}

export interface SectionsServicesClosingCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_closing_ctas';
  info: {
    description: 'Closing banner for the Services page with editable headline and CTA buttons';
    displayName: 'Services Closing CTA';
    icon: 'bullhorn';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'READY TO SHIP?'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Whether you need a dedicated engineering pod or an end-to-end autonomous AI system, we are ready to build.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Let's build what's next">;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Together.'>;
    primaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Schedule Architecture Review'>;
    primaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    secondaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Our Products'>;
    secondaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/products'>;
  };
}

export interface SectionsServicesFeaturesSection
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_features_sections';
  info: {
    description: 'Header settings for the deep-dive features and discipline tabs showcase';
    displayName: 'Services Features Section Settings';
    icon: 'compass';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DISCIPLINE DEEP-DIVES'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Navigate through each specialized engineering domain to explore architecture blueprints, tech stacks, and performance benchmarks.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineered for Extreme Scale'>;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Capabilities in Depth'>;
  };
}

export interface SectionsServicesHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_hero_sections';
  info: {
    description: 'Hero section for the Services page with editable content, points, and right-side image';
    displayName: 'Services Hero Section';
    icon: 'layout';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'CORE ENGINEERING & AI CAPABILITIES'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We engineer resilient multi-tenant architectures, high-performance web systems, and autonomous agent pipelines for visionary enterprises.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Architecting High-Throughput Cloud &'>;
    heroImage: Schema.Attribute.Media<'images'>;
    heroImageUrl: Schema.Attribute.String;
    highlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Autonomous AI Systems'>;
    point1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Zero Architectural Debt & 99.99% Availability'>;
    point2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sub-Second Edge Telemetry & Real-Time Sync'>;
    point3: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Bank-Grade SOC2 Security & Tenant Partitioning'>;
    primaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Schedule Architectural Brief'>;
    primaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    secondaryCtaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Capabilities'>;
    secondaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#services-cards-overview'>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'elements.about-faq-item': ElementsAboutFaqItem;
      'elements.contact-channel': ElementsContactChannel;
      'elements.culture-item': ElementsCultureItem;
      'elements.deliverable-item': ElementsDeliverableItem;
      'elements.footer-column': ElementsFooterColumn;
      'elements.footer-link': ElementsFooterLink;
      'elements.home-hero-slide': ElementsHomeHeroSlide;
      'elements.home-product-card': ElementsHomeProductCard;
      'elements.home-service-slide': ElementsHomeServiceSlide;
      'elements.home-stat': ElementsHomeStat;
      'elements.home-statement': ElementsHomeStatement;
      'elements.home-story-phase': ElementsHomeStoryPhase;
      'elements.kpi-stat': ElementsKpiStat;
      'elements.nav-link': ElementsNavLink;
      'elements.option-item': ElementsOptionItem;
      'elements.panel-highlight': ElementsPanelHighlight;
      'elements.pillar-item': ElementsPillarItem;
      'elements.product-feature': ElementsProductFeature;
      'elements.roadmap-step': ElementsRoadmapStep;
      'elements.service-flip-card': ElementsServiceFlipCard;
      'elements.service-showcase-item': ElementsServiceShowcaseItem;
      'elements.social-link': ElementsSocialLink;
      'elements.team-skill': ElementsTeamSkill;
      'elements.tech-tag': ElementsTechTag;
      'elements.trust-item': ElementsTrustItem;
      'sections.about-contact-cta': SectionsAboutContactCta;
      'sections.about-faq-section': SectionsAboutFaqSection;
      'sections.about-hero': SectionsAboutHero;
      'sections.about-mission': SectionsAboutMission;
      'sections.about-parallax-panel': SectionsAboutParallaxPanel;
      'sections.about-story-slide': SectionsAboutStorySlide;
      'sections.about-vision': SectionsAboutVision;
      'sections.about-who-we-are': SectionsAboutWhoWeAre;
      'sections.blog-hero-section': SectionsBlogHeroSection;
      'sections.contact-brief': SectionsContactBrief;
      'sections.contact-hero': SectionsContactHero;
      'sections.contact-modal': SectionsContactModal;
      'sections.contact-preview': SectionsContactPreview;
      'sections.contact-roadmap': SectionsContactRoadmap;
      'sections.footer-config': SectionsFooterConfig;
      'sections.header-config': SectionsHeaderConfig;
      'sections.home-stats-section': SectionsHomeStatsSection;
      'sections.services-cards-section': SectionsServicesCardsSection;
      'sections.services-closing-cta': SectionsServicesClosingCta;
      'sections.services-features-section': SectionsServicesFeaturesSection;
      'sections.services-hero-section': SectionsServicesHeroSection;
    }
  }
}
