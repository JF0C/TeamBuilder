import { closeSnackbar, SnackbarProvider } from "notistack";
import { FunctionComponent } from "react";


export const CustomizedSnackbar: FunctionComponent = () => {
    return <SnackbarProvider action={(key) => (
        <div
            onClick={() => closeSnackbar(key)}
            style={{
                height: '100%',
                left: 0,
                position: 'absolute',
                top: 0,
                width: '100%'
            }}
        >
            
        </div>
    )}
        anchorOrigin={{
            horizontal: 'center',
            vertical: 'top'
        }}
        dense
        maxSnack={10}
    />
}