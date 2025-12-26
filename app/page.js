"use client";

import React from 'react';
import {Sidebar} from "@/components/sidebar";
import {ChatHistory} from "@/components/chat-history";
import {ChatInput} from "@/components/chat-input";
import {useAppContext} from "@/context/app-context";

export default function Home() {
  const { selectedSession } = useAppContext();

  return (
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        
        <Sidebar />

        
        <div className="flex flex-col flex-grow overflow-hidden">
          {selectedSession ? (
              <>
                
                <ChatHistory />

                
                <ChatInput />
              </>
          ) : (
              <div className="flex items-center justify-center flex-grow">
                <div className="text-center p-8 max-w-md animate-fade-in">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Hoş Geldiniz!
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Sohbete başlamak için lütfen sol menüden bir kullanıcı, agent ve oturum seçin veya yeni bir oturum oluşturun.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <span>Hazır</span>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
