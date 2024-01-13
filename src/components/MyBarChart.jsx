import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    // Handle the case where data is undefined or empty
    return <div>No data available for the bar chart.</div>;
  }

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="TIMESTAMP" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="BLOOD_GLUCOSE_LEVEL" fill="#8884d8" />
          <Bar dataKey="CARB_INTAKE" fill="#82ca9d" />
          <Bar dataKey="MEDICATION_DOSE" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyBarChart;
