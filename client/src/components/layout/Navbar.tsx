import * as React from 'react'
import { Link } from 'react-router-dom'
import * as transport from '../../api/transport'
import { AuthenticationToken } from '../../models/AuthorizationToken'

export const Navbar: React.FC = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user: AuthenticationToken = transport.getAuthorizationTokenContent()!
  const isAuthenticated: boolean = transport.validateToken()

  const onLogoutClick = (): void => {
    transport.setAuthorizationToken('')
    window.location.reload()
  }

  const authLinks = (
    isAuthenticated && (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/feed'>Post Feed</Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/dashboard'>Dashboard</Link>
        </li>
        <li className='nav-item'>
          <button style={{ background: 'none', border: 'none' }}
            className='nav-link'
            onClick={onLogoutClick}
          >
            <img
              className='rounded-circle'
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title='You must have a Gravatar connected to your email to display an image.'
            />
            Logout
          </button>
        </li>
      </ul>
    )
  )

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  )

  return (<nav className='navbar navbar-expand-sm navbar-dark mb-4' style={{ backgroundColor: '#154360' }}>
    <div className='container'>
      <Link className='navbar-brand' to='/'>Devs Network</Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='mobile-nav'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/profiles'>Developers</Link>
          </li>
        </ul>
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  </nav >)
}