import React from 'react';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] text-[#0B0D12] pt-32 pb-24 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-6 bg-[#FAF8F5] p-8 sm:p-12 rounded-lg border border-[#0B0D12]/15 shadow-sm">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white border border-[#0B0D12]/15 shadow-xs mx-auto">
          <Compass className="w-3.5 h-3.5 text-[#FF4A1C]" />
          <span className="text-badge text-[#0B0D12]">404 Error • Page Not Found</span>
        </div>

        <h1 className="text-h1 text-[#0B0D12]">
          Lost in the <br />
          <span className="text-[#FF4A1C]">infinite loop.</span>
        </h1>

        <p className="text-body text-[#5A5E6E] max-w-md mx-auto">
          The page you are looking for has been moved, repurposed, or does not exist in our system registry.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0B0D12] hover:bg-[#FF4A1C] text-white rounded text-badge transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#0B0D12] hover:text-white text-[#0B0D12] rounded border border-[#0B0D12]/15 text-badge transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Products</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
