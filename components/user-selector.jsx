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
        <div className="bg-gray-50 rounded p-2">
            
            <div className="space-y-1 mb-2">
                {users.map((user) => (
                    <button
                        type="button"
                        key={user.id}
                        className={`w-full p-2 rounded cursor-pointer ${
                            selectedUser?.id === user.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200 bg-white text-gray-800'
                        }`}
                        onClick={() => handleUserSelect(user.id)}
                    >
                        {user.name}
                    </button>
                ))}
            </div>

            
            {isCreating ? (
                <div className="mt-2">
                    <input
                        type="text"
                        className="w-full p-2 border rounded mb-2"
                        placeholder="Yeni kullanıcı adı"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleCreateUser();
                        }}
                    />
                    <div className="flex space-x-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-grow"
                            onClick={handleCreateUser}
                        >
                            Ekle
                        </button>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded text-sm"
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
                    className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded text-sm"
                    onClick={() => setIsCreating(true)}
                >
                    + Yeni Kullanıcı
                </button>
            )}
        </div>
    );
}