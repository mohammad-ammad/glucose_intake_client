import React, { useEffect } from 'react'
import NavbarComp from '../components/NavbarComp'
import MyChart from '../components/MyChart';
import MyBarChart from '../components/MyBarChart';
import MyAreaChart from '../components/MyAreaChart';
import { getGlucose } from '../api/glucose';

const Main = () => {
  // const data = [
  //   { TIMESTAMP: 1, BLOOD_GLUCOSE_LEVEL: 100, CARB_INTAKE: 30, MEDICATION_DOSE: 5 },
  //   { TIMESTAMP: 2, BLOOD_GLUCOSE_LEVEL: 110, CARB_INTAKE: 40, MEDICATION_DOSE: 6 },
  //   // Add more data as needed
  // ];
  const [data, setData] = React.useState(null);

  const getAllGlucoseData = async () => {
    try {
      const response = await getGlucose();
      if (response?.status === 200) {
        const newData = response.data.map((entry,i) => ({
          BLOOD_GLUCOSE_LEVEL: entry.blood_glucose_level,
          CARB_INTAKE: entry.carb_intake,
          MEDICATION_DOSE: entry.medication_dose,
          TIMESTAMP: entry.createdAt, // Assuming the API response has timestamp property
        }));
        setData(newData);
        console.log(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => { getAllGlucoseData(); } , []);
  return (
    <>
    <NavbarComp/>
    <div>
      <h1 className='text-4xl text-center mt-10'>Glucose Data over user period</h1>
    </div>
    <div className='flex justify-between items-center px-10 mt-10'>
    {/* <MyChart data={data} /> */}
    <MyAreaChart data={data} />
    <MyBarChart data={data} />
    </div>
    </>
  )
}

export default Main