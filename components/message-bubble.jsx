import React from 'react';
import { Citation } from './citation';
import { format } from 'date-fns';

export function MessageBubble({ message }) {
    console.log(message)
    const renderMessageContent = () => {
        switch (message.type) {
            case 'user':
                return (
                    <div className="bg-blue-100 text-blue-900 p-3 rounded-lg rounded-tr-none shadow-sm">
                        <div className="text-sm">{message.content}</div>
                    </div>
                );
            case 'assistant':
                return (
                    <div className="bg-white text-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm">
                        <div className="text-sm whitespace-pre-line">{message.content}</div>

                        
                        {message.citations && message.citations.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                                <div className="text-xs text-gray-500 mb-1">Kaynaklar:</div>
                                <div className="flex flex-wrap gap-1">
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
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none shadow-sm border-l-4 border-indigo-400">
                        <div className="text-xs font-medium text-indigo-600 mb-1">
                            {message.toolName === 'web-search' && '🔍 Web Araması'}
                            {message.toolName === 'calculator' && '🧮 Hesaplayıcı'}
                            {message.toolName === 'weather-api' && '☁️ Hava Durumu'}
                            {!message.toolName && '🛠️ Araç'}
                        </div>
                        <div className="text-sm">{message.content}</div>
                    </div>
                );
            default:
                return (
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                        <div className="text-sm">{message.content}</div>
                    </div>
                );
        }
    };

    return (
        <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%]">
                <div className={`flex items-end gap-2 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    
                    <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-white text-sm ${message.type === 'user' ? 'bg-blue-500' : message.type === 'assistant' ? 'bg-green-500' : 'bg-indigo-500'}`}>
                        {message.type === 'user' && 'U'}
                        {message.type === 'assistant' && 'A'}
                        {message.type === 'tool' && 'T'}
                    </div>

                    
                    <div className="mb-1">
                        {renderMessageContent()}

                        
                        <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                            {format(new Date(message.timestamp), 'dd MMM yyyy HH:mm')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}