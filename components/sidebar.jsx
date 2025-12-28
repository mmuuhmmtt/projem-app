import React from 'react';
import {useAppContext} from "@/context/app-context";
import {UserSelector} from "@/components/user-selector";

export function Sidebar({ onClose }) {
    return (
        <div className="w-64 md:w-64 shrink-0 bg-[#ffffff] dark:bg-[#1a1a1a] border-r border-[#e5e5e5] dark:border-[#2d2d2d] flex flex-col h-full shadow-lg md:shadow-none">
            <div className="p-4 border-b border-[#e5e5e5] dark:border-[#2d2d2d] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* AI Sembolü - Robot/Brain Icon */}
                    <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] dark:from-[#ea580c] dark:to-[#c2410c] flex items-center justify-center shadow-lg ring-2 ring-[#ea580c]/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                            </svg>
                        </div>
                        {/* Glow efekti */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#ea580c] to-[#c2410c] opacity-30 blur-md -z-10"></div>
                    </div>
                    <h1 className="text-base font-semibold text-[#1a1a1a] dark:text-[#e5e5e5] tracking-tight">
                        NeoAI
                    </h1>
                </div>
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
                <div className="p-3">
                    <div className="space-y-2">
                        <div className="px-2 text-xs font-medium text-[#737373] dark:text-[#a3a3a3] uppercase tracking-wider mb-2">
                            Kullanıcılar
                        </div>
                        <UserSelector />
                    </div>
                </div>
            </div>
        </div>
    );
}