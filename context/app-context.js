"use client"

import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { mockUsers, mockAgents, mockSessions, mockMessages } from '@/data/mock-data';

const defaultContextValue = {
    users: [],
    agents: [],
    sessions: [],
    messages: [],
    selectedUser: null,
    selectedAgent: null,
    selectedSession: null,
    currentMessages: [],
    isLoading: false,
    selectUser: () => {},
    createUser: () => {},
    selectAgent: () => {},
    createAgent: () => {},
    selectSession: () => {},
    createSession: () => {},
    sendMessage: () => {},
    getUserAgents: () => [],
    getAgentSessions: () => []
};

const AppContext = createContext(defaultContextValue);

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext AppProvider içinde kullanılmalıdır!');
    }

    return context;
}

export function AppProvider({ children }) {
    const [users, setUsers] = useState(mockUsers);
    const [agents, setAgents] = useState(mockAgents);
    const [sessions, setSessions] = useState(mockSessions);
    const [messages, setMessages] = useState(mockMessages);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const selectUser = useCallback((userId) => {
        const user = users.find(u => u.id === userId);
        setSelectedUser(user || null);
        setSelectedAgent(null);
        setSelectedSession(null);
    }, [users]);

    const createUser = useCallback((name) => {
        const newUser = {
            id: `user-${Date.now()}`,
            name
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        return newUser;
    }, []);

    const selectAgent = useCallback((agentId) => {
        const agent = agents.find(a => a.id === agentId && a.userId === selectedUser?.id);
        setSelectedAgent(agent || null);
        setSelectedSession(null);
    }, [agents, selectedUser]);

    const createAgent = useCallback((name) => {
        if (!selectedUser) return null;

        const newAgent = {
            id: `agent-${Date.now()}`,
            name,
            userId: selectedUser.id
        };
        setAgents(prevAgents => [...prevAgents, newAgent]);
        return newAgent;
    }, [selectedUser]);

    const selectSession = useCallback((sessionId) => {
        const session = sessions.find(s => s.id === sessionId && s.agentId === selectedAgent?.id);
        setSelectedSession(session || null);

        if (session) {
            const sessionMessages = messages.filter(m => m.sessionId === session.id);
            setCurrentMessages(sessionMessages);
        } else {
            setCurrentMessages([]);
        }
    }, [sessions, selectedAgent, messages]);

    const createSession = useCallback(() => {
        if (!selectedAgent) return null;

        const newSession = {
            id: `session-${Date.now()}`,
            name: `Oturum ${new Date().toLocaleString('tr-TR')}`,
            agentId: selectedAgent.id,
            createdAt: new Date().toISOString()
        };
        setSessions(prevSessions => [...prevSessions, newSession]);
        return newSession;
    }, [selectedAgent]);

    const sendMessage = useCallback(async (content) => {
        if (!selectedSession || isLoading) return;

        const userMessage = {
            id: `msg-${Date.now()}`,
            sessionId: selectedSession.id,
            type: 'user',
            content,
            timestamp: new Date().toISOString()
        };

        // Kullanıcı mesajını hemen ekle
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setCurrentMessages(prevMessages => [...prevMessages, userMessage]);

        // Loading başlat
        setIsLoading(true);

        try {
            // Konuşma geçmişini hazırla (son 10 mesaj)
            const conversationHistory = currentMessages
                .filter(msg => msg.type === 'user' || msg.type === 'assistant')
                .slice(-10);

            // Client-side'dan direkt AI service'i kullan (GitHub Pages için)
            const { sendAIMessage } = await import('@/lib/ai-service');
            const aiResponse = await sendAIMessage(content, conversationHistory);

            const assistantMessage = {
                id: `msg-${Date.now() + 1}`,
                sessionId: selectedSession.id,
                type: 'assistant',
                content: aiResponse || 'Yanıt alınamadı',
                timestamp: new Date().toISOString(),
                citations: []
            };

            // Asistan mesajını ekle
            setMessages(prevMessages => [...prevMessages, assistantMessage]);
            setCurrentMessages(prevMessages => [...prevMessages, assistantMessage]);

        } catch (error) {
            console.error('Mesaj gönderme hatası:', error);
            
            // Hata mesajı göster
            const errorMessage = {
                id: `msg-${Date.now() + 1}`,
                sessionId: selectedSession.id,
                type: 'assistant',
                content: `Üzgünüm, bir hata oluştu: ${error.message}. Lütfen tekrar deneyin veya API anahtarınızı kontrol edin.`,
                timestamp: new Date().toISOString(),
                citations: []
            };

            setMessages(prevMessages => [...prevMessages, errorMessage]);
            setCurrentMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedSession, currentMessages, isLoading]);

    const getUserAgents = useCallback(() => {
        if (!selectedUser) return [];
        return agents.filter(agent => agent.userId === selectedUser.id);
    }, [agents, selectedUser]);

    const getAgentSessions = useCallback(() => {
        if (!selectedAgent) return [];
        return sessions.filter(session => session.agentId === selectedAgent.id);
    }, [sessions, selectedAgent]);

    useEffect(() => {
        if (users.length > 0 && !selectedUser) {
            selectUser(users[0].id);
        }
    }, [users, selectedUser, selectUser]);

    const contextValue = useMemo(() => ({
        users,
        agents,
        sessions,
        messages,
        selectedUser,
        selectedAgent,
        selectedSession,
        currentMessages,
        isLoading,
        selectUser,
        createUser,
        selectAgent,
        createAgent,
        selectSession,
        createSession,
        sendMessage,
        getUserAgents,
        getAgentSessions
    }), [
        users, agents, sessions, messages,
        selectedUser, selectedAgent, selectedSession, currentMessages, isLoading,
        selectUser, createUser, selectAgent, createAgent,
        selectSession, createSession, sendMessage,
        getUserAgents, getAgentSessions
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}