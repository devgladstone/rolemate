import { Switch, useRouteMatch, Route } from 'react-router-dom'
import JobDashboard from './JobDashboard'
import JobMain from './JobMain'

export default function JobRoutes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <JobDashboard />
      </Route>
      <Route path={`${path}/:id`}>
        <JobMain />
      </Route>
    </Switch>
  )
}
