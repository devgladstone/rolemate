import { Route, Redirect } from 'react-router-dom'
import { useUser } from 'context/UserContext'
import Loading from 'component/Utility/Loading'

export default function AuthRoute({ children, ...rest }) {
  let { isFetching, isAuthenticated } = useUser()

  return (
    <Route {...rest}>
      {isFetching ? (
        <Loading />
      ) : isAuthenticated ? (
        <>{children}</>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { needsLogin: true },
          }}
        />
      )}
    </Route>
  )
}
