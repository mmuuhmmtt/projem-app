import React, { useState } from 'react';
import {useAppContext} from "@/context/app-context";

export function UserSelector() {
    const { users, selectedUser, selectUser, createUser } = useAppContext();
    const [newUserName, setNewUserName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleUserSelect = (userId) => {
        selectUser(userId);
    };

    const handleCreateUser = () => {
        if (newUserName.trim()) {
            const newUser = createUser(newUserName.trim());
            selectUser(newUser.id);
            setNewUserName('');
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-2">
            
            <div className="space-y-2">
                {users.map((user) => (
                    <button
                        type="button"
                        key={user.id}
                        className={`w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-left group ${
                            selectedUser?.id === user.id 
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]' 
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md'
                        }`}
                        onClick={() => handleUserSelect(user.id)}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                                selectedUser?.id === user.id 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 text-indigo-600 dark:text-indigo-300'
                            }`}>
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-medium">{user.name}</span>
                        </div>
                    </button>
                ))}
            </div>

            
            {isCreating ? (
                <div className="mt-2 space-y-2 animate-fade-in">
                    <input
                        type="text"
                        className="w-full p-3 border-2 border-indigo-300 dark:border-indigo-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 transition-all"
                        placeholder="Yeni kullanıcı adı"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateUser();
                        }}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
                            onClick={handleCreateUser}
                        >
                            Ekle
                        </button>
                        <button
                            className="px-4 py-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium transition-all active:scale-95"
                            onClick={() => {
                                setIsCreating(false);
                                setNewUserName('');
                            }}
                        >
                            İptal
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 p-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 transition-all border border-slate-300 dark:border-slate-600 hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
                    onClick={() => setIsCreating(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Yeni Kullanıcı
                </button>
            )}
        </div>
    );
}