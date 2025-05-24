import { initialAuthState } from "../../src/store/authReducer";
import { initialGroupMembersState } from "../../src/store/groupMembersReducer";
import { initialGroupState } from "../../src/store/groupReducer";
import { initialMatchState } from "../../src/store/matchReducer";
import { initialMatchResumeState } from "../../src/store/matchResumeReducer";
import { initialPlayerState } from "../../src/store/playerReducer";
import { RootState } from "../../src/store/store";
import { initialUsersState } from "../../src/store/userReducer";

export const initialTestState: RootState = {
    players: initialPlayerState,
    users: initialUsersState,
    match: initialMatchState,
    groups: initialGroupState,
    groupMembers: initialGroupMembersState,
    auth: initialAuthState,
    matchResume: initialMatchResumeState
}