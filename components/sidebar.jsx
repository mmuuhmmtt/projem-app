import React, {useState} from 'react';
import {useAppContext} from "@/context/app-context";
import {UserSelector} from "@/components/user-selector";
import AgentSelector from "@/components/agent-selector";
import {SessionSelector} from "@/components/session-selector";
import ThemeToggle from "@/components/theme-toggle";

export function Sidebar() {
    const {selectedUser, selectedAgent, selectedSession} = useAppContext();

    return (
        <div
            className="w-72 shrink-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full relative shadow-xl"
        >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        ChatApp
                    </h1>
                    <ThemeToggle />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Modern Sohbet Deneyimi</p>
            </div>

            <div className="flex-grow overflow-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                
                <div className="animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                        <h2 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Kullanıcı</h2>
                    </div>
                    <UserSelector/>
                </div>

                
                {selectedUser && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                            <h2 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Agent</h2>
                        </div>
                        <AgentSelector/>
                    </div>
                )}

                
                {selectedAgent && (
                    <div className="animate-fade-in">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                            <h2 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Oturum</h2>
                        </div>
                        <SessionSelector/>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <p className="font-semibold">v1.0.0 - Mock Chat</p>
                    <p className="text-slate-400 dark:text-slate-500">Muhammet Coşgun</p>
                </div>
            </div>
        </div>
    );
}