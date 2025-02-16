import { AppDispatch } from "../store/store";
import { getThunk } from "../thunks/thunkBase";

const PendingRequestLocalStorageKey = 'pending-request'

export const PendingRequestService = {
    StorePendingRequest: (name: string, data: string) => {
        localStorage.setItem(PendingRequestLocalStorageKey, JSON.stringify({
            name,
            data
        }))
    },
    ExecutePendingRequest: (dispatch: AppDispatch) => {
        const pendingRequestValue = localStorage.getItem(PendingRequestLocalStorageKey);
        if (pendingRequestValue) {
            try {
                const pendingRequest: {name: string, data: string} = JSON.parse(pendingRequestValue);
                console.log(pendingRequest);
                const thunk = getThunk(pendingRequest.name);
                if (!thunk) {
                    console.log(`could not retrieve thunk ${pendingRequest.name}`)
                    return;
                }
                const arg = JSON.parse(pendingRequest.data);
                dispatch(thunk(arg));
            }
            catch {
                console.log('failed to parse pendng request: ' + pendingRequestValue);
            }
        }
        localStorage.removeItem(PendingRequestLocalStorageKey);
    }
}