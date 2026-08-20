import React, { useState } from 'react';

export default function OmniChatMockup() {
  const [activeTab, setActiveTab] = useState('whatsapp');

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-100 p-3 md:p-4 bg-white/50 backdrop-blur-sm z-10">
        <div className="flex gap-1 md:gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('whatsapp'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'whatsapp' ? 'bg-[#E20A8B] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            WhatsApp
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('ai'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'ai' ? 'bg-[#E20A8B] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            AI Reply
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('analytics'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'analytics' ? 'bg-[#E20A8B] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Funnel
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-50/50 p-4 md:p-8 flex flex-col overflow-y-auto">
        {activeTab === 'whatsapp' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span className="text-sm md:text-base font-bold text-gray-800">Unified Inbox</span>
              <span className="text-[10px] md:text-xs px-3 py-1 bg-green-100/50 text-green-700 font-bold rounded-full border border-green-200/50">Meta API</span>
            </div>
            <div className="p-4 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm space-y-3 transition-transform hover:scale-[1.01]">
              <div className="flex items-center justify-between text-[11px] md:text-sm font-bold text-gray-800">
                <span>Inquiry #8841</span>
                <span className="text-[#E20A8B] bg-pink-50 px-2 py-1 rounded-full">Agent AI</span>
              </div>
              <p className="text-[11px] md:text-sm text-gray-500 leading-relaxed">"Hello, I need to check order status and upgrade to enterprise plan."</p>
            </div>
          </div>
        )}
        
        {activeTab === 'ai' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="p-4 md:p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-purple-100 shadow-sm transition-transform hover:scale-[1.01]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#E20A8B] animate-pulse" />
                <div className="font-bold text-purple-900 text-[11px] md:text-sm">Agentic AI Bot:</div>
              </div>
              <p className="text-purple-800 text-[11px] md:text-sm leading-relaxed">"Your order #8841 is out for delivery! I have also upgraded your account to Enterprise with a 14-day pass."</p>
            </div>
            <div className="text-[10px] md:text-xs font-semibold text-gray-400 flex justify-end gap-3">
              <span className="bg-white px-2 py-1 rounded-full border border-gray-100">Response Time: 0.2s</span>
              <span className="bg-white px-2 py-1 rounded-full border border-gray-100 text-green-600">Sentiment: Delighted</span>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="flex justify-between items-center text-sm md:text-base font-bold text-gray-800 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span>Monthly Conversions</span>
              <span className="text-[#E20A8B] bg-pink-50 px-3 py-1 rounded-full">+342% ROI</span>
            </div>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="p-3 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <span className="block text-[10px] md:text-sm text-gray-500 mb-1">Sent</span>
                <span className="font-extrabold text-gray-900 text-lg md:text-2xl">45K</span>
              </div>
              <div className="p-3 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <span className="block text-[10px] md:text-sm text-gray-500 mb-1">Read</span>
                <span className="font-extrabold text-emerald-600 text-lg md:text-2xl">98%</span>
              </div>
              <div className="p-3 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <span className="block text-[10px] md:text-sm text-gray-500 mb-1">Conv</span>
                <span className="font-extrabold text-[#E20A8B] text-lg md:text-2xl">24%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
