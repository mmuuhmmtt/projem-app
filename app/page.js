"use client";

import React from 'react';
import {Sidebar} from "@/components/sidebar";
import {ChatHistory} from "@/components/chat-history";
import {ChatInput} from "@/components/chat-input";
import {useAppContext} from "@/context/app-context";

export default function Home() {
  const { selectedSession } = useAppContext();

    console.log(new Date().toISOString());

  console.log("selectedSession:", selectedSession);  

  return (
      <div className="flex h-screen bg-gray-100">
        
        <Sidebar />

        
        <div className="flex flex-col flex-grow">
          {selectedSession ? (
              <>
                
                <ChatHistory />

                
                <ChatInput />
              </>
          ) : (
              <div className="flex items-center justify-center flex-grow text-gray-500">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-semibold mb-2">Hoş Geldiniz!</h2>
                  <p>Sohbete başlamak için lütfen sol menüden bir kullanıcı, agent ve oturum seçin veya yeni bir oturum oluşturun.</p>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}
