
const PendingRequestLocalStorageKey = 'pending-request'

export const PendingRequestService = {
    StorePendingRequest: (name: string, data: string) => {
        localStorage.setItem(PendingRequestLocalStorageKey, JSON.stringify({
            name,
            data
        }))
    },
    ExecutePendingRequest: () => {
        const pendingRequestValue = localStorage.getItem(PendingRequestLocalStorageKey);
        if (pendingRequestValue) {
            try {
                const pendingRequest: {name: string, data: string} = JSON.parse(pendingRequestValue);
                console.log(pendingRequest);
            }
            catch {
                console.log('failed to parse pendng request: ' + pendingRequestValue);
            }
        }
        localStorage.removeItem(PendingRequestLocalStorageKey);
    }
}