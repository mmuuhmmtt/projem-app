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
        <div className="space-y-1">
            <div className="space-y-1">
                {users.map((user) => (
                    <button
                        type="button"
                        key={user.id}
                        className={`w-full px-3 py-2 rounded-lg cursor-pointer transition-colors text-left text-sm ${
                            selectedUser?.id === user.id 
                                ? 'bg-[#fff4e6] dark:bg-[#431407] text-[#9a3412] dark:text-[#fdba74]' 
                                : 'text-[#1a1a1a] dark:text-[#a3a3a3] hover:bg-[#fff4e6] dark:hover:bg-[#431407]'
                        }`}
                        onClick={() => handleUserSelect(user.id)}
                    >
                        {user.name}
                    </button>
                ))}
            </div>

            
            {isCreating ? (
                <div className="mt-2 space-y-2 animate-fade-in">
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-[#d4d4d4] dark:border-[#404040] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#a3a3a3] bg-[#ffffff] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#e5e5e5] text-sm"
                        placeholder="Kullanıcı adı"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateUser();
                        }}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            className="flex-1 bg-[#ea580c] dark:bg-[#ea580c] hover:bg-[#c2410c] dark:hover:bg-[#c2410c] text-white px-3 py-2 rounded-lg text-sm transition-colors"
                            onClick={handleCreateUser}
                        >
                            Ekle
                        </button>
                        <button
                            className="px-3 py-2 bg-[#f5f5f5] dark:bg-[#2d2d2d] hover:bg-[#e5e5e5] dark:hover:bg-[#404040] text-[#1a1a1a] dark:text-[#e5e5e5] rounded-lg text-sm transition-colors"
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
                    className="w-full px-3 py-2 rounded-lg text-sm text-[#ea580c] dark:text-[#fdba74] hover:bg-[#fff4e6] dark:hover:bg-[#431407] transition-colors text-left font-medium"
                    onClick={() => setIsCreating(true)}
                >
                    + Yeni Kullanıcı
                </button>
            )}
        </div>
    );
}