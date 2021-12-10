import React from 'react';
import './style.css';

const Input = ({ inputSize, name, value, placeholder, setState }) => {
  return (
    <input
      className={`input ${inputSize}`}
      type="text" 
      placeholder={placeholder} 
      name={name}
      value={value}
      onChange={e => setState(e.target.value)}
    />
  );
}
export default Input;