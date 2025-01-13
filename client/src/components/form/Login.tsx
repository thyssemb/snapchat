import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://snapchat.epidoc.eu/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        await RNSecureStorage.setItem('token', data.data.token, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        });
        await RNSecureStorage.setItem('refreshToken', data.data.refreshToken, {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        });
        await RNSecureStorage.setItem(
            'userInfos',
            JSON.stringify({
              email,
              username: data.data.username,
              token: data.data.token,
              refreshToken: data.data.refreshToken,
            }),
            { accessible: ACCESSIBLE.WHEN_UNLOCKED }
        );

        navigation.navigate('Profile');
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Logged in successfully',
          button: 'Close',
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: data.message || 'Login failed, try again',
          button: 'Close',
        });
      }
    } catch (error) {
      Alert.alert('Error', 'A network or server error occurred. Please try again later.');
    }
  };

  return (
      <AlertNotificationRoot>
        <View style={styles.container}>
          <Text style={styles.text}>You need to log in to access your account!</Text>
          <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />
          <Text style={styles.password}>Forgot your password?</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFC00',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#f7f7f7',
  },
  text: {
    color: '#000',
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  password: {
    fontSize: 14,
    marginBottom: 20,
    color: '#007bff',
    textAlign: 'right',
    width: '80%',
  },
  button: {
    backgroundColor: '#11adfe',
    paddingVertical: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
