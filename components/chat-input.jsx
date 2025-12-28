import React, { useState } from 'react';
import { useAppContext } from '@/context/app-context';

export function ChatInput() {
    const [message, setMessage] = useState('');
    const { sendMessage, selectedSession, isLoading } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (message.trim() && selectedSession && !isLoading) {
            const messageToSend = message.trim();
            setMessage('');
            await sendMessage(messageToSend);
        }
    };

    if (!selectedSession) {
        return null;
    }

    return (
        <div className="border-t border-[#e5e5e5] dark:border-[#2d2d2d] bg-[#ffffff] dark:bg-[#1a1a1a] safe-area-bottom">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="p-3 md:p-4">
                    <div className="flex gap-2 items-end">
                        <div className="flex-1 relative">
                            <textarea
                                rows={1}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 pr-10 md:pr-12 bg-[#ffffff] dark:bg-[#1a1a1a] border border-[#d4d4d4] dark:border-[#404040] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#a3a3a3] dark:focus:ring-[#737373] text-[#1a1a1a] dark:text-[#e5e5e5] placeholder-[#a3a3a3] dark:placeholder-[#737373] resize-none text-sm md:text-[15px] leading-relaxed"
                                placeholder="Mesajınızı yazın..."
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                            />
                            {message.trim() && (
                                <button
                                    type="button"
                                    onClick={() => setMessage('')}
                                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-1 rounded-lg hover:bg-[#f5f5f5] dark:hover:bg-[#2d2d2d] transition-colors touch-manipulation"
                                    aria-label="Temizle"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!message.trim() || isLoading}
                            className="p-2.5 md:p-3 bg-[#ea580c] dark:bg-[#ea580c] hover:bg-[#c2410c] dark:hover:bg-[#c2410c] disabled:bg-[#d4d4d4] dark:disabled:bg-[#2d2d2d] disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center shrink-0 touch-manipulation min-w-[44px] min-h-[44px]"
                            aria-label="Gönder"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h2.25M6 12h2.25M18 12h2.25M18 12l2.25 2.25M18 12l2.25-2.25" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}