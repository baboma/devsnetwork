import React from 'react'
import classnames from 'classnames'

interface TextAreaFieldProps {
  name: string
  placeholder?: string
  value: string
  error?: string
  info?: string
  type?: string
  onChange(e: React.ChangeEvent<HTMLTextAreaElement>): void
  disabled?: boolean
}

export const TextAreaField: React.FC<TextAreaFieldProps> = (props: TextAreaFieldProps): React.ReactElement => {
  const { name, placeholder, value, error, info, onChange } = props
  return (<div className='form-group'>
    <textarea className={classnames('form-control', { 'is-invalid': error })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {info && (<small className='form-text text-muted'>{info}</small>)}
    {error && (<div className='invalid-feedback'>{error}</div>)}
  </div>)
}

/*
export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps): React.ReactElement => {
  const { name, placeholder, value, error, info, type, onChange, disabled } = props
  return (<>
    <input type={type} className={classnames('form-control form-control-lg', { 'is-invalid': error })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {info && (<small className='form-text text-muted'>{info}</small>)}
    {error && (<div className='invalid-feedback'>{error}</div>)}
  </>)
}
*/