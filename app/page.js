"use client";

import React, { useState } from 'react';
import {Sidebar} from "@/components/sidebar";
import {ChatHistory} from "@/components/chat-history";
import {ChatInput} from "@/components/chat-input";
import {CompactHeader} from "@/components/compact-header";
import {useAppContext} from "@/context/app-context";

export default function Home() {
  const { selectedSession } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
      <div className="flex h-screen bg-[#ffffff] dark:bg-[#1a1a1a] overflow-hidden">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <CompactHeader onMenuClick={() => setSidebarOpen(true)} />
          {selectedSession ? (
              <>
                <ChatHistory />
                <ChatInput />
              </>
          ) : (
              <div className="flex items-center justify-center flex-grow px-4">
                <div className="text-center p-8 max-w-2xl animate-fade-in">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#f5f5f5] dark:bg-[#2d2d2d] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#737373] dark:text-[#a3a3a3]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 text-[#1a1a1a] dark:text-[#e5e5e5]">
                    Yeni bir sohbet başlatın
                  </h2>
                  <p className="text-sm md:text-base text-[#737373] dark:text-[#a3a3a3] leading-relaxed">
                    Sol menüden bir kullanıcı, agent ve oturum seçin veya yeni bir oturum oluşturun.
                  </p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
