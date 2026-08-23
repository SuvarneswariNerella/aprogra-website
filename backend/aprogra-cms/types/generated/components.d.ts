import type { Schema, Struct } from '@strapi/strapi';

export interface AboutAboutContactSection extends Struct.ComponentSchema {
  collectionName: 'components_about_about_contact_sections';
  info: {
    description: 'About page bottom contact & brief CTA section';
    displayName: 'About Contact Section';
    icon: 'mail';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"LET'S CONNECT">;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Submit Project Brief'>;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/contact'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    email: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'hello@aprogra.com'>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    officeLocation: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hyderabad, India'>;
    phone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+1 (800) 555-0199'>;
  };
}

export interface AboutClientLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_about_client_logo_items';
  info: {
    description: 'Client Partner Logo for About Page';
    displayName: 'Client Logo Item';
    icon: 'image';
  };
  attributes: {
    logoImage: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    websiteUrl: Schema.Attribute.String;
  };
}

export interface AboutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_about_hero_sections';
  info: {
    description: 'About page hero section';
    displayName: 'Hero Section';
    icon: 'layout';
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full-Stack Engineering & AI Studio'>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images'>;
    kpiStats: Schema.Attribute.Component<'shared.stat-badge', true>;
    pillars: Schema.Attribute.Component<'about.pillar-item', true>;
    primaryCtaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Start Your Brief'>;
    primaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact'>;
    secondaryCtaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore Our Story'>;
    secondaryCtaUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#story'>;
    subheadline: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AboutPanelHighlight extends Struct.ComponentSchema {
  collectionName: 'components_about_panel_highlights';
  info: {
    description: 'Highlight row for Parallax Panel';
    displayName: 'Panel Highlight';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutParallaxPanelMission extends Struct.ComponentSchema {
  collectionName: 'components_about_parallax_panel_missions';
  info: {
    description: 'Panel 02 Our Mission for Parallax Stack';
    displayName: 'Parallax Panel: Mission';
    icon: 'bullseye';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Mission'>;
    coverImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    missionQuote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AboutParallaxPanelVision extends Struct.ComponentSchema {
  collectionName: 'components_about_parallax_panel_visions';
  info: {
    description: 'Panel 03 2030 Vision for Parallax Stack';
    displayName: 'Parallax Panel: Vision';
    icon: 'shield';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'2030 Vision'>;
    coverImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    highlightRows: Schema.Attribute.Component<'about.panel-highlight', true>;
    visionBadgeYear: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'2030 Vision'>;
  };
}

export interface AboutParallaxPanelWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_about_parallax_panel_who_we_ares';
  info: {
    description: 'Panel 01 Who We Are for Parallax Stack';
    displayName: 'Parallax Panel: Who We Are';
    icon: 'user';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Who We Are'>;
    coverImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    highlightRows: Schema.Attribute.Component<'about.panel-highlight', true>;
  };
}

export interface AboutPillarItem extends Struct.ComponentSchema {
  collectionName: 'components_about_pillar_items';
  info: {
    description: 'Architectural pillar item for About Hero';
    displayName: 'Pillar Item';
    icon: 'layers';
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

export interface ElementsArchitecturePoint extends Struct.ComponentSchema {
  collectionName: 'components_elements_architecture_points';
  info: {
    displayName: 'Architecture Point';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    iconMedia: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsAuthor extends Struct.ComponentSchema {
  collectionName: 'components_elements_authors';
  info: {
    displayName: 'Author';
    icon: 'user';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    avatarUrl: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface ElementsChoiceItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_choice_items';
  info: {
    displayName: 'Choice Item';
    icon: 'bulletList';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_elements_cta_buttons';
  info: {
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsDeliverable extends Struct.ComponentSchema {
  collectionName: 'components_elements_deliverables';
  info: {
    displayName: 'Deliverable';
    icon: 'check';
  };
  attributes: {
    item: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFaq extends Struct.ComponentSchema {
  collectionName: 'components_elements_faqs';
  info: {
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsMetric extends Struct.ComponentSchema {
  collectionName: 'components_elements_metrics';
  info: {
    displayName: 'Metric';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsPreviewStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_preview_steps';
  info: {
    displayName: 'Preview Step';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsRoadmapStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_roadmap_steps';
  info: {
    displayName: 'Roadmap Step';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    timeframe: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTagItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_tag_items';
  info: {
    displayName: 'Tag Item';
    icon: 'price-tag';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTakeaway extends Struct.ComponentSchema {
  collectionName: 'components_elements_takeaways';
  info: {
    displayName: 'Takeaway';
    icon: 'check';
  };
  attributes: {
    point: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTechGroup extends Struct.ComponentSchema {
  collectionName: 'components_elements_tech_groups';
  info: {
    displayName: 'Tech Group';
    icon: 'layer';
  };
  attributes: {
    category: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'elements.tech-item', true>;
  };
}

export interface ElementsTechItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_tech_items';
  info: {
    displayName: 'Tech Item';
    icon: 'code';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_product_faq_items';
  info: {
    description: 'Frequently asked question and answer pair';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_product_feature_items';
  info: {
    description: 'Enterprise feature, functional module, or channel integration';
    displayName: 'Feature & Module Item';
    icon: 'apps';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['module', 'channel', 'capability', 'integration']
    > &
      Schema.Attribute.DefaultTo<'module'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    highlights: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    metricLabel: Schema.Attribute.String;
    metricValue: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductHeroPill extends Struct.ComponentSchema {
  collectionName: 'components_product_hero_pills';
  info: {
    description: 'Live telemetry status chip displayed in the hero section (e.g. RFID Active, GPS Online)';
    displayName: 'Hero Telemetry Pill';
    icon: 'pulse';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface ProductPricingFeature extends Struct.ComponentSchema {
  collectionName: 'components_product_pricing_features';
  info: {
    description: 'Single line item or entitlement included in a pricing plan';
    displayName: 'Pricing Feature';
    icon: 'check';
  };
  attributes: {
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductPricingTier extends Struct.ComponentSchema {
  collectionName: 'components_product_pricing_tiers';
  info: {
    description: 'Commercial pricing package (e.g. Starter, Professional, Enterprise)';
    displayName: 'Pricing Tier';
    icon: 'shopping-cart';
  };
  attributes: {
    badge: Schema.Attribute.String;
    billingPeriod: Schema.Attribute.Enumeration<
      ['monthly', 'yearly', 'custom']
    > &
      Schema.Attribute.DefaultTo<'monthly'>;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Request Demo & Quote'>;
    ctaLink: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/contact'>;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'product.pricing-feature', true>;
    isFeatured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    tagline: Schema.Attribute.String;
  };
}

export interface ProductScreenshot extends Struct.ComponentSchema {
  collectionName: 'components_product_screenshots';
  info: {
    description: 'High-fidelity UI mockups or portal screenshots';
    displayName: 'Product Screenshot';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    category: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SectionsBlogHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_hero_sections';
  info: {
    displayName: 'Blog Hero Section';
    icon: 'bold';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'APROGRA ENGINEERING DISPATCHES'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Deep technical breakdowns, production postmortems, and architectural blueprints from the engineers building autonomous agentic loops and high-concurrency systems.'>;
    headline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Systems Architecture,'>;
    highlight: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Agentic AI & Engineering Reality.'>;
    metric1_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Production Systems'>;
    metric2_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Weekly Technical Deep Dives'>;
    metric3_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Zero-Hallucination Architectures'>;
    searchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search articles, architectures, tags...'>;
  };
}

export interface SectionsBlogNavSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_nav_sections';
  info: {
    displayName: 'Blog Nav Section';
    icon: 'layer';
  };
  attributes: {
    articlesSuffix: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TECHNICAL PAPERS'>;
    showingPrefix: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SHOWING:'>;
  };
}

export interface SectionsBriefPreviewSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_brief_preview_sections';
  info: {
    displayName: 'Brief Preview Section';
    icon: 'eye';
  };
  attributes: {
    capabilitiesLabel: Schema.Attribute.String;
    cardBadge: Schema.Attribute.String;
    cardTitle: Schema.Attribute.String;
    engagementSteps: Schema.Attribute.Component<'elements.preview-step', true>;
    engagementTitle: Schema.Attribute.String;
    guarantee1_desc: Schema.Attribute.Text;
    guarantee1_title: Schema.Attribute.String;
    guarantee2_desc: Schema.Attribute.Text;
    guarantee2_title: Schema.Attribute.String;
    guaranteesTitle: Schema.Attribute.String;
    investmentLabel: Schema.Attribute.String;
    readyReviewText: Schema.Attribute.String;
    slaResponseText: Schema.Attribute.String;
    timelineLabel: Schema.Attribute.String;
    videoButtonText: Schema.Attribute.String;
    videoDescription: Schema.Attribute.Text;
    videoTitle: Schema.Attribute.String;
  };
}

export interface SectionsBriefSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_brief_sections';
  info: {
    displayName: 'Brief Section';
    icon: 'write';
  };
  attributes: {
    badge: Schema.Attribute.String;
    budgetQuestion: Schema.Attribute.String;
    budgetRangesList: Schema.Attribute.Component<'elements.choice-item', true>;
    capabilitiesList: Schema.Attribute.Component<'elements.choice-item', true>;
    capabilitiesQuestion: Schema.Attribute.String;
    fieldCompanyLabel: Schema.Attribute.String;
    fieldCompanyPlaceholder: Schema.Attribute.String;
    fieldEmailLabel: Schema.Attribute.String;
    fieldEmailPlaceholder: Schema.Attribute.String;
    fieldNameLabel: Schema.Attribute.String;
    fieldNamePlaceholder: Schema.Attribute.String;
    formHeading: Schema.Attribute.String;
    formSubheading: Schema.Attribute.Text;
    messagePlaceholder: Schema.Attribute.Text;
    messageQuestion: Schema.Attribute.String;
    submitButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    successTitle: Schema.Attribute.String;
    timelineQuestion: Schema.Attribute.String;
    timelineRangesList: Schema.Attribute.Component<
      'elements.choice-item',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsClosingBannerSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_closing_banner_sections';
  info: {
    displayName: 'Closing Banner Section';
    icon: 'shield';
  };
  attributes: {
    backToTopText: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsClosingCtaSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_closing_cta_sections';
  info: {
    displayName: 'Closing CTA Section';
    icon: 'phone';
  };
  attributes: {
    badge: Schema.Attribute.String;
    copyright: Schema.Attribute.String;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'elements.cta-button', false>;
    secondaryCta: Schema.Attribute.Component<'elements.cta-button', false>;
    standardsNote: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsContactHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_hero_sections';
  info: {
    displayName: 'Contact Hero Section';
    icon: 'earth';
  };
  attributes: {
    availabilityBadge: Schema.Attribute.String;
    bookIntroCallButtonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    directChannelsTitle: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    emailCopyButtonText: Schema.Attribute.String;
    emailLabel: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    highlight: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    phoneCopyButtonText: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    podStatus: Schema.Attribute.String;
    primaryCtaText: Schema.Attribute.String;
    secondaryCtaText: Schema.Attribute.String;
    slaBadge1: Schema.Attribute.String;
    slaBadge2: Schema.Attribute.String;
    slaBadge3: Schema.Attribute.String;
    studioHqLabel: Schema.Attribute.String;
    studioHqValue: Schema.Attribute.String;
  };
}

export interface SectionsDirectChannelsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_direct_channels_sections';
  info: {
    displayName: 'Direct Channels Section Header';
    icon: 'phone';
  };
  attributes: {
    badge: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeaturedSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_featured_sections';
  info: {
    displayName: 'Featured Section';
    icon: 'crown';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'FEATURED DISPATCH'>;
    sideCardBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Open Source'>;
    sideCardDesc: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Peer-reviewed engineering blueprints & production benchmarks'>;
    sideCardTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Aprogra Research'>;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'star';
  };
  attributes: {
    badge: Schema.Attribute.String;
    complianceBadge: Schema.Attribute.String;
    countryBadge: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    highlight: Schema.Attribute.String & Schema.Attribute.Required;
    primaryCta: Schema.Attribute.Component<'elements.cta-button', false>;
    scrollAnchorText: Schema.Attribute.String;
    secondaryCta: Schema.Attribute.Component<'elements.cta-button', false>;
    slaCardDesc: Schema.Attribute.String;
    slaCardMetric: Schema.Attribute.String;
    slaCardMetricLabel: Schema.Attribute.String;
    slaCardTitle: Schema.Attribute.String;
    stackBadge: Schema.Attribute.String;
    stackFooterLeft: Schema.Attribute.String;
    stackFooterRight: Schema.Attribute.String;
    stackTitle: Schema.Attribute.String;
    statItems: Schema.Attribute.Component<'elements.deliverable', true>;
    topMetaBadge: Schema.Attribute.String;
  };
}

export interface SectionsIntroCallModalSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_intro_call_modal_sections';
  info: {
    displayName: 'Intro Call Modal Section';
    icon: 'user';
  };
  attributes: {
    submitButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    successTitle: Schema.Attribute.String;
    timeSlots: Schema.Attribute.Component<'elements.choice-item', true>;
    title: Schema.Attribute.String;
    topicOptions: Schema.Attribute.Component<'elements.choice-item', true>;
  };
}

export interface SectionsKpiSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_kpi_sections';
  info: {
    displayName: 'KPI Section';
    icon: 'grid';
  };
  attributes: {
    badge: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsRoadmapSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_roadmap_sections';
  info: {
    displayName: 'Roadmap Section';
    icon: 'clock';
  };
  attributes: {
    badge: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'elements.roadmap-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsShowcaseSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_showcase_sections';
  info: {
    displayName: 'Showcase Section';
    icon: 'landscape';
  };
  attributes: {
    badge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'02 / CAPABILITIES & ARCHITECTURE'>;
    scrollText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SCROLL DOWN TO REVEAL DISCIPLINES'>;
    subBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'HORIZONTAL REVEAL'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Core Engineering Disciplines'>;
  };
}

export interface SectionsSpotlightSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_spotlight_sections';
  info: {
    displayName: 'Spotlight Section';
    icon: 'star';
  };
  attributes: {
    authorAvatar: Schema.Attribute.Media<'images'>;
    authorAvatarUrl: Schema.Attribute.String;
    authorName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Arjun Mehta'>;
    authorRole: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Lead AI Systems Architect'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Read Deep Dive'>;
    category: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AI & Agentic Systems'>;
    editionBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'EDITION #42'>;
    excerpt: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'How we eliminate agent drift and state explosion using constrained JSON schemas, air-gapped SLM reasoning gates, and deterministic state-machine orchestrators.'>;
    headerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'FLAGSHIP DISPATCH'>;
    point1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Dual-pass validation agents reducing hallucination rates to <0.02%'>;
    point2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Air-gapped SLM reasoning gates cutting LLM compute costs by 68%'>;
    readTime: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'8 MIN READ'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Architecting Deterministic Multi-Agent Execution Loops in Production'>;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    description: 'Configurable button or link action';
    displayName: 'Call to Action';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    style: Schema.Attribute.Enumeration<['primary', 'secondary', 'ghost']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Metadata for search engines and social sharing';
    displayName: 'SEO';
    icon: 'globe';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStatBadge extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_badges';
  info: {
    description: 'Metric or certification badge (e.g. SOC-2, 99.99% Uptime, 99.8% Accuracy)';
    displayName: 'Stat & Trust Badge';
    icon: 'shield';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about.about-contact-section': AboutAboutContactSection;
      'about.client-logo-item': AboutClientLogoItem;
      'about.hero-section': AboutHeroSection;
      'about.panel-highlight': AboutPanelHighlight;
      'about.parallax-panel-mission': AboutParallaxPanelMission;
      'about.parallax-panel-vision': AboutParallaxPanelVision;
      'about.parallax-panel-who-we-are': AboutParallaxPanelWhoWeAre;
      'about.pillar-item': AboutPillarItem;
      'elements.architecture-point': ElementsArchitecturePoint;
      'elements.author': ElementsAuthor;
      'elements.choice-item': ElementsChoiceItem;
      'elements.cta-button': ElementsCtaButton;
      'elements.deliverable': ElementsDeliverable;
      'elements.faq': ElementsFaq;
      'elements.metric': ElementsMetric;
      'elements.preview-step': ElementsPreviewStep;
      'elements.roadmap-step': ElementsRoadmapStep;
      'elements.tag-item': ElementsTagItem;
      'elements.takeaway': ElementsTakeaway;
      'elements.tech-group': ElementsTechGroup;
      'elements.tech-item': ElementsTechItem;
      'product.faq-item': ProductFaqItem;
      'product.feature-item': ProductFeatureItem;
      'product.hero-pill': ProductHeroPill;
      'product.pricing-feature': ProductPricingFeature;
      'product.pricing-tier': ProductPricingTier;
      'product.screenshot': ProductScreenshot;
      'sections.blog-hero-section': SectionsBlogHeroSection;
      'sections.blog-nav-section': SectionsBlogNavSection;
      'sections.brief-preview-section': SectionsBriefPreviewSection;
      'sections.brief-section': SectionsBriefSection;
      'sections.closing-banner-section': SectionsClosingBannerSection;
      'sections.closing-cta-section': SectionsClosingCtaSection;
      'sections.contact-hero-section': SectionsContactHeroSection;
      'sections.direct-channels-section': SectionsDirectChannelsSection;
      'sections.featured-section': SectionsFeaturedSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.intro-call-modal-section': SectionsIntroCallModalSection;
      'sections.kpi-section': SectionsKpiSection;
      'sections.roadmap-section': SectionsRoadmapSection;
      'sections.showcase-section': SectionsShowcaseSection;
      'sections.spotlight-section': SectionsSpotlightSection;
      'shared.cta': SharedCta;
      'shared.seo': SharedSeo;
      'shared.stat-badge': SharedStatBadge;
    }
  }
}
