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
        <div className="p-4 md:p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 shadow-lg">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="flex gap-3 items-end">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            className="w-full p-4 pr-12 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all shadow-sm hover:shadow-md"
                            placeholder="Mesajınızı yazın..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {message.trim() && (
                            <button
                                type="button"
                                onClick={() => setMessage('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors"
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
                        className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:active:scale-100 flex items-center justify-center min-w-[60px]"
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
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 px-2">
                    Enter tuşuna basarak gönderebilirsiniz
                </p>
            </form>
        </div>
    );
}