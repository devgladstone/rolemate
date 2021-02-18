import { Route, Redirect } from 'react-router-dom'
import { useUser } from 'context/UserContext'
import Loading from 'component/Utility/Loading'

export default function RedirectRoute({ children, goTo, cond, ...rest }) {
  let { isFetching, isAuthenticated } = useUser()
  let check
  if (cond === 'auth') {
    check = isAuthenticated
  }

  return (
    <Route {...rest}>
      {isFetching ? (
        <Loading />
      ) : check ? (
        <Redirect to={goTo || '/login'} />
      ) : (
        children
      )}
    </Route>
  )
}
