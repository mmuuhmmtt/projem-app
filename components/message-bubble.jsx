import React from 'react';
import { Citation } from './citation';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export function MessageBubble({ message }) {
    const renderMessageContent = () => {
        switch (message.type) {
            case 'user':
                return (
                    <div className="bg-[#f5f5f5] dark:bg-[#2d2d2d] text-[#1a1a1a] dark:text-[#e5e5e5] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl">
                        <div className="text-sm md:text-[15px] leading-relaxed break-words">{message.content}</div>
                    </div>
                );
            case 'assistant':
                return (
                    <div className="text-[#1a1a1a] dark:text-[#e5e5e5]">
                        <div className="text-sm md:text-[15px] leading-relaxed whitespace-pre-line break-words">{message.content}</div>

                        
                        {message.citations && message.citations.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-[#e5e5e5] dark:border-[#2d2d2d]">
                                <div className="text-xs font-semibold text-[#737373] dark:text-[#a3a3a3] mb-2 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                    Kaynaklar
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {message.citations.map((citation, index) => (
                                        <Citation key={index} citation={citation} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'tool':
                return (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-slate-800 dark:text-slate-200 p-4 rounded-2xl rounded-tl-sm shadow-md border-l-4 border-amber-500 dark:border-amber-400">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-500 dark:bg-amber-400 flex items-center justify-center">
                                {message.toolName === 'web-search' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                )}
                                {message.toolName === 'calculator' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007V11.25Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008V11.25Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008V11.25Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Z" />
                                    </svg>
                                )}
                                {message.toolName === 'weather-api' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                                    </svg>
                                )}
                                {!message.toolName && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1 0-3.586 2.576 2.576 0 0 1 3.586 0l5.653 4.655" />
                                    </svg>
                                )}
                            </div>
                            <div className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                                {message.toolName === 'web-search' && 'Web Araması'}
                                {message.toolName === 'calculator' && 'Hesaplayıcı'}
                                {message.toolName === 'weather-api' && 'Hava Durumu'}
                                {!message.toolName && 'Araç Çağrısı'}
                            </div>
                        </div>
                        <div className="text-sm leading-relaxed">{message.content}</div>
                    </div>
                );
            default:
                return (
                    <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-2xl shadow-md">
                        <div className="text-sm leading-relaxed">{message.content}</div>
                    </div>
                );
        }
    };

    const getAvatar = () => {
        switch (message.type) {
            case 'user':
                return (
                    <div className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full flex items-center justify-center bg-[#d4d4d4] dark:bg-[#404040]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1a1a1a] dark:text-[#e5e5e5]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    </div>
                );
            case 'assistant':
                return (
                    <div className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full flex items-center justify-center bg-[#d4d4d4] dark:bg-[#404040]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#1a1a1a] dark:text-[#e5e5e5]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                    </div>
                );
            case 'tool':
                return (
                    <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-5.653a2.548 2.548 0 0 1 0-3.586 2.576 2.576 0 0 1 3.586 0l5.653 4.655" />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`flex animate-fade-in ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[90%] md:max-w-[85%]">
                <div className={`flex items-start gap-2 md:gap-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {getAvatar()}
                    
                    <div className="flex-1 min-w-0">
                        {renderMessageContent()}
                    </div>
                </div>
            </div>
        </div>
    );
}