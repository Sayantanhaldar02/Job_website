import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react'

const Alert_component = (props) => {

    const [snackopen, setsnackopen] = useState(false);

    const snackhandleClick = () => {
        setsnackopen(props.open);
    };

    const snackhandleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setsnackopen(false);
    };


    return (
        <>
            <Alert severity="warning" onClose={snackhandleClose}>
                {props.message}
            </Alert>
            <Snackbar
                open={snackopen}
                autoHideDuration={2000}
                onClose={snackhandleClose}
            >

            </Snackbar>
        </>
    )
}

// export default Alert_component