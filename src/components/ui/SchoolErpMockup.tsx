import React, { useState } from 'react';

export default function SchoolErpMockup() {
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-100 p-3 md:p-4 bg-white/50 backdrop-blur-sm z-10">
        <div className="flex gap-1 md:gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('attendance'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'attendance' ? 'bg-[#2F5BFF] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Attendance
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('fees'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'fees' ? 'bg-[#2F5BFF] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Fees
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setActiveTab('exams'); }} 
            className={`px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-sm rounded-md font-semibold transition-colors ${activeTab === 'exams' ? 'bg-[#2F5BFF] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Exams
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-gray-50/50 p-4 md:p-8 flex flex-col overflow-y-auto">
        {activeTab === 'attendance' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="flex justify-between items-center text-sm md:text-base font-bold text-gray-800 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <span>Grade 10-A Today</span>
              <span className="text-[#2F5BFF] bg-blue-50 px-3 py-1 rounded-full">92% Present</span>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-transform hover:scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200" />
                    <div className="text-xs md:text-sm font-semibold text-gray-700">Student Name</div>
                  </div>
                  <div className="text-[10px] md:text-xs px-3 py-1 bg-green-100/50 text-green-700 rounded-full font-bold border border-green-200/50">Present</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'fees' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="p-5 md:p-6 bg-gradient-to-br from-[#2F5BFF] to-[#171B56] rounded-2xl shadow-lg text-white">
              <div className="text-xs md:text-sm text-white/80 font-medium mb-2">Total Collection (March)</div>
              <div className="text-3xl md:text-4xl font-extrabold mb-2">$124,500.00</div>
              <div className="text-[11px] md:text-xs text-green-300 font-bold bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-sm">↑ 12% vs last month</div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 p-4 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <span className="block text-[11px] md:text-sm text-gray-500 mb-1">Pending</span>
                <span className="font-bold text-gray-800 text-lg md:text-2xl">24</span>
              </div>
              <div className="flex-1 p-4 md:p-5 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <span className="block text-[11px] md:text-sm text-gray-500 mb-1">Recent Activity</span>
                <span className="font-bold text-green-600 text-sm md:text-base leading-tight">Paid<br/>Auto-Receipt</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="space-y-4 max-w-lg mx-auto w-full">
            <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-widest text-center mb-6">Term 2 Exam AI Analytics</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 md:p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <div className="text-[11px] md:text-sm text-gray-500 font-medium mb-2">Class Average</div>
                <div className="text-2xl md:text-3xl font-extrabold text-gray-900">88.5%</div>
                <div className="mt-2 text-[10px] md:text-xs text-green-600 font-bold bg-green-50 rounded-full px-2 py-1 mx-auto w-fit">Top 10% Regional</div>
              </div>
              <div className="p-4 md:p-6 bg-white rounded-xl border border-gray-100 shadow-sm text-center transition-transform hover:scale-[1.02]">
                <div className="text-[11px] md:text-sm text-gray-500 font-medium mb-2">Top Performer</div>
                <div className="text-xl md:text-2xl font-bold text-[#2F5BFF] mb-1">A+ Dist.</div>
                <div className="mt-2 text-[10px] md:text-xs text-gray-400 font-medium">Sarah Jenkins</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
