import axios from 'axios'
import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useHistory } from 'react-router-dom'
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'

import {
  addAuthToOperation,
  didAuthError,
  getTokenFromRefresh,
  willAuthError,
  logoutAPI,
} from 'helper/auth'
import { AUTH_API, GRAPHQL_API } from 'config'
import { GET_USER } from 'graphqlAPI'

const UserContext = createContext()

const initialState = {
  token: null,
  tokenExpiry: null,
  user: null,
  hasInit: false,
  fetchVerifyToken: false,
  isIntroModalOpen: false,
  isLoggedIn: false,
  isFetching: localStorage.getItem('hasLoggedIn') === 'yes',
}

function reducer(state, [type, payload]) {
  switch (type) {
    case 'fetchVerifyToken':
      return { ...state, fetchVerifyToken: payload }
    case 'setUser':
      return { ...state, user: payload }
    case 'setIsFetching':
      return { ...state, isFetching: payload }
    case 'setJWT':
      return {
        ...state,
        token: payload.token,
        tokenExpiry: payload.tokenExpiry,
      }
    case 'login':
      return { ...state, isLoggedIn: true }
    case 'setIsIntroModalOpen':
      return { ...state, isIntroModalOpen: payload }
    case 'finishInitUser':
      return { ...state, hasInit: true }
    case 'logout':
      return { ...initialState, isFetching: false }
    default:
      return state
  }
}

function UserProvider({ children }) {
  const history = useHistory()

  const logout = useCallback(async () => {
    await logoutAPI()
    dispatch(['logout'])
    history.push('/login')
  }, [history])

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('hasLoggedIn') === 'yes') {
        const { ok, token, tokenExpiry } = await getTokenFromRefresh()
        if (ok) {
          dispatch(['setJWT', { token, tokenExpiry }])
          dispatch(['login'])
        } else {
          await logout()
        }
      }
    }

    const syncLogout = (event) => {
      if (event.key === 'logout') {
        dispatch(['logout'])
        history.push('/login')
      }
    }
    initialize()
    window.addEventListener('storage', syncLogout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getVerifiedToken = async () => {
      const { ok, token, tokenExpiry } = await getTokenFromRefresh()
      if (ok) {
        dispatch(['setJWT', { token, tokenExpiry }])
        dispatch(['fetchVerifyToken', false])
      } else {
        await logout()
      }
    }

    if (state.fetchVerifyToken) {
      getVerifiedToken()
    }
  }, [state.fetchVerifyToken, logout])

  useEffect(() => {
    const getUser = async () => {
      if (state.isLoggedIn && !state.hasInit) {
        try {
          dispatch(['setIsFetching', true])

          const { data } = await axios.post(
            GRAPHQL_API,
            { query: GET_USER },
            { headers: { authorization: `Bearer ${state.token}` } }
          )

          if (data.errors) {
            const error = data.errors[0]
            console.error(error)
          } else {
            const user = data.data.user[0]
            dispatch(['setUser', user])
          }
          dispatch(['finishInitUser'])
          dispatch(['setIsFetching', false])
        } catch (e) {
          console.error(e.message)
        }
      }
    }
    getUser()
  }, [state.isLoggedIn, state.token, state.hasInit])

  const login = async (email, password) => {
    try {
      const {
        data: { token, tokenExpiry },
      } = await axios.post(
        AUTH_API + '/login',
        { email, password },
        { withCredentials: true }
      )
      dispatch(['setJWT', { token, tokenExpiry }])
      dispatch(['login'])
      window.localStorage.setItem('hasLoggedIn', 'yes')
      return { ok: true }
    } catch (err) {
      if (!err.response && err.message === 'Network Error') {
        console.error(err.message)
      } else if (err.response.status === 429) {
        console.error(err.message)
      } else {
        console.error(err.response.data.message)
      }
      return { ok: false, error: err.response.status }
    }
  }

  const signup = async ({ email, password }) => {
    try {
      const {
        data: { token, tokenExpiry },
      } = await axios.post(
        AUTH_API + '/signup',
        { email, password },
        { withCredentials: true }
      )
      dispatch(['setJWT', { token, tokenExpiry }])
      dispatch(['login'])
      dispatch(['setIsIntroModalOpen', true])
      window.localStorage.setItem('hasLoggedIn', 'yes')
      return { ok: true }
    } catch (err) {
      if (!err.response && err.message === 'Network Error') {
        console.error(err.message)
      } else if (err.response.status === 429) {
        console.error(err.message)
      } else if (err.response.status === 409) {
        console.error(err.response.data.message)
      } else {
        console.error(err.response.data.message)
      }
      return { ok: false, error: err.response.status }
    }
  }

  // --- URQL SETUP ---
  const getAuth = async ({ authState }) => {
    if (!authState) {
      if (state.token) {
        return { token: state.token }
      }
      return null
    }
    // --- GET REFRESH TOKEN ---
    const { ok, token, tokenExpiry } = await getTokenFromRefresh()
    if (ok) {
      dispatch(['setJWT', { token, tokenExpiry }])
      return { token, tokenExpiry }
    }

    // --- REFRESH FAIL ---
    await logout()
    return null
  }

  const client = useMemo(() => {
    return createClient({
      url: GRAPHQL_API,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange,
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
          didAuthError,
        }),
        fetchExchange,
      ],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoggedIn])

  if (!client) {
    return null
  }

  const closeIntroModal = () => dispatch(['setIsIntroModalOpen', false])

  return (
    <UserContext.Provider
      value={{ ...state, login, signup, closeIntroModal, logout }}
    >
      <UrqlProvider value={client}>{children}</UrqlProvider>
    </UserContext.Provider>
  )
}

function useUser() {
  const context = useContext(UserContext)
  const isAuthenticated = context.user !== null
  return {
    ...context,
    isAuthenticated,
  }
}

export { UserProvider, useUser }
