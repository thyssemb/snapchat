import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Button,
} from 'react-native';
import Navbar from '../components/navbar/Navbar';
import RNSecureStorage from 'rn-secure-storage';

const Chat = ({ navigation }) => {
  const [snaps, setSnaps] = useState([]);
  const [selectedSnap, setSelectedSnap] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openSnap = async (id) => {
    try {
      const connectedUserToken = await RNSecureStorage.getItem('token');
      const response = await fetch(`https://snapchat.epidoc.eu/snap/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${connectedUserToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error getting snap details');
      }
      const snapData = await response.json();
      console.log('Snap Data:', snapData); 

      
      let duration = snapData.duration;
      if (typeof duration !== 'number' || duration <= 0) {
        console.warn(`Invalid duration value: ${duration}, setting default duration to 5 seconds`);
        duration = 5; 
      }

      setSelectedSnap(snapData);
      setModalVisible(true);

      
      setTimeout(() => {
        console.log('Closing modal after', duration, 'seconds');
        setModalVisible(false);
        setSelectedSnap(null); 
      }, duration * 1000);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const fetchSnaps = async () => {
      try {
        const connectedUserToken = await RNSecureStorage.getItem('token');
        const response = await fetch('https://snapchat.epidoc.eu/snap', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${connectedUserToken}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error getting snaps');
        }
        const snapData = await response.json();
        setSnaps(snapData.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
      }
    };

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
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchSnaps();
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Navbar navigation={navigation} />
      <ScrollView>
        {snaps &&
          snaps.map((snap, index) => {
            const user = users.find((user) => user._id === snap.from);
            const from = user ? user.username : snap.from;
            return (
              <TouchableOpacity
                key={index}
                style={styles.snapContainer}
                onPress={() => openSnap(snap._id)}>
                <Text style={styles.text}>snap from {from}</Text>
                <Text style={styles.text}>on {snap.date}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal manually closed');
          setModalVisible(false);
          setSelectedSnap(null); 
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedSnap && (
              <>
                <Text style={styles.modalText}>from {selectedSnap.from}</Text>
                <Text style={styles.modalText}>date {selectedSnap.date}</Text>
                <Image
                  source={{ uri: selectedSnap.image }}
                  style={styles.modalImage}
                />
                <Button title="Close" onPress={() => {
                  console.log('Close button pressed');
                  setModalVisible(false);
                  setSelectedSnap(null); 
                }} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  snapContainer: {
    marginTop: 50,
    marginRight: 30,
    marginLeft: 30,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default Chat;
