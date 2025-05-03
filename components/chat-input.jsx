import React, { useState } from 'react';
import { useAppContext } from '@/context/app-context';

export function ChatInput() {
    const [message, setMessage] = useState('');
    const { sendMessage, selectedSession } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message.trim() && selectedSession) {
            sendMessage(message);
            setMessage('');
        }
    };

    if (!selectedSession) {
        return null;
    }

    return (
        <div className="p-4 bg-white">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="flex gap-2">
                    <input
                        type="text"
                        className="flex-grow p-3 border border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        placeholder="Mesajınızı yazın..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        disabled={!message.trim()}
                    >
                        Gönder
                    </button>
                </div>
            </form>
        </div>
    );
}