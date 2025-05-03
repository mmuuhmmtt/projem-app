import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/app-context';
import { MessageBubble } from "@/components/message-bubble";

export function ChatHistory() {
    const { currentMessages, selectedSession } = useAppContext();
    const messagesEndRef = useRef(null);

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    if (!selectedSession) {
        return null;
    }

    return (
        <div className="flex-grow overflow-y-auto bg-gray-50">
            <div className="max-w-3xl mx-auto">
                
                <div className="text-center mb-4 p-4.5 border-b sticky top-0 bg-white z-10 shadow-sm">
                    <h2 className="font-medium text-gray-700">{selectedSession.name}</h2>
                </div>

               
                {currentMessages.length > 0 ? (
                    <div className="space-y-4 py-4 px-2">
                        {currentMessages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>Bu oturumda henüz mesaj bulunmuyor.</p>
                        <p className="text-sm mt-2">Aşağıdan bir mesaj göndererek sohbete başlayabilirsiniz.</p>
                    </div>
                )}

                
                <div ref={messagesEndRef} />
            </div>
        </div>
    );
}