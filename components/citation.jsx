import React from 'react';

export function Citation({ citation }) {
    return (
        <a
            href={citation.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs bg-gray-100 hover:bg-gray-200 text-blue-600 px-2 py-1 rounded"
        >
            {citation.text}
        </a>
    );
}