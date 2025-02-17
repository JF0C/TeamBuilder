import { FunctionComponent } from "react";
import { Routes, Route } from "react-router";
import { Paths } from './constants/Paths';
import { GroupManager } from './components/groups/GroupManager'
import { GroupMembers } from './components/groups/GroupMembers'
import { MatchCompletion } from './components/match/MatchCompletion'
import { MatchManager } from './components/match/MatchManager'
import { MatchDetails } from './components/match/MatchDetails'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import { AdminMenu } from './components/home/AdminMenu'
import { UserManagement } from './components/users/UserManagement'
import { PlayerSelection } from './components/selection/PlayerSelection'
import { MainMenu } from './components/home/MainMenu'
import { Teams } from './components/teams/Teams'
import { PlayerManagement } from './components/players/PlayerManagement'

export const Routing: FunctionComponent = () =>
(
    <Routes>
        <Route path={''} element={<MainMenu />} />
        <Route path={Paths.SelectionPath} element={<PlayerSelection />} />
        <Route path={Paths.TeamPath} element={<Teams />} />
        <Route path={Paths.PlayersPath} element={<PlayerManagement />} />
        <Route path={Paths.AdminMenuPath} element={<AdminMenu />} />
        <Route path={Paths.UsersPath} element={<UserManagement />} />
        <Route path={Paths.GroupManagementPath} element={<GroupManager />} />
        <Route path={Paths.GroupMembersPath} element={<GroupMembers />} />
        <Route path={Paths.MatchCompletionPath} element={<MatchCompletion />} />
        <Route path={Paths.MatchManagementPath} element={<MatchManager />} />
        <Route path={`${Paths.MatchDetailPath}/*`} element={<MatchDetails />} />
        <Route path={Paths.LoginPath} element={<Login />} />
        <Route path={Paths.RegisterPath} element={<Register />} />
    </Routes>
)