import React from 'react';

const CertificateTable = ({ data }) => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <table
        className="min-w-full text-left text-sm text-gray-800 dark:text-gray-100"
        aria-label="Certificate Table"
      >
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-xs">
          <tr>
            <th scope="col" className="p-4">
              <span className="sr-only">Select</span>
            </th>
            <th scope="col" className="px-6 py-4" aria-label="Full Name">
              Name
            </th>
            <th scope="col" className="px-6 py-4" aria-label="User Role">
              Role
            </th>
            <th scope="col" className="px-6 py-4" aria-label="Email Address">
              Email
            </th>
            <th scope="col" className="px-6 py-4" aria-label="Team Name">
              Team
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((cert, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-900 transition duration-150"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  aria-label={`Select certificate for ${cert.name}`}
                  className="rounded border-gray-300 focus:ring-indigo-500"
                />
              </td>
              <td className="px-6 py-4 font-medium whitespace-nowrap">{cert.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cert.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cert.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{cert.team}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CertificateTable;
