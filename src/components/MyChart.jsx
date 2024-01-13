import React from 'react';
import { Chart, LineSeries, Axis, Tooltip } from 'react-charts';

const MyChart = ({ data }) => {
  const chartData = React.useMemo(
    () => [
      {
        label: 'Blood Glucose Level',
        data: data.map(entry => [entry.TIMESTAMP, entry.BLOOD_GLUCOSE_LEVEL]),
      },
      {
        label: 'Carb Intake',
        data: data.map(entry => [entry.TIMESTAMP, entry.CARB_INTAKE]),
      },
      {
        label: 'Medication Dose',
        data: data.map(entry => [entry.TIMESTAMP, entry.MEDICATION_DOSE]),
      },
    ],
    [data]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom', title: 'Timestamp' },
      { type: 'linear', position: 'left', title: 'Values' },
    ],
    []
  );

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Chart data={chartData} axes={axes}>
        <LineSeries />
        <Axis primary type="linear" position="left" showGrid={true} />
        <Axis type="linear" position="bottom" showGrid={true} />
        <Tooltip />
      </Chart>
    </div>
  );
};

export default MyChart;
