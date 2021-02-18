import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider authOnlyPaths={['/jobs', '/profile']}>
        <App />
      </UserProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
