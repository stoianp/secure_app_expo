import { GoogleSignin, NativeModuleError } from '@react-native-google-signin/google-signin';
import * as SecureStore from 'expo-secure-store';
import { ReactElement, useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { renderError } from './Error';

type Tokens = {
    idToken?: string;
    accessToken?: string;
  }

const prettyJson = (value: any) => {
    return JSON.stringify(value, null, 2);
}

export default function ManageTokens(props: { children: ReactElement }) {
    const accessTokenKey = "accessToken";
    const idTokenKey = "idToken";
    const [tokens, setTokens] = useState<Tokens | null>(null);
    const [downloadTokens, setDownloadTokens] = useState(false);
    const [error, setError] = useState<string>();

    const googleGetTokens = async () => {
        console.log("downloading....")
        //setDownloadTokens(true);
        try {
            const result = await GoogleSignin.getTokens();
            console.log(result.accessToken);
            console.log(result.idToken);
            setTokens({ accessToken: result.accessToken, idToken: result.idToken });
            //setDownloadTokens(false);
            await SecureStore.setItemAsync(accessTokenKey, result.accessToken);
            await SecureStore.setItemAsync(idTokenKey, result.idToken);
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
    else if (tokens === null) { // No tokens
        console.log("checking!!!!!!")
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
        console.log("downloaded!!!!!!")
        return (
            <>
                <Text>
                    {prettyJson(tokens.accessToken)}
                </Text>
                <Text>
                    {prettyJson(tokens.idToken)}
                </Text>
                <View>
                    {props.children}
                </View>
            </>

        )
    }
}