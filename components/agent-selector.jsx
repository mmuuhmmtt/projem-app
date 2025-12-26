import React, { useState } from 'react';
import { useAppContext } from '@/context/app-context';

const AgentSelector = () => {
    const { selectedAgent, selectAgent, createAgent, getUserAgents } = useAppContext();
    const [newAgentName, setNewAgentName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const userAgents = getUserAgents();

    const handleAgentSelect = (agentId) => {
        selectAgent(agentId);
    };

    const handleCreateAgent = () => {
        if (newAgentName.trim()) {
            const newAgent = createAgent(newAgentName.trim());
            if (newAgent) {
                selectAgent(newAgent.id);
                setNewAgentName('');
                setIsCreating(false);
            }
        }
    };

    return (
        <div className="space-y-2">
            
            <div className="space-y-2">
                {userAgents.length > 0 ? (
                    userAgents.map((agent) => (
                        <button
                            type="button"
                            key={agent.id}
                            className={`w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-left group ${
                                selectedAgent?.id === agent.id 
                                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 scale-[1.02]' 
                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                            }`}
                            onClick={() => handleAgentSelect(agent.id)}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                                    selectedAgent?.id === agent.id 
                                        ? 'bg-white/20 text-white' 
                                        : 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-600 dark:text-blue-300'
                                }`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                </div>
                                <span className="font-medium">{agent.name}</span>
                            </div>
                        </button>
                    ))
                ) : (
                    <div className="text-slate-500 dark:text-slate-400 text-sm p-4 text-center bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto mb-2 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        Henüz agent bulunmuyor
                    </div>
                )}
            </div>

            
            {isCreating ? (
                <div className="mt-2 space-y-2 animate-fade-in">
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-blue-300 dark:border-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all"
                        placeholder="Yeni agent adı"
                        value={newAgentName}
                        onChange={(e) => setNewAgentName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateAgent();
                        }}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
                            onClick={handleCreateAgent}
                        >
                            Ekle
                        </button>
                        <button
                            className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all active:scale-95"
                            onClick={() => {
                                setIsCreating(false);
                                setNewAgentName('');
                            }}
                        >
                            İptal
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 p-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-all border border-slate-300 dark:border-slate-600 hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
                    onClick={() => setIsCreating(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Yeni Agent
                </button>
            )}
        </div>
    );
};

export default AgentSelector;