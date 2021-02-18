import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserTags from './UserTags'
import ProfilePage from './ProfilePage'
import ProfileHeader from './ProfileHeader'
import Card from 'component/Layout/Card'

export default function Profile() {
  const { path } = useRouteMatch()
  return (
    <Card>
      <h1 className='text-3xl font-bold text-black'>Profile Settings</h1>
      <ProfileHeader />
      <Switch>
        <Route exact path={path}>
          <ProfilePage />
        </Route>
        <Route path={`${path}/tags`}>
          <UserTags />
        </Route>
      </Switch>
    </Card>
  )
}
