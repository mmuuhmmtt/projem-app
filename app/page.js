"use client";

import React, { useState } from 'react';
import {Sidebar} from "@/components/sidebar";
import {ChatHistory} from "@/components/chat-history";
import {ChatInput} from "@/components/chat-input";
import {CompactHeader} from "@/components/compact-header";
import {useAppContext} from "@/context/app-context";

export default function Home() {
  const { selectedUser } = useAppContext();
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
          {selectedUser ? (
              <>
                <ChatHistory />
                <ChatInput />
              </>
          ) : (
              <div className="flex items-center justify-center flex-grow px-4">
                <div className="text-center p-8 max-w-2xl animate-fade-in">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#ea580c] to-[#c2410c] dark:from-[#ea580c] dark:to-[#c2410c] flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-[#1a1a1a] dark:text-[#e5e5e5]">
                    Hoş Geldiniz!
                  </h2>
                  <p className="text-base md:text-lg text-[#737373] dark:text-[#a3a3a3] leading-relaxed mb-2">
                    Ben yapay zeka asistanınızım. Size yardımcı olmak için buradayım.
                  </p>
                  <p className="text-sm md:text-base text-[#a3a3a3] dark:text-[#737373] leading-relaxed">
                    Sol menüden bir kullanıcı seçin veya yeni bir kullanıcı oluşturarak sohbete başlayın.
                  </p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
