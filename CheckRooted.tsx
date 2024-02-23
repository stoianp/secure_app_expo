import * as Device from 'expo-device';
import { useEffect, useState, Children, ReactElement } from 'react';
import { renderError } from './Error';

export default function CheckRooted(props: { children: ReactElement }) {

    const [rootCheckStarted, setRootCheckStarted] = useState(false);
    const [rootCheckEnded, setRootCheckEnded] = useState(false);
    const [rooted, setRooted] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => { // Check for rooted device
        (async () => {
            //console.log("start root checking");
            try {
                const rooted = await Device.isRootedExperimentalAsync();
                //console.log("rooted: " + rooted);
                setRooted(rooted);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("Unknown error!");
                }
            }
            //console.log("end root checking");
            setRootCheckEnded(true);
        })();
    }, [rootCheckStarted]);

    //console.log("Root");

    if (error) { // If some error exist - stop
        return renderError(error);
        //console.log(error);
    }
    else if (rootCheckStarted === false) { // Start checks for rooted/jailbroken device
        //console.log("root check started state");
        setRootCheckStarted(true);
        return renderError("Checking...");
    }
    else if (rootCheckEnded === false) { // Wait checks for rooted/jailbroken device to finish
        //console.log("root check not ended state");
        return renderError("Checking...");
    }
    else if (rooted) { // Rooted/jailbroken device
        return renderError("This device is rooted/jailbroken!!!");
    }
    else { // Device is OK, render child components
        //console.log("root check ended state");
        return props.children;
    }
}