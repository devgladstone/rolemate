import axios from 'axios'
import { AUTH_API } from 'config'

export const logoutAPI = async () => {
  // This is to support logging out from all windows
  // triggers logout action in other tabs
  localStorage.setItem('logout', Date.now())
  localStorage.clear()

  // remove refresh token cookie
  await axios.post(AUTH_API + '/logout', null, { withCredentials: true })
}

export const getTokenFromRefresh = async () => {
  try {
    const { status, data } = await axios.post(
      AUTH_API + '/refresh-token',
      null,
      { withCredentials: true }
    )
    if (status === 200) {
      return {
        ok: true,
        token: data.token,
        tokenExpiry: data.tokenExpiry,
      }
    }
    return { ok: false }
  } catch (err) {
    return { ok: false }
  }
}

export const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation
  }
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}
  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.token}`,
        },
      },
    },
  }
}

export const didAuthError = ({ error }) => {
  const hasError = error.graphQLErrors.some(
    (e) => e.extensions?.code === 'invalid-jwt'
  )
  return hasError
}

export const willAuthError = ({ authState }) =>
  !authState ||
  new Date().getTime() >= new Date(authState.tokenExpiry).getTime()
