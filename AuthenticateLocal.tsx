import * as LocalAuthentication from 'expo-local-authentication';
import { ReactElement, useEffect, useState } from 'react';
import { renderError } from './Error';

export default function AuthenticateLocal(props: { children: ReactElement }) {

    const [authenticated, setAuthenticated] = useState(false);
    const [checkCanAuthenticateStarted, setCheckCanAuthenticateStarted] = useState(false);
    const [checkCanAuthenticateEnded, setCheckCanAuthenticateEnded] = useState(false);
    const [canAuthenticate, setCanAuthenticate] = useState(false);
    const [startAuthenticate, setStartAuthenticate] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => { // Check authenticate level of device
        (async () => {
            //console.log("start auth checking");
            try {
                const result = await LocalAuthentication.getEnrolledLevelAsync();
                //console.log("auth check: " + result);
                setCanAuthenticate(result !== LocalAuthentication.SecurityLevel.NONE);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("Unknown error!");
                }
            }
            //console.log("end auth checking");
            setCheckCanAuthenticateEnded(true);
        })();
    }, [checkCanAuthenticateStarted]);

    useEffect(() => { // Fingerprint/PIN/Password authentication
        (async () => {
            try {
                const result = await LocalAuthentication.authenticateAsync();
                setAuthenticated(result.success);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("Unknown error!");
                }
            }
        })();
    }, [startAuthenticate]);

    //console.log("Local");

    if (error) { // If some error exist - stop
        return renderError(error);
        //console.log(error);
    }
    if (checkCanAuthenticateStarted === false) { // Checks security level
        //console.log("auth check started state");
        setCheckCanAuthenticateStarted(true);
        return renderError("Checking...");
    }
    else if (checkCanAuthenticateEnded === false) { // Still checks security level
        //console.log("auth check not ended state");
        return renderError("Checking...");
    }
    else if (canAuthenticate === false) { //No enrolled authentication
        //console.log("auth not enrolled");
        return renderError("Low security level!");
    }
    else if (authenticated === false) { // Not authenticated
        if (startAuthenticate === false) {
            setStartAuthenticate(true);
        }
        return renderError("Please authenticate!");
    }
    else {
        return props.children;
    }
}

