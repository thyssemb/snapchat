import React from 'react';
import { View, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import Navbar from '../components/navbar/Navbar';


const Settings = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await RNSecureStorage.removeItem("token");
      await RNSecureStorage.removeItem("userInfos");

      Alert.alert('Déconnexion', 'Vous êtes déconnecté.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Erreur', 'La déconnexion a échoué, veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f7f8fa",
  },
  button: {
    backgroundColor: '#FFFC00',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Settings;
