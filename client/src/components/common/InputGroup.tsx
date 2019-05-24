import React from 'react'
import classnames from 'classnames'

interface GROUPINPUT {
  name: string
  placeholder: string
  value: string
  error?: string
  type?: string
  icon: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export const InputGroup = (props: GROUPINPUT): React.ReactElement => {
  const { name, placeholder, value, error, type, icon, onChange } = props
  return (<div className='input-group mb-3'>
    <div className='input-group-prepend'>
      <div className='input-group-text'>
        <i className={icon} />
      </div>
    </div>
    <input type={type} className={classnames('form-control form-control-lg', { 'is-invalid': error })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && (<div className='invalid-feedback'>{error}</div>)}
  </div >)
}