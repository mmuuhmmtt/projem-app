import React, {useState} from 'react';
import {useAppContext} from "@/context/app-context";
import {UserSelector} from "@/components/user-selector";
import AgentSelector from "@/components/agent-selector";
import {SessionSelector} from "@/components/session-selector";

export function Sidebar() {
    const {selectedUser, selectedAgent, selectedSession} = useAppContext();

    return (
        <div
            className="w-64 shrink-0 bg-white shadow-md flex flex-col h-full relative"
        >
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-gray-800">Sohbet Uygulaması</h1>
            </div>

            <div className="flex-grow overflow-auto p-4 space-y-6">
                
                <div>
                    <h2 className="text-sm font-semibold text-gray-600 mb-2">KULLANICI</h2>
                    <UserSelector/>
                </div>

                
                {selectedUser && (
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 mb-2">AGENT</h2>
                        <AgentSelector/>
                    </div>
                )}

                
                {selectedAgent && (
                    <div>
                        <h2 className="text-sm font-semibold text-gray-600 mb-2">OTURUM</h2>
                        <SessionSelector/>
                    </div>
                )}
            </div>
            <div className="p-4 text-xs text-gray-500">
                <p>v1.0.0 - Mock Chat App</p>
                <p>Author: Muhammet Coşgun</p>
            </div>
        </div>
    );
}