import React from 'react';
import {useAppContext} from "@/context/app-context";
import {UserSelector} from "@/components/user-selector";
import AgentSelector from "@/components/agent-selector";
import {SessionSelector} from "@/components/session-selector";

export function Sidebar() {
    const {selectedUser, selectedAgent} = useAppContext();

    return (
        <div className="w-64 shrink-0 bg-[#ffffff] dark:bg-[#1a1a1a] border-r border-[#e5e5e5] dark:border-[#2d2d2d] flex flex-col h-full">
            <div className="p-4 border-b border-[#e5e5e5] dark:border-[#2d2d2d]">
                <h1 className="text-base font-medium text-[#1a1a1a] dark:text-[#e5e5e5]">
                    NeoAI
                </h1>
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