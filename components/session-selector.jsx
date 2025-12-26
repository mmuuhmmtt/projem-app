import React from 'react';
import { useAppContext } from "@/context/app-context";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export function SessionSelector() {
    const { selectedSession, selectSession, createSession, getAgentSessions,  } = useAppContext();

    const agentSessions = getAgentSessions();

    const handleSessionSelect = (sessionId) => {
        selectSession(sessionId);
    };

    const handleCreateSession = () => {
        const newSession = createSession();
        if (newSession) {
            selectSession(newSession.id);
        }
    };

    
    const sortedSessions = [...agentSessions].sort((a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    );

    return (
        <div className="space-y-1">
            <div className="space-y-1 max-h-96 overflow-y-auto">
                {sortedSessions.length > 0 ? (
                    sortedSessions.map((session) => (
                        <button
                            key={session.id}
                            type="button"
                            className={`w-full px-3 py-2 rounded-lg cursor-pointer transition-colors text-left text-sm ${
                                selectedSession?.id === session.id 
                                    ? 'bg-[#fff4e6] dark:bg-[#431407] text-[#9a3412] dark:text-[#fdba74]' 
                                    : 'text-[#1a1a1a] dark:text-[#a3a3a3] hover:bg-[#fff4e6] dark:hover:bg-[#431407]'
                            }`}
                            onClick={() => handleSessionSelect(session.id)}
                        >
                            <div className="truncate">{session.name}</div>
                        </button>
                    ))
                ) : (
                    <div className="text-[#737373] dark:text-[#a3a3a3] text-xs px-3 py-2 text-center">
                        Henüz oturum bulunmuyor
                    </div>
                )}
            </div>

            <button
                className="w-full px-3 py-2 rounded-lg text-sm text-[#ea580c] dark:text-[#fdba74] hover:bg-[#fff4e6] dark:hover:bg-[#431407] transition-colors text-left mt-2 font-medium"
                onClick={handleCreateSession}
            >
                + Yeni Sohbet
            </button>
        </div>
    );
}