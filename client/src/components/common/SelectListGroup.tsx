import React from 'react'
import classnames from 'classnames'

interface OPTION {
  label: string
  value: number | string
}

interface SELECTLISTGROUP {
  placeholder: string
  name: string
  value: string
  error?: string
  info: string
  onChange(e: React.ChangeEvent<HTMLSelectElement>): void
  options: OPTION[]
}

export const SelectListGroup = (props: SELECTLISTGROUP): React.ReactElement => {
  const { name, value, error, info, onChange, options } = props
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (<div className='form-group'>
    <select className={classnames('form-control form-control-lg', { 'is-invalid': error })}
      name={name}
      value={value}
      onChange={onChange}
    >
      {selectOptions}
    </select>
    {info && (<small className='form-text text-muted'>{info}</small>)}
    {error && (<div className='invalid-feedback'>{error}</div>)}
  </div >)
}