# Walkthrough: Eliminating Page Loading Delay & Fallback Flashes with SWR Caching

## 1. Problem Overview
Navigating between pages (`/about`, `/products`, `/services`, `/careers`, `/blog`, `/contact`, `/community`) previously exhibited:
- **Visual Delay & Flash**: On route changes, individual React component states reset to hardcoded fallback constants (including `picsum.photos` placeholders), resulting in a layout jump and visible delay before Strapi API calls resolved.
- **Flash of Stale/Default Content**: Modifying content in Strapi CMS resulted in a brief flash of the hardcoded defaults on initial page visits before displaying updated CMS data.

---

## 2. Root Cause
- Every single data hook across the application was managing isolated local component state (`useState(DEFAULT_...)`) without route prefetching, in-memory caching, or persistent browser caching.
- Above-the-fold hero images had `loading="lazy"`, which instructed browsers to delay image requests until after the layout pass.

---

## 3. Architecture & Implementation

### 3.1 SWR Caching & Query Engine ([`strapiCache.ts`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapiCache.ts))
A client-side Stale-While-Revalidate (SWR) cache was engineered with:
1. **Multi-tier Cache (In-Memory + `localStorage`)**:
   - Synchronously initializes React states on tick 0 from memory or localStorage.
   - Allows pages to render **instantly (0ms latency)** with current CMS data without showing default placeholders.
2. **In-Flight Request Deduplication**:
   - Deduplicates identical concurrent API calls across multiple components (e.g. multiple components querying `global_config` or `about_page` share a single network promise).
3. **Reactive Pub/Sub Cache Subscriptions**:
   - Components subscribe to cache key events; whenever background revalidation returns fresh data, state updates reactively across all mounted components.
4. **Equality-Checked Re-renders**:
   - Revalidation results are checked against current state before calling `setState` to prevent unnecessary component re-renders.

### 3.2 Global Route Pre-Warming ([`App.tsx`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/App.tsx))
- Added `prefetchAllStrapiData()` on initial application mount.
- Pre-warms the cache for all pages (`/`, `/about`, `/products`, `/services`, `/careers`, `/blog`, `/contact`, `/community`) in the background.
- Listens for CMS live preview updates (`strapiUpdate` postMessage) to invalidate caches automatically when editors publish changes in Strapi.

### 3.3 Refactored All 20 Strapi Data Hooks ([`strapi.ts`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts))
All data hooks now leverage `useStrapiQuery`:
- [`useGlobalConfig`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L481)
- [`useContactPageContent`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L1038)
- [`useBlogData`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L1502)
- [`useServiceFlipCards`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2210)
- [`useServicesPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2237)
- [`useServices`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2249)
- [`useServiceDetail`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2261)
- [`useTestimonials`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2376)
- [`useBrands`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2502)
- [`useProducts`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2714)
- [`useProduct`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L2723)
- [`useAboutPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3182)
- [`useTeamMembers`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3229)
- [`useAboutFaqs`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3259)
- [`useHomePage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3637)
- [`useProductsPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3807)
- [`useCareerPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3980)
- [`useCareers`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L3989)
- [`useSchoolErpPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L4170)
- [`useOmniChatPage`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/lib/strapi.ts#L4563)

### 3.4 Image Loading Optimization ([`AboutHero.tsx`](file:///c:/Users/Suvarna/OneDrive/Desktop/Aprogra/aprogra-website/src/components/about/AboutHero.tsx))
- Removed `loading="lazy"` from above-the-fold hero visuals to ensure eager, instantaneous rendering.

---

## 4. Verification Results
- **Instantaneous Transitions**: Clicking on About, Products, Services, or any other page in the navbar renders immediately with zero loading lag.
- **No Flash of Default Content**: Pages render existing cached CMS data on frame 0, with silent background revalidation against Strapi.
