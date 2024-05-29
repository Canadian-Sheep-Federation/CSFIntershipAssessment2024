import React from 'react';

const Docs = () => {
  return (
    <div className="p-6 text-left">
      <h2 className="text-2xl font-bold mb-4">Documentation</h2>
      <p className="mb-4">Welcome to the Documentation section. Here you can find information about how to use this application.</p>
      <h3 className="text-xl font-semibold mb-2">API Endpoints</h3>
      <ul className="list-disc list-inside mb-4">
      <li>
          <code className="bg-gray-100 text-orange-600 p-1 rounded">POST /api/form</code>: Submit form data and store it in the database.
        </li>
        <li>
          <code className="bg-gray-100 text-orange-600 p-1 rounded">GET /api/form</code>: Retrieve all form responses.
        </li>
        <li>
          <code className="bg-gray-100 text-orange-600 p-1 rounded">GET /api/form/[id]</code>: Retrieve a specific form response by ID.
        </li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Web Application</h3>
      <p className="mb-4">This web application allows you to:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Submit form data including name, email, and stock symbol.</li>
        <li>Fetch stock data from the Marketstack API based on the provided stock symbol.</li>
        <li>View all form responses submitted.</li>
        <li>Fetch a specific form response by its ID.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Example API Endpoints</h3>
      <ul className="list-disc list-inside mb-4">
        <li>
          <a href="/api/form" target="_blank" className="text-blue-500 hover:underline">
            GET /api/form
          </a>: Retrieve all form responses.
        </li>
        <li>
          <a href="/api/form/1" target="_blank" className="text-blue-500 hover:underline">
            GET /api/form/1
          </a>: Retrieve the form response with ID 1 (replace with actual ID).
        </li>
      </ul>
    </div>
  );
};

export default Docs;
