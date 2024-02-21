import {
    GoogleSignin,
    GoogleSigninButton,
    NativeModuleError,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { ReactElement, useEffect, useState, } from 'react';
import { Text, Button, View } from 'react-native';
import { renderError } from './Error';

GoogleSignin.configure({
    webClientId: '872775482122-fvorh5nojqffqinso98lnj3p0sfmv074.apps.googleusercontent.com',
    offlineAccess: true,
    profileImageSize: 120
});

export default function SigninWithGoogle(props: { children: ReactElement }) {
    const [signedInMessage, setSignedInMessage] = useState("Please, signin with Google!");
    const [isSignedIn, setSignedIn] = useState(false);
    const [startCheckSignedIn, setStartCheckSignedIn] = useState(false);
    const [endCheckSignedIn, setEndCheckSignedIn] = useState(false);
    const [error, setError] = useState<string>();

    useEffect(() => { // Check authenticate level of device
        (async () => {
            //console.log("start sign checking");
            try {
                const result = await GoogleSignin.isSignedIn();
                //console.log("signed check: " + result);
                setSignedIn(result);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("Unknown error!");
                }
            }
            //console.log("end signed checking");
            setEndCheckSignedIn(true);
        })();
    }, [startCheckSignedIn]);

    const googleSignIn = async () => {
        setSignedInMessage("Signin with Google...");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setSignedIn(true);
        } catch (error) {
            const typedError = error as NativeModuleError;
            setError(typedError.toString());
        }
    }

    const googleSignOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setSignedIn(false);
        } catch (error) {
            const typedError = error as NativeModuleError;
            setError(typedError.toString());
        };
    }

    console.log("Google");

    if (error) { // If some error exist - stop
        return renderError(error);
        //console.log(error);
    }
    else if (startCheckSignedIn === false) { // Check if signed with Google
        setStartCheckSignedIn(true);
    }
    else if (endCheckSignedIn === false) { // Wait until checking
        return renderError("Checking...");
    }
    else if (isSignedIn === false) { // Not signed with Google - render Google button
        return (
            <>
                <View>
                    <Text>{signedInMessage}</Text>
                </View>
                <View>
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Standard}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={googleSignIn}
                    />
                </View>
            </>
        );
    }
    else {
        return (
            <>
                <View>
                    {props.children}
                </View>
                <View>
                    <Button onPress={googleSignOut} title="Sign Out!!!" />
                </View>
            </>
        )
    }
}