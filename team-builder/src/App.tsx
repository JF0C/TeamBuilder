import { Route, Routes } from 'react-router'
import './App.scss'
import { Paths } from './constants/Paths'
import { PlayerSelection } from './components/selection/PlayerSelection'
import { MainMenu } from './components/start/MainMenu'
import { Teams } from './components/teams/Teams'
import { PlayerManagement } from './components/players/PlayerManagement'

function App() {
  return (
    <div className="flex flex-row h-svh w-full">
      <Routes>
        <Route path={''} element={<MainMenu />} />
        <Route path={Paths.SelectionPath} element={<PlayerSelection />} />
        <Route path={Paths.TeamResultPath} element={<Teams />} />
        <Route path={Paths.PlayerManagementPath} element={<PlayerManagement />} />
      </Routes>
    </div>
  )
}

export default App
