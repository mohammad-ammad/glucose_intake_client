import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyAreaChart = ({ data }) => {
  if (!data || data.length === 0) {
    // Handle the case where data is undefined or empty
    return <div>No data available for the area chart.</div>;
  }

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="TIMESTAMP" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="BLOOD_GLUCOSE_LEVEL" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="CARB_INTAKE" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="MEDICATION_DOSE" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyAreaChart;
