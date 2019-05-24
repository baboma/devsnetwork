export interface AuthenticationToken {
  /**
 * "name": the name of the current user
 */
  name?: string

  /**
 * "avatar": the image used by the current user
 */
  avatar?: string

  /**
 * "id": The UUID of the current user
 */
  id?: string

  /**
 * "iat" (issued at): the time in seconds since midnight, January 1, 1970 UTC
 * at which the JWT was issued
 */
  iat?: number

  /**
 * exp" (expiration time): the expiration time in seconds since midnight,
 * January 1, 1970 UTC after which the JWT MUST NOT be accepted for processing.
 */
  exp?: number
}
