import React from 'react';

const InputField = ({ type = 'text', title = '', placeholder = '', readOnly = false, value = '', onChange }) => {
  return (
    <div>
      <label>
        {title}
        <input
          type={type}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          style={{ display: 'block', margin: '10px 0' }}
        />
      </label>
    </div>
  );
};

export default InputField;
