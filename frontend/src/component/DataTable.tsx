import React from 'react';

interface DataItem {
  user: string;
  email: string;
  mobile: number;
}

interface DataTableProps {
  data: DataItem[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="data-table">
      <h3>Data Table</h3>
      <table border={2}>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.user}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
