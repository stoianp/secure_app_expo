import { StyleSheet, Text, View } from 'react-native';
import CheckRooted from './CheckRooted';
import AuthenticateLocal from './AuthenticateLocal';
import SigninWithGoogle from './SigninWithGoogle';
import ManageTokens from './ManageTokens';

export default function App() {

  return (
    <View style={styles.container}>
      <CheckRooted>
        <AuthenticateLocal>
          <SigninWithGoogle>
            <ManageTokens>
              <Text>Device is OK!</Text>
            </ManageTokens>
          </SigninWithGoogle>
        </AuthenticateLocal>
      </CheckRooted>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
