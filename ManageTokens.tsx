import { GoogleSignin, NativeModuleError } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import { ReactElement, useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { renderError } from './Error';

const prettyJson = (value: any) => {
    return JSON.stringify(value, null, 2);
}

export default function ManageTokens(props: { children: ReactElement }) {
    const accessTokenKey = "accessToken";
    const idTokenKey = "idToken";
    const [downloadTokens, setDownloadTokens] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>();
    const [idToken, setIdToken] = useState<string | null>();
    const [error, setError] = useState<string>();

    const googleGetTokens = async () => {
        setDownloadTokens(true);
        try {
            const tokens = await GoogleSignin.getTokens();
            //console.log(tokens.accessToken);
            //console.log(tokens.idToken);
            await SecureStore.setItemAsync(accessTokenKey, tokens.accessToken);
            await SecureStore.setItemAsync(idTokenKey, tokens.idToken);
            useState({
                accessToken: tokens.accessToken,
                idToken: tokens.idToken,
                downloadTokens: false
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else {
                setError("Unknown error!");
            }
        }
    }

    if (error) { // If some error exist - stop
        return renderError(error);
        //console.log(error);
    }
    else if (accessToken === null || idToken === null) { // No tokens
        setDownloadTokens(true);
        return (
            <>
                {downloadTokens && <Text>Downloadig...</Text>}
                <View>
                    <Button onPress={googleGetTokens} title="Get tokens!" />
                </View>
            </>
        )
    }
    else {
        return (
            <>
                <View>
                    {props.children}
                </View>
            </>

        )
    }
}