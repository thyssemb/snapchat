import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Image
          source={require('../../assets/tchat.png')}
          style={styles.chatIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
        <Image
          source={require('../../assets/camera.png')}
          style={styles.cameraIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../../assets/profile.png')}
          style={styles.profileIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Image
          source={require('../../assets/settings.png')}
          style={styles.settingsIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
  },
  chatIcon: {
    width: 35,
    height: 60,
    alignSelf: 'center',
  },
  cameraIcon: {
    width: 40,
    height: 60,
    alignSelf: 'center',
  },
  profileIcon: {
    width: 35,
    height: 60,
    alignSelf: 'center',
  },
  settingsIcon: {
    width: 35,
    height: 30,
    alignSelf: 'center',
  },
});

export default Navbar;
