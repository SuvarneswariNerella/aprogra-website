import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Preview() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const secret = searchParams.get('secret');
    const uid = searchParams.get('uid');
    const documentId = searchParams.get('documentId');
    const status = searchParams.get('status');
    
    // In a real app, this should match your PREVIEW_SECRET from Strapi backend
    const PREVIEW_SECRET = 'my-super-secret-key'; 
    
    if (secret !== PREVIEW_SECRET) {
      setError('Invalid preview secret.');
      return;
    }

    if (!documentId) {
      setError('Missing document ID.');
      return;
    }

    // If an API URL is passed from the CMS backend, save it for API fetches in this session
    const apiUrl = searchParams.get('apiUrl') || searchParams.get('strapiUrl');
    if (apiUrl) {
      sessionStorage.setItem('strapi_backend_url', decodeURIComponent(apiUrl));
    }

    // Enable or disable Draft Mode based on Strapi's requested status
    if (status === 'published') {
      sessionStorage.removeItem('strapi_draft_mode');
    } else {
      sessionStorage.setItem('strapi_draft_mode', 'true');
    }

    const statusParam = status ? `?status=${status}` : '';

    // Route based on Strapi UID (Content Type)
    switch (uid) {
      // Single Pages
      case 'api::home-page.home-page':
      case 'api::brands-section.brands-section':
      case 'api::brand.brand':
      case 'api::testimonial.testimonial':
      case 'api::global-config.global-config':
        navigate(`/${statusParam}`);
        break;
      
      case 'api::about-page.about-page':
      case 'api::team-member.team-member':
        navigate(`/about${statusParam}`);
        break;
      
      case 'api::services-page.services-page':
        navigate(`/services${statusParam}`);
        break;
      
      case 'api::contact-page.contact-page':
        navigate(`/contact${statusParam}`);
        break;
      
      case 'api::career-page.career-page':
      case 'api::career.career': // This handles the Career Role collection type
        navigate(`/careers${statusParam}`);
        break;
      
      case 'api::products-page.products-page':
        navigate(`/products${statusParam}`);
        break;
        
      case 'api::school-erp-page.school-erp-page':
        navigate(`/products/school-erp${statusParam}`);
        break;

      case 'api::omnichat-page.omnichat-page':
        navigate(`/products/omnichat${statusParam}`);
        break;
        
      case 'api::product.product':
        navigate(`/products${statusParam}`); // Assuming no detail page exists in React Router yet
        break;
      
      case 'api::blog-page.blog-page':
      case 'api::category.category':
        navigate(`/blog${statusParam}`);
        break;
        
      case 'api::blog-post.blog-post':
        navigate(`/blog/${documentId}${statusParam}`); // Keep documentId/slug route if you implement it
        break;
        
      default:
        console.warn('Unknown UID for preview routing:', uid);
        navigate(`/`);
        break;
    }
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-red-100 text-red-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Preview Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-medium animate-pulse">
        Loading Preview...
      </div>
    </div>
  );
}
