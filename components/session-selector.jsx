import React from 'react';
import { useAppContext } from "@/context/app-context";

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
        <div className="bg-gray-50 rounded p-2">
            
            <div className="space-y-1 mb-2 max-h-60 overflow-y-auto">
                {sortedSessions.length > 0 ? (
                    sortedSessions.map((session) => (
                        <div
                            key={session.id}
                            className={`p-2 rounded cursor-pointer ${
                                selectedSession?.id === session.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'
                            }`}
                            onClick={() => handleSessionSelect(session.id)}
                        >
                            <div className="text-sm">{session.name}</div>
                            <div className="text-xs text-gray-500">
                                {new Date(session.createdAt).toLocaleDateString('tr-TR')}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-sm p-2">
                        Henüz oturum bulunmuyor
                    </div>
                )}
            </div>

            
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-sm"
                onClick={handleCreateSession}
            >
                + Yeni Oturum Başlat
            </button>
        </div>
    );
}