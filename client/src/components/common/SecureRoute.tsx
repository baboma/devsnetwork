import * as React from 'react'
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom'
import * as transport from '../../api/transport'

export const SecureRoute: React.FC<RouteProps> = (props: RouteProps): React.ReactElement => {

  const { component, ...otherProps } = props

  const renderFn = (renderProps: RouteComponentProps<{}>): React.ReactElement => {
    if (transport.validateToken()) {
      // JSX: Tag name needs the first letter to be capitalized
      // eslint-disable-next-line react/prop-types
      const { component: Component } = props
      if (!Component) {
        return <></>
      }
      return <Component {...renderProps} />
    }
    return <Redirect to='/' />
  }

  return (<Route {...otherProps} render={renderFn} />)
}
