/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import SchoolERP from './pages/SchoolERP';
import OmniChatProduct from './pages/OmniChatProduct';
import Services from './pages/Services';
import ServiceArchitecture from './pages/ServiceArchitecture';
import Community from './pages/Community';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import NotFound from './pages/NotFound';
import Preview from './pages/Preview';

import { useEffect } from 'react';
import { prefetchAllStrapiData, clearStrapiCache } from './lib/strapi';

export default function App() {
  useEffect(() => {
    // 1. Pre-warm cache for all routes in the background (0ms route navigation, zero delay)
    prefetchAllStrapiData();

    // 2. Check if embedded inside an iframe (Strapi Live Preview)
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ type: 'previewReady' }, '*');
      } catch {}

      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'strapiUpdate') {
          clearStrapiCache();
          window.location.reload();
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="products/school-erp" element={<SchoolERP />} />
          <Route path="products/omnichat" element={<OmniChatProduct />} />
          <Route path="services" element={<Services />} />
          <Route path="services/architecture/:id" element={<ServiceArchitecture />} />
          <Route path="blog" element={<Community />} />
          <Route path="community" element={<Community />} />
          <Route path="contact" element={<Contact />} />
          <Route path="careers" element={<Careers />} />
          <Route path="preview" element={<Preview />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
