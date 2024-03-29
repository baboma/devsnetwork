import * as React from 'react'
import classnames from 'classnames'

interface TextFieldProps {
  name: string
  placeholder?: string
  value?: string
  error?: string
  info?: string
  type?: string
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
  disabled?: boolean
}

export const TextField: React.FC<TextFieldProps> = (props: TextFieldProps): React.ReactElement => {
  const { name, placeholder, value, error, info, type, onChange, disabled } = props
  return (<div className='form-group'>
    <input type={type} className={classnames('form-control form-control-lg', { 'is-invalid': error })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    {info && (<small className='form-text text-muted'>{info}</small>)}
    {error && (<div className='invalid-feedback'>{error}</div>)}
  </div>)
}