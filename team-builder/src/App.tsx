import { Route, Routes } from 'react-router'
import './App.css'
import { Paths } from './constants/Paths'
import { PlayerSelection } from './components/selection/PlayerSelection'
import { MainMenu } from './components/start/MainMenu'
import { Teams } from './components/teams/Teams'

function App() {
  return (
    <div className="flex flex-row h-svh">
      <Routes>
        <Route path={''} element={<MainMenu />} />
        <Route path={Paths.SelectionPath} element={<PlayerSelection />} />
        <Route path={Paths.TeamResultPath} element={<Teams />} />
      </Routes>
    </div>
  )
}

export default App
