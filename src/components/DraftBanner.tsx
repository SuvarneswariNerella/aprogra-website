import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DraftBanner() {
  const [isDraftMode, setIsDraftMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check on mount if we are in draft mode
    const draftStatus = sessionStorage.getItem('strapi_draft_mode');
    setIsDraftMode(draftStatus === 'true');
  }, []);

  const exitDraftMode = () => {
    sessionStorage.removeItem('strapi_draft_mode');
    setIsDraftMode(false);
    // Force a reload so the frontend fetches the published content
    window.location.reload();
  };

  if (!isDraftMode) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white p-2 text-center z-[9999] flex items-center justify-between px-6 shadow-md">
      <div className="font-semibold">
        Previewing Draft Mode
      </div>
      <button 
        onClick={exitDraftMode}
        className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-bold hover:bg-gray-100 transition-colors cursor-pointer shadow-sm"
      >
        Exit Preview
      </button>
    </div>
  );
}
