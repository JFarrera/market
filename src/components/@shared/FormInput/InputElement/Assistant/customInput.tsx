import React from 'react'
import Button from '@components/@shared/atoms/Button'
import styles from './assistant.module.css'
import InputElement from '..'

const CustomInput = ({ column, data, type, onCancel }) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputAddedContainer}>
        <label>Column:</label>
        <span>{column}</span>
        <br />
        <label>Data:</label>
        <span>{data}</span>
        <br />
        <label>Type:</label>
        <span>{type}</span>
        <div>
          <Button style="primary" size="small" onClick={onCancel}>
            Remove
          </Button>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default CustomInput
