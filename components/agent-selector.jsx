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
        <div className="space-y-1">
            <div className="space-y-1">
                {userAgents.length > 0 ? (
                    userAgents.map((agent) => (
                        <button
                            type="button"
                            key={agent.id}
                            className={`w-full px-3 py-2 rounded-lg cursor-pointer transition-colors text-left text-sm ${
                                selectedAgent?.id === agent.id 
                                    ? 'bg-[#fff4e6] dark:bg-[#431407] text-[#9a3412] dark:text-[#fdba74]' 
                                    : 'text-[#1a1a1a] dark:text-[#a3a3a3] hover:bg-[#fff4e6] dark:hover:bg-[#431407]'
                            }`}
                            onClick={() => handleAgentSelect(agent.id)}
                        >
                            {agent.name}
                        </button>
                    ))
                ) : (
                    <div className="text-[#737373] dark:text-[#a3a3a3] text-xs px-3 py-2 text-center">
                        Henüz agent bulunmuyor
                    </div>
                )}
            </div>

            {isCreating ? (
                <div className="mt-2 space-y-2 animate-fade-in">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-[#d4d4d4] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a3a3a3] bg-[#ffffff] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#e5e5e5] text-sm"
                        placeholder="Agent adı"
                        value={newAgentName}
                        onChange={(e) => setNewAgentName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateAgent();
                        }}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            className="flex-1 bg-[#ea580c] dark:bg-[#ea580c] hover:bg-[#c2410c] dark:hover:bg-[#c2410c] text-white px-3 py-2 rounded-lg text-sm transition-colors"
                            onClick={handleCreateAgent}
                        >
                            Ekle
                        </button>
                        <button
                            className="px-3 py-2 bg-[#f5f5f5] dark:bg-[#2d2d2d] hover:bg-[#e5e5e5] dark:hover:bg-[#404040] text-[#1a1a1a] dark:text-[#e5e5e5] rounded-lg text-sm transition-colors"
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
                    className="w-full px-3 py-2 rounded-lg text-sm text-[#ea580c] dark:text-[#fdba74] hover:bg-[#fff4e6] dark:hover:bg-[#431407] transition-colors text-left font-medium"
                    onClick={() => setIsCreating(true)}
                >
                    + Yeni Agent
                </button>
            )}
        </div>
    );
};

export default AgentSelector;