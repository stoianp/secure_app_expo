import type { User } from '@react-native-google-signin/google-signin';
import { Text, Image } from 'react-native';

export function renderUserInfo(userInfo: User) {
    const PROFILE_IMAGE_SIZE = 100;
    const prettyJson = (value: any) => {
        return JSON.stringify(value, null, 2);
    };

    //console.log("userInfo.user.photo: " + userInfo.idToken);

    return (
        <>
            <Text> {userInfo.user.name}</Text>
            {userInfo.user.photo && (
                <Image
                    style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE }}
                    source={{ uri: userInfo.user.photo }}
                />
            )}
        </>
    );
}
