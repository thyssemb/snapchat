import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import Navbar from '../components/navbar/Navbar';

const Profile = ({ navigation }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getTokenAndUsername = async () => {
      try {
        const userInfos = await RNSecureStorage.getItem('userInfos');
        if (userInfos) {
          setUsername(JSON.parse(userInfos).username);
        } else {
          console.log('No token found');
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
    getTokenAndUsername();
  }, []);

  const handleDeleteAccount = async () => {
    try {
      const connectedUserToken = await RNSecureStorage.getItem('token');
      const response = await fetch('https://snapchat.epidoc.eu/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${connectedUserToken}`,
        },
      });

      if (response.ok) {
        console.log('User account deleted', response);
        navigation.navigate('Register');
      } else {
        const data = await response.json();
        console.log('Error response json:', data.message);
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      Alert.alert('Oops', 'Something went wrong, please try again.');
    }
  };

  const confirmDeleteAccount = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Delete',
      textBody: 'Are you sure you want to delete your account?',
      button: 'Yes',
      onPress: handleDeleteAccount,
    });
  };

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>Welcome, {username} !</Text>
          <View style={styles.actionContainer}>
            <Text style={styles.actionText}>Account Information</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={confirmDeleteAccount}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Navbar />
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    paddingBottom: 200,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  actionContainer: {
    alignItems: 'center',
    width: '80%',
  },
  actionText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFFC00',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
