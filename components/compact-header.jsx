import React from 'react';
import { useAppContext } from '@/context/app-context';
import ThemeToggle from '@/components/theme-toggle';

export function CompactHeader({ onMenuClick }) {
    const { selectedUser } = useAppContext();

    return (
        <div className="h-14 border-b border-[#e5e5e5] dark:border-[#2d2d2d] bg-[#ffffff] dark:bg-[#1a1a1a] flex items-center justify-between px-3 md:px-4 shrink-0">
            <div className="flex items-center gap-2 md:gap-3">
                {/* Hamburger menu for mobile */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2d2d2d] transition-colors"
                    aria-label="Menüyü Aç"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#1a1a1a] dark:text-[#e5e5e5]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                
                {selectedUser && (
                    <div className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-[#fff4e6] dark:bg-[#431407] text-xs md:text-sm text-[#9a3412] dark:text-[#fdba74]">
                        <span className="font-medium truncate max-w-[120px] md:max-w-none">{selectedUser.name}</span>
                    </div>
                )}
            </div>
            <ThemeToggle />
        </div>
    );
}

