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
        <div className="bg-gray-50 rounded p-2">
            
            <div className="space-y-1 mb-2">
                {userAgents.length > 0 ? (
                    userAgents.map((agent) => (
                        <button
                            type="button"
                            key={agent.id}
                            className={`w-full p-2 rounded cursor-pointer ${
                                selectedAgent?.id === agent.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'
                            }`}
                            onClick={() => handleAgentSelect(agent.id)}
                        >
                            {agent.name}
                        </button>
                    ))
                ) : (
                    <div className="text-gray-500 text-sm p-2">
                        Henüz agent bulunmuyor
                    </div>
                )}
            </div>

            
            {isCreating ? (
                <div className="mt-2">
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Yeni agent adı"
                        value={newAgentName}
                        onChange={(e) => setNewAgentName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateAgent();
                        }}
                    />
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-grow"
                            onClick={handleCreateAgent}
                        >
                            Ekle
                        </button>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded text-sm"
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
                    className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded text-sm"
                    onClick={() => setIsCreating(true)}
                >
                    + Yeni Agent
                </button>
            )}
        </div>
    );
};

export default AgentSelector;