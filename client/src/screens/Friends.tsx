import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import RNSecureStorage from 'rn-secure-storage';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';

const Friends = ({ route }) => {

  const {photo} = route.params;

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const connectedUserToken = await RNSecureStorage.getItem('token');

        const response = await fetch('https://snapchat.epidoc.eu/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${connectedUserToken}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          throw new Error(errorMessage.data);
        }

        const userData = await response.json();
        setUsers(userData.data);
        setFilteredUsers(userData.data);
        console.log('Users data:', userData.data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = text => {
    setSearch(text);
    if (text === '') {
      setFilteredUsers(users);
    } else {
      const filteredData = users.filter(user =>
        user.username.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredUsers(filteredData);
    }
  };

  const handleSelectUser = async userId => {
    setSelectedUserId(userId);
    if (photo) {
      try {
        const connectedUserToken = await RNSecureStorage.getItem('token');

        const response = await fetch('https://snapchat.epidoc.eu/snap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${connectedUserToken}`,
          },
          body: JSON.stringify({
            to: userId,
            image: `data:image/jpeg;base64,${photo}`,
            duration: 5,
          }),
        });

        console.log('json data:', response);

        if (!response.ok) {
          const errorMessage = await response.json();

          throw new Error(errorMessage.data);
        }

        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Congrats ! Snap sent successfully',
          button: 'Close',
        });
      } catch (error) {
        console.error(error);
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Error with sending the snap, try again',
          button: 'Close',
        });
      }
    } else {
      console.log('Error');
    }
  };

  return (
    <AlertNotificationRoot>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search users..."
          value={search}
          onChangeText={handleSearch}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        {filteredUsers.map((user, index) => (
          <View key={index} style={styles.userContainer}>
            <View style={styles.userInfo}>
              <Text style={styles.username}>{user.username}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSelectUser(user._id)}>
                <Text style={styles.buttonText}>.</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f8fa',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  userContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'transparent',
  },
});

export default Friends;
