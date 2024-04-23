import React from 'react'
import "../App.css"
const Input = ({name,placeholder,handleInputEvent}) => {
  return (
    <div>
        <input type="text" name={name} className='input-field' placeholder={placeholder} onChange={handleInputEvent} />

    </div>
  )
}

export default Input