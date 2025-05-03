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

    const sendMessage = useCallback((content) => {
        if (!selectedSession) return;

        const userMessage = {
            id: `msg-${Date.now()}`,
            sessionId: selectedSession.id,
            type: 'user',
            content,
            timestamp: new Date().toISOString()
        };

        const assistantMessage = {
            id: `msg-${Date.now() + 1}`,
            sessionId: selectedSession.id,
            type: 'assistant',
            content: `"${content}" sorunuza cevabım şudur: Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
            timestamp: new Date().toISOString(),
            citations: Math.random() > 0.5 ? [
                {text: 'Kaynak 1', link: '#'},
                {text: 'Kaynak 2', link: '#'}
            ] : []
        };

        setMessages(prevMessages => {
            const newMessages = [...prevMessages, userMessage, assistantMessage];

            if (Math.random() > 0.7) {
                const toolMessage = {
                    id: `msg-${Date.now() + 2}`,
                    sessionId: selectedSession.id,
                    type: 'tool',
                    toolName: Math.random() > 0.5 ? 'web-search' : 'calculator',
                    content: 'Bu bir araç çağrısından dönen yanıttır.',
                    timestamp: new Date().toISOString()
                };
                newMessages.push(toolMessage);
            }

            return newMessages;
        });

        setCurrentMessages(prevMessages => [
            ...prevMessages,
            userMessage,
            assistantMessage,
            ...(Math.random() > 0.7 ? [{
                id: `msg-${Date.now() + 2}`,
                sessionId: selectedSession.id,
                type: 'tool',
                toolName: Math.random() > 0.5 ? 'web-search' : 'calculator',
                content: 'Bu bir araç çağrısından dönen yanıttır.',
                timestamp: new Date().toISOString()
            }] : [])
        ]);
    }, [selectedSession]);

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
        selectedUser, selectedAgent, selectedSession, currentMessages,
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