import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/context/app-context';
import { MessageBubble } from "@/components/message-bubble";

export function ChatHistory() {
    const { currentMessages, selectedUser, isLoading } = useAppContext();
    const messagesEndRef = useRef(null);

    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentMessages]);

    if (!selectedUser) {
        return null;
    }

    return (
        <div className="flex-grow overflow-y-auto bg-[#ffffff] dark:bg-[#1a1a1a]">
            <div className="max-w-3xl mx-auto h-full">

               
                {currentMessages.length > 0 ? (
                    <div className="py-4 md:py-8 px-3 md:px-4 lg:px-8">
                        <div className="space-y-4 md:space-y-8">
                        {currentMessages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-fade-in">
                                <div className="flex items-start gap-3 md:gap-4 max-w-[90%] md:max-w-[85%]">
                                    <div className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full flex items-center justify-center bg-[#d4d4d4] dark:bg-[#404040]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                        </svg>
                                    </div>
                                    <div className="text-[#1a1a1a] dark:text-[#e5e5e5]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 bg-[#a3a3a3] dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-[#a3a3a3] dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-[#a3a3a3] dark:bg-[#737373] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full px-4">
                        <div className="text-center max-w-xl">
                            <h3 className="text-lg md:text-xl font-medium text-[#1a1a1a] dark:text-[#e5e5e5] mb-2">
                                Yeni sohbet başlat
                            </h3>
                            <p className="text-sm md:text-base text-[#737373] dark:text-[#a3a3a3]">
                                Aşağıdan bir mesaj göndererek sohbete başlayın.
                            </p>
                        </div>
                    </div>
                )}

                
                <div ref={messagesEndRef} className="h-4" />
            </div>
        </div>
    );
}