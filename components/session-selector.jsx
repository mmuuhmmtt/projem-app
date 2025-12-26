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
        <div className="space-y-2">
            
            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 pr-1">
                {sortedSessions.length > 0 ? (
                    sortedSessions.map((session) => (
                        <div
                            key={session.id}
                            className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                                selectedSession?.id === session.id 
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]' 
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md'
                            }`}
                            onClick={() => handleSessionSelect(session.id)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-xs transition-all shrink-0 ${
                                    selectedSession?.id === session.id 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-emerald-600 dark:text-emerald-300'
                                }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium truncate">{session.name}</div>
                                    <div className={`text-xs mt-1 ${
                                        selectedSession?.id === session.id 
                                            ? 'text-white/80' 
                                            : 'text-slate-500 dark:text-slate-400'
                                    }`}>
                                        {format(new Date(session.createdAt), 'dd MMM yyyy, HH:mm', { locale: tr })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-slate-500 dark:text-slate-400 text-sm p-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-2 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                        </svg>
                        Henüz oturum bulunmuyor
                    </div>
                )}
            </div>

            
            <button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white p-3 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                onClick={handleCreateSession}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Yeni Oturum Başlat
            </button>
        </div>
    );
}