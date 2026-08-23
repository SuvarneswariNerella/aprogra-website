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

export default function App() {
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
