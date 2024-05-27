'use client'
import { useState } from 'react';
import GetUser from './getUser';

const UserSearch = () => {
  const [userId, setUserId] = useState('');
  const [submittedId, setSubmittedId] = useState(null);

  const handleInputChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedId(userId);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-md shadow-md p-6 dark:bg-gray-950 dark:text-gray-50">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Search User</h2>
              <p className="text-gray-500 dark:text-gray-400">Enter a user ID to search.</p>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <input
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:focus:border-gray-600 dark:focus:ring-gray-600"
                placeholder="Enter user ID"
                value={userId}
                onChange={handleInputChange}
                type="text"
              />
              <button
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                type="submit"
              >
                Search
              </button>
            </form>
            {submittedId && <GetUser userId={submittedId} />}
          </div>
        </div>
      </div>
    </div>
      
  );
};

export default UserSearch;