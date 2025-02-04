import { Route, Routes } from 'react-router'
import './App.scss'
import { Paths } from './constants/Paths'
import { PlayerSelection } from './components/selection/PlayerSelection'
import { MainMenu } from './components/start/MainMenu'
import { Teams } from './components/teams/Teams'
import { PlayerManagement } from './components/players/PlayerManagement'
import { CustomizedSnackbar } from './components/shared/CustomizedSnackbar'
import { DataLoader } from './components/shared/DataLoader'
import { GroupManager } from './components/groups/GroupManager'
import { GroupMembers } from './components/groups/GroupMembers'
import { MatchCompletion } from './components/match/MatchCompletion'
import { MatchManager } from './components/match/MatchManager'
import { MatchDetails } from './components/match/MatchDetails'
import { Login } from './components/auth/Login'

function App() {
  return (
    <div className="flex flex-row h-full w-full">
      <CustomizedSnackbar />
      <DataLoader />
      <Routes>
        <Route path={''} element={<MainMenu />} />
        <Route path={Paths.SelectionPath} element={<PlayerSelection />} />
        <Route path={Paths.TeamPath} element={<Teams />} />
        <Route path={Paths.PlayerManagementPath} element={<PlayerManagement />} />
        <Route path={Paths.GroupManagementPath} element={<GroupManager />} />
        <Route path={Paths.GroupMembersPath} element={<GroupMembers />} />
        <Route path={Paths.MatchCompletionPath} element={<MatchCompletion />} />
        <Route path={Paths.MatchManagementPath} element={<MatchManager />} />
        <Route path={`${Paths.MatchDetailPath}/*`} element={<MatchDetails />} />
        <Route path={Paths.LoginPath} element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
