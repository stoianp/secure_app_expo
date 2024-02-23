import { StyleSheet, Text, View } from 'react-native';
import * as Device from 'expo-device';
import { useState, useEffect } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';
import CheckRooted from './CheckRooted';
import AuthenticateLocal from './AuthenticateLocal';
import SigninWithGoogle from './SigninWithGoogle';

export default function App() {

  return (
    <View style={styles.container}>
      <CheckRooted>
        <AuthenticateLocal>
          <SigninWithGoogle>
            <Text>Device is OK!</Text>
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
