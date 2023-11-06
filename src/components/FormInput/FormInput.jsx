import { useId } from 'react';
import S from './FormInput.module.css';

export function FormInput({ type = 'text', name = null, label, ...restProps }) {
  const id = useId();

  return (
    <div className={S.inputWrapper}>
      <label htmlFor={id} className={S.label}>
        {label} <span className="text-red-600"> *</span>
      </label>
      <input
        type={type}
        name={name}
        required
        id={id}
        className={S.input}
        {...restProps}
      />
    </div>
  );
}
