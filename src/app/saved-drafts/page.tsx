'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock saved drafts data (replace with actual data storage later)
const mockSavedDrafts = [
  {
    id: '1',
    name: 'Balanced Team Comp',
    date: '2024-03-15',
    draft: {
      Blue: {
        picks: [
          { id: 'tigreal', name: 'Tigreal', roles: ['Tank'], imageUrl: '/heroes/tigreal.jpg' },
          { id: 'lancelot', name: 'Lancelot', roles: ['Assassin'], imageUrl: '/heroes/lancelot.jpg' },
          { id: 'lunox', name: 'Lunox', roles: ['Mage'], imageUrl: '/heroes/lunox.jpg' },
          { id: 'claude', name: 'Claude', roles: ['Marksman'], imageUrl: '/heroes/claude.jpg' },
          { id: 'angela', name: 'Angela', roles: ['Support'], imageUrl: '/heroes/angela.jpg' }
        ],
        bans: [
          { id: 'yu-zhong', name: 'Yu Zhong', roles: ['Fighter'], imageUrl: '/heroes/yu-zhong.jpg' }
        ]
      },
      Red: {
        picks: [
          { id: 'tigreal', name: 'Tigreal', roles: ['Tank'], imageUrl: '/heroes/tigreal.jpg' },
          { id: 'lancelot', name: 'Lancelot', roles: ['Assassin'], imageUrl: '/heroes/lancelot.jpg' },
          { id: 'lunox', name: 'Lunox', roles: ['Mage'], imageUrl: '/heroes/lunox.jpg' },
          { id: 'claude', name: 'Claude', roles: ['Marksman'], imageUrl: '/heroes/claude.jpg' },
          { id: 'angela', name: 'Angela', roles: ['Support'], imageUrl: '/heroes/angela.jpg' }
        ],
        bans: [
          { id: 'yu-zhong', name: 'Yu Zhong', roles: ['Fighter'], imageUrl: '/heroes/yu-zhong.jpg' }
        ]
      }
    }
  }
];

export default function SavedDraftsPage() {
  const [drafts, setDrafts] = useState(mockSavedDrafts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredDrafts = drafts.filter(draft =>
    draft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(draft => draft.id !== id));
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Saved Drafts</h1>
          <Link
            href="/draft"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            New Draft
          </Link>
        </div>
        
        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drafts..."
            className="w-full max-w-md px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Drafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrafts.map(draft => (
            <div key={draft.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{draft.name}</h2>
                  <p className="text-gray-400 text-sm">{draft.date}</p>
                </div>
                <button
                  onClick={() => deleteDraft(draft.id)}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* Teams Preview */}
              <div className="space-y-4">
                {/* Blue Team */}
                <div>
                  <h3 className="text-sm font-medium text-blue-400 mb-2">Blue Team</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {draft.draft.Blue.picks.map((hero, index) => (
                      <div key={index} className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={hero.imageUrl}
                          alt={hero.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Red Team */}
                <div>
                  <h3 className="text-sm font-medium text-red-400 mb-2">Red Team</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {draft.draft.Red.picks.map((hero, index) => (
                      <div key={index} className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={hero.imageUrl}
                          alt={hero.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/draft?id=${draft.id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-lg transition-colors"
                >
                  Load Draft
                </Link>
                <button
                  onClick={() => {/* Implement share functionality */}}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredDrafts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No saved drafts found</p>
            <Link
              href="/draft"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create New Draft
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 