import { Switch, Route } from 'react-router-dom'
import AuthRoute from 'component/Navigation/AuthRoute'
import RedirectRoute from 'component/Navigation/RedirectRoute'
import HomePage from 'component/HomePage'
import VerifyPage from 'component/Account/VerifyPage'
import LoginPage from 'component/Account/LoginPage'
import SignupPage from 'component/Account/SignupPage'
import Profile from 'component/Account/Profile'
import JobRoutes from 'component/JobRoutes'
import { Container, Header } from 'component/Layout'

function App() {
  return (
    <div className='min-h-screen bg-gray-200 overflow-y-auto'>
      <Header />
      <Container>
        <Switch>
          <AuthRoute path='/jobs'>
            <JobRoutes />
          </AuthRoute>
          <Route path='/activate'>
            <VerifyPage />
          </Route>
          <RedirectRoute path='/signup' goTo='/profile' cond='auth'>
            <SignupPage />
          </RedirectRoute>
          <RedirectRoute path='/login' goTo='/profile' cond='auth'>
            <LoginPage />
          </RedirectRoute>
          <AuthRoute path='/profile'>
            <Profile />
          </AuthRoute>
          <RedirectRoute cond='auth' path='/' goTo='/jobs'>
            <HomePage />
          </RedirectRoute>
        </Switch>
      </Container>
    </div>
  )
}

export default App
