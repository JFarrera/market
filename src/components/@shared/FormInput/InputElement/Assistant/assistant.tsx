import React, { useState, ReactElement, ChangeEvent, useEffect } from 'react'
import { FormPublishData } from '@components/Publish/_types'
import { useField, useFormikContext } from 'formik'
import Button from '@components/@shared/atoms/Button'
import styles from './assistant.module.css'
import InputElement from '..'
import { InputProps } from '@shared/FormInput'

// export interface QueryInput {
//   column: string
//   type: string
//   data: string
// }

export default function DynamicInputs(props: InputProps): ReactElement {
  const { form } = props
  const [field] = useField(props.name)
  const { setFieldValue } = useFormikContext<FormPublishData>()

  const [currentColumn, setCurrentColumn] = useState('')
  const [currentType, setCurrentType] = useState('')
  const [currentData, setCurrentData] = useState('')
  const [disabledButton, setDisabledButton] = useState(true)
  const [inputs, setInputs] = useState([])
  const [successMessage, setSuccessMessage] = useState('')

  const addInput = () => {
    setInputs((prev) => [...prev, [currentColumn, currentData, currentType]])
    setCurrentColumn('')
    setCurrentData('')
    setCurrentType('')
  }

  const removeInput = (i: number) => {
    const newInputs = inputs.filter((input, index) => index !== i)
    setInputs(newInputs)
    setCurrentColumn('')
    setCurrentData('')
    setCurrentType('')
  }

  const handleSubmit = () => {
    if (inputs.length > 0) {
      setFieldValue('services[0].assistant', inputs)
      setSuccessMessage('Added correctly!')
      setTimeout(() => {
        setSuccessMessage('')
      }, 1000)
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const fieldName = e.target.name

    if (fieldName.endsWith('column')) {
      setCurrentColumn(e.target.value)
    } else if (fieldName.endsWith('data')) {
      setCurrentData(e.target.value)
    } else if (fieldName.endsWith('type')) {
      setCurrentType(e.target.value)
    }

    return e
  }

  useEffect(() => {
    form.setFieldValue(`${field.name}`, inputs)
  }, [inputs])

  useEffect(() => {
    setDisabledButton(!currentColumn || !currentData)
  }, [currentColumn, currentData, currentType])

  return (
    <div className={styles.generalContainer}>
      <div className={styles.inputContainer}>
        <InputElement
          className={styles.input}
          name={`${field.name}.column`}
          placeholder="column"
          value={currentColumn}
          onChange={handleChange}
        />
        <InputElement
          className={styles.input}
          name={`${field.name}.data`}
          placeholder="data"
          value={currentData}
          onChange={handleChange}
        />
        <InputElement
          className={styles.input}
          name={`${field.name}.type`}
          placeholder="type"
          value={currentType}
          onChange={handleChange}
        />
        <Button
          style="primary"
          size="small"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault()
            addInput()
          }}
          disabled={disabledButton}
        >
          add
        </Button>
      </div>

      {inputs.length > 0 &&
        inputs.map((input, i) => {
          return (
            <div className={styles.inputAddedContainer} key={`input_${i}`}>
              <InputElement
                name={`input[${i}].column`}
                value={input[0]}
                disabled
              />

              <InputElement
                name={`input[${i}].data`}
                value={input[1]}
                disabled
              />

              <InputElement
                name={`input[${i}].type`}
                value={input[2]}
                disabled
              />

              <Button
                style="primary"
                size="small"
                onClick={(e: React.SyntheticEvent) => {
                  e.preventDefault()
                  removeInput(i)
                }}
                disabled={false}
              >
                remove
              </Button>
            </div>
          )
        })}
      {successMessage && <p>{successMessage}</p>}
      <Button style="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}
