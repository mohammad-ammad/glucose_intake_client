import React, { useEffect, useState } from "react";
import NavbarComp from "../components/NavbarComp";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { getGlucose } from "../api/glucose";
const Glucose = () => {
    const [glucose, setGlucose] = useState([]); 
    const getAllGlucoseData = async () => {
        try {
            const response = await getGlucose();
            if (response?.status === 200) {
                setGlucose(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { getAllGlucoseData(); } , []);
  return (
    <>
      <NavbarComp />
      <div className="px-10 mt-10">
        <div className="flex justify-between items-center my-5">
            <h1>Glucose List</h1>
            <Link to="/add-glucose" className="bg-[#0E7490] px-3 py-2 text-white">Add Glucose</Link>
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>blood_glucose_level</Table.HeadCell>
              <Table.HeadCell>carb_intake</Table.HeadCell>
              <Table.HeadCell>medication_dose</Table.HeadCell>
              <Table.HeadCell>TimeStamp</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {
                    glucose.map((item, index) => {
                        return (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {item.blood_glucose_level}
                                </Table.Cell>
                                <Table.Cell>{item.carb_intake}</Table.Cell>
                                <Table.Cell>{item.medication_dose}</Table.Cell>
                                <Table.Cell>{item.createdAt}</Table.Cell>
                                <Table.Cell>
                                <a
                                    href="#"
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mx-5"
                                >
                                    Edit
                                </a>
                                <a
                                    href="#"
                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                >
                                    Delete
                                </a>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
            
              
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Glucose;
