import * as React from 'react'

export const Footer: React.FC = (): React.ReactElement<{}> => {
  return (<footer className='text-white mt-5 p-3 text-center' style={{ backgroundColor: '#154360' }}>
    Copyright &copy; {new Date().getFullYear()} Devs Network
  </footer>)
}