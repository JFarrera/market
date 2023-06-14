import React, { useState } from 'react'
import CustomInput from './customInput'
import { FormPublishData } from '@components/Publish/_types'
import { useFormikContext } from 'formik'

export default function DynamicInputs() {
  const [inputValues, setInputValues] = useState([])
  const [column, setColumn] = useState('')
  const [data, setData] = useState('')
  const [type, setType] = useState('')
  const { values, setFieldValue } = useFormikContext<FormPublishData>()
  const [successMessage, setSuccessMessage] = useState('')

  const handleAddInput = () => {
    if (column && data) {
      const newInput = [column, data, type]
      setInputValues([...inputValues, newInput])
      setColumn('')
      setData('')
      setType('')
    }
  }

  const handleSubmit = () => {
    if (inputValues.length > 0) {
      setFieldValue('services[0].assistant', inputValues)
      setSuccessMessage('Added correctly!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 1000)
    }
  }

  const handleCancelInput = (index) => {
    const updatedInputs = [...inputValues]
    updatedInputs.splice(index, 1)
    setInputValues(updatedInputs)
  }

  return (
    <div>
      {inputValues.map((input, index) => (
        <div key={index}>
          <CustomInput
            column={input[0]}
            data={input[1]}
            type={input[2]}
            onCancel={() => handleCancelInput(index)}
          />
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Column"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        />
        <select value={data} onChange={(e) => setData(e.target.value)}>
          <option value="">Select option</option>
          <option value="integer">integer</option>
          <option value="float">float</option>
          <option value="double">double</option>
          <option value="string">string</option>
          <option value="boolean">boolean</option>
          <option value="binary">binary</option>
          <option value="date">date</option>
          <option value="time">time</option>
          <option value="datetime">datetime</option>
        </select>
        <input
          type="text"
          placeholder="e.g (m, cm, kg, g, l, ...)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <button onClick={handleAddInput}>Add Input</button>
      </div>
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
