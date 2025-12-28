import React from 'react';
import {useAppContext} from "@/context/app-context";
import {UserSelector} from "@/components/user-selector";
import AgentSelector from "@/components/agent-selector";
import {SessionSelector} from "@/components/session-selector";

export function Sidebar({ onClose }) {
    const {selectedUser, selectedAgent} = useAppContext();

    return (
        <div className="w-64 md:w-64 shrink-0 bg-[#ffffff] dark:bg-[#1a1a1a] border-r border-[#e5e5e5] dark:border-[#2d2d2d] flex flex-col h-full shadow-lg md:shadow-none">
            <div className="p-4 border-b border-[#e5e5e5] dark:border-[#2d2d2d] flex items-center justify-between">
                <h1 className="text-base font-medium text-[#1a1a1a] dark:text-[#e5e5e5]">
                    NeoAI
                </h1>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2d2d2d] transition-colors"
                    aria-label="Menüyü Kapat"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#737373] dark:text-[#a3a3a3]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="flex-grow overflow-auto">
                <div className="p-3 space-y-4">
                    <div className="space-y-2">
                        <div className="px-2 text-xs font-medium text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider">
                            Kullanıcı
                        </div>
                        <UserSelector />
                    </div>
                    
                    {selectedUser && (
                        <div className="space-y-2">
                            <div className="px-2 text-xs font-medium text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider">
                                Agent
                            </div>
                            <AgentSelector />
                        </div>
                    )}

                    {selectedAgent && (
                        <div className="space-y-2">
                            <div className="px-2 text-xs font-medium text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider">
                                Oturumlar
                            </div>
                            <SessionSelector />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}