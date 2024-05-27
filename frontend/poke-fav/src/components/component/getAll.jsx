'use client'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4ojAK5mHJFe
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useState, useEffect } from 'react';
import Head from 'next/head';

const GetAll = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/`);
        if (!response.ok) {
          throw new Error('Failed to fetch users data');
        }
        const data = await response.json();
        setUsersData(data);
        console.log(data)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return (
      <main className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Favourite Pokemon</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Favourite Pokemon</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Favourite Move</th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Reason</th>
              </tr>
            </thead>
            <tbody>
                {usersData.map((user, index) => (
                <tr className="border-b border-gray-200 dark:border-gray-700" key={index}>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{user.name}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{user.favourite_pokemon}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{user.favourite_move}</td>
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{user.reason}</td>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    )
}

export default GetAll;