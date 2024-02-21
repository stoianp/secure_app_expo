import {
    GoogleSignin,
    GoogleSigninButton,
    NativeModuleError,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import type { User } from '@react-native-google-signin/google-signin';

import { ReactElement, useEffect, useState, } from 'react';
import { Text, Button, View } from 'react-native';
import { renderError } from './Error';
import { renderUserInfo } from './UserInfo';

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
    const [getUser, setGetUser] = useState(false);
    const [currentUser , setCurrentUser ] = useState<User | null>();
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

    useEffect(() => { // Get current user
        (async () => {
            //console.log("start getting user");
            try {
                const userInfo = await GoogleSignin.getCurrentUser();
                console.log("user: " + userInfo?.user.name);
                setCurrentUser(userInfo);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                }
                else {
                    setError("Unknown error!");
                }
            }
            //console.log("end getting user");
            setEndCheckSignedIn(true);
        })();
    }, [getUser]);

    const googleSignIn = async () => {
        setSignedInMessage("Signin with Google...");
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setCurrentUser(userInfo);
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
        if (currentUser === null) {
            setGetUser(true);
        }
        return (
            <>
                <View>{currentUser && renderUserInfo(currentUser)}</View>
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