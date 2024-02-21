import type { User } from '@react-native-google-signin/google-signin';
import { Text, Image } from 'react-native';

export function renderUserInfo(userInfo: User) {
    const PROFILE_IMAGE_SIZE = 150;
    const prettyJson = (value: any) => {
        return JSON.stringify(value, null, 2);
    };

    return (
        <>
            <Text>Welcome {userInfo.user.name}</Text>
            <Text>
                Your user info:{' '}
                {prettyJson({ ...userInfo, idToken: `${userInfo?.idToken?.slice(0, 5)}...` })}
            </Text>
            {userInfo.user.photo && (
                <Image
                    style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE }}
                    source={{ uri: userInfo.user.photo }}
                />
            )}
        </>
    );
}
