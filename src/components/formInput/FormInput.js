/* eslint-disable react/prop-types */
import React from 'react';
import { Translit } from '../../translitFunction/Translit';
import './FormInput.scss';

export default function FormInput({ label, type, name, placeholder, value, handleChange }) {
    return (
        <div className="block_input">
            <label
                htmlFor={type === 'radio' ? `${name}_${Translit(value)}` : name}
                className={type === 'radio' ? 'label_with_radio' : 'label_with_out_radio'}
            >
                {label}
            </label>
            <input
                className={label ? 'input_with_label' : 'input_with_out_label'}
                type={type}
                name={name}
                placeholder={placeholder}
                id={type === 'radio' ? `${name}_${Translit(value)}` : name}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
