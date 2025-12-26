import React from 'react';
import { useAppContext } from '@/context/app-context';
import ThemeToggle from '@/components/theme-toggle';

export function CompactHeader() {
    const { selectedUser, selectedAgent } = useAppContext();

    return (
        <div className="h-14 border-b border-[#e5e5e5] dark:border-[#2d2d2d] bg-[#ffffff] dark:bg-[#1a1a1a] flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
                {selectedUser && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#fff4e6] dark:bg-[#431407] text-sm text-[#9a3412] dark:text-[#fdba74]">
                        <span className="font-medium">{selectedUser.name}</span>
                        {selectedAgent && (
                            <>
                                <span className="text-[#a3a3a3]">/</span>
                                <span>{selectedAgent.name}</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <ThemeToggle />
        </div>
    );
}

