import React from 'react'

const CustomInput = ({ column, data, type, onCancel }) => {
  return (
    <div>
      <label>Column:</label>
      <span>{column}</span>
      <br />
      <label>Data:</label>
      <span>{data}</span>
      <br />
      <label>Type:</label>
      <span>{type}</span>
      <div style={{ textAlign: 'right' }}>
        <button onClick={onCancel}>Cancel</button>
      </div>
      <hr />
    </div>
  )
}

export default CustomInput
