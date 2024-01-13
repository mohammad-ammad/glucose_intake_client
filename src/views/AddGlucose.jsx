import React from 'react'
import NavbarComp from '../components/NavbarComp'
import { Button, Label, TextInput} from "flowbite-react";
import { addGlucose } from '../api/glucose';
const AddGlucose = () => {
  const [blood_glucose_level, setBlood_glucose_level] = React.useState('')
  const [carb_intake, setCarb_intake] = React.useState('')
  const [medication_dose, setMedication_dose] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)

  const onChange = (event) => {
    const { name, value } = event.target
    if (name === 'blood_glucose_level') {
      setBlood_glucose_level(value)
    }
    if (name === 'carb_intake') {
      setCarb_intake(value)
    }
    if (name === 'medication_dose') {
      setMedication_dose(value)
    }
  }

  const submitHandler = async (event) => {
    try {
      event.preventDefault()
      setLoading(true)
      if (blood_glucose_level === '') {
        setError('blood_glucose_level is required')
        return
      }

      if (carb_intake === '') {
        setError('carb_intake is required')
        return
      }

      if (medication_dose === '') {
        setError('medication_dose is required')
        return
      }

      setError(null)

      const response = await addGlucose({ blood_glucose_level, carb_intake, medication_dose })
      
      if (response?.response?.status === 400) {
        setError(response.response.data.msg)
        setLoading(false)
        return
      }

      if (response?.status === 200) {
        setSuccess('Glucose added successfully')
        setLoading(false)
      }

      setBlood_glucose_level('')
      setCarb_intake('')
      setMedication_dose('')
    } catch (error) {
      setError(error.response.data.message)
      setLoading(false)
    }
  };
  return (
    <>
    <NavbarComp/>
    <div className="w-full h-screen flex justify-center items-center">
        <form
          className="flex px-5 w-[500px] flex-col gap-4"
          onSubmit={submitHandler}
        >
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {
            success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{success}</span>
                </div>
                )
          }
          <div>
            <div className="mb-2 block">
              <Label htmlFor="blood_glucose_level" value="blood_glucose_level" />
            </div>
            <TextInput
              id="blood_glucose_level"
              type="text"
              name="blood_glucose_level"
              value={blood_glucose_level}
              onChange={onChange}
              placeholder="blood_glucose_level"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="carb_intake" value="carb_intake" />
            </div>
            <TextInput
              id="carb_intake"
              type="text"
              name="carb_intake"
              value={carb_intake}
              onChange={onChange}
              placeholder="carb_intake"
              required
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="medication_dose" value="medication_dose" />
            </div>
            <TextInput
              id="medication_dose"
              type="text"
              name="medication_dose"
              value={medication_dose}
              onChange={onChange}
              placeholder="medication_dose"
              required
            />
          </div>
         
          <Button type="submit">
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Creating Glucose...</span>
              </div>
            ) : (
              "submit"
            )}
          </Button>
        </form>
      </div>
    </>
  )
}

export default AddGlucose