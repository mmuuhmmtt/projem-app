"use client"

import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { mockUsers, mockMessages } from '@/data/mock-data';

const defaultContextValue = {
    users: [],
    messages: [],
    selectedUser: null,
    currentMessages: [],
    isLoading: false,
    selectUser: () => {},
    createUser: () => {},
    sendMessage: () => {},
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
    const [messages, setMessages] = useState(mockMessages);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Kullanıcı seçilince direkt sohbet başlat
    const selectUser = useCallback((userId) => {
        const user = users.find(u => u.id === userId);
        setSelectedUser(user || null);
        
        // Kullanıcının mesajlarını yükle
        if (user) {
            const userMessages = messages.filter(m => m.userId === user.id);
            
            // Eğer kullanıcının hiç mesajı yoksa, hoş geldin mesajı ekle
            if (userMessages.length === 0) {
                const welcomeMessage = {
                    id: `msg-welcome-${user.id}`,
                    userId: user.id,
                    type: 'assistant',
                    content: 'Merhaba, ben Muhammed. Size nasıl yardımcı olabilirim?',
                    timestamp: new Date().toISOString(),
                    citations: []
                };
                setCurrentMessages([welcomeMessage]);
                // Hoş geldin mesajını kalıcı olarak ekle
                setMessages(prevMessages => {
                    // Eğer zaten eklenmemişse ekle
                    if (!prevMessages.find(m => m.id === welcomeMessage.id)) {
                        return [...prevMessages, welcomeMessage];
                    }
                    return prevMessages;
                });
            } else {
                setCurrentMessages(userMessages);
            }
        } else {
            setCurrentMessages([]);
        }
    }, [users, messages]);

    // Yeni kullanıcı oluştur ve direkt sohbete başlat
    const createUser = useCallback((name) => {
        const newUser = {
            id: `user-${Date.now()}`,
            name: name.trim()
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        setSelectedUser(newUser);
        
        // Yeni kullanıcı için hoş geldin mesajı ekle
        const welcomeMessage = {
            id: `msg-welcome-${newUser.id}`,
            userId: newUser.id,
            type: 'assistant',
            content: 'Merhaba, ben Muhammed. Size nasıl yardımcı olabilirim?',
            timestamp: new Date().toISOString(),
            citations: []
        };
        setCurrentMessages([welcomeMessage]);
        setMessages(prevMessages => [...prevMessages, welcomeMessage]);
        
        return newUser;
    }, []);

    const sendMessage = useCallback(async (content) => {
        if (!selectedUser || isLoading) return;

        const userMessage = {
            id: `msg-${Date.now()}`,
            userId: selectedUser.id,
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
                userId: selectedUser.id,
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
                userId: selectedUser.id,
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
    }, [selectedUser, currentMessages, isLoading]);

    // İlk kullanıcıyı otomatik seç
    useEffect(() => {
        if (users.length > 0 && !selectedUser) {
            selectUser(users[0].id);
        }
    }, [users, selectedUser, selectUser]);

    const contextValue = useMemo(() => ({
        users,
        messages,
        selectedUser,
        currentMessages,
        isLoading,
        selectUser,
        createUser,
        sendMessage,
    }), [
        users, messages,
        selectedUser, currentMessages, isLoading,
        selectUser, createUser, sendMessage,
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}
