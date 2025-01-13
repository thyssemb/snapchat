import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [duration, setDuration] = useState(5);
  const [showOtherDurations, setShowOtherDurations] = useState(false);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        navigation.navigate('Friends', { photo: data.base64, duration });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      console.error('Error');
    }
  };

  const handleDurationChange = (selectedDuration) => {
    setDuration(selectedDuration);
    setShowOtherDurations(false);
  };

  return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <RNCamera
              ref={cameraRef}
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              captureAudio={false}
          />
          <TouchableOpacity
              onPress={takePicture}
              style={[styles.captureButton, { backgroundColor: 'transparent' }]}>
            <Text style={[styles.captureButtonText, { color: 'white' }]}>
              take a snap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[
                styles.durationButton,
                duration === 1 ? styles.selectedDurationButton : null,
                styles.durationButtonOnCamera,
              ]}
              onPress={() => {
                handleDurationChange(1);
                setShowOtherDurations(!showOtherDurations);
              }}>
            <Text style={styles.durationButtonText}>1s</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.durationContainer}>
          {showOtherDurations &&
              [2, 3, 4, 5, 6, 7, 8, 9, 10].map((seconds) => (
                  <TouchableOpacity
                      key={seconds}
                      style={[
                        styles.durationButton,
                        duration === seconds ? styles.selectedDurationButton : null,
                      ]}
                      onPress={() => handleDurationChange(seconds)}>
                    <Text style={styles.durationButtonText}>{seconds}s</Text>
                  </TouchableOpacity>
              ))}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  camera: {
    flex: 7,
    alignSelf: 'stretch',
  },
  durationContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  durationButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  durationButtonOnCamera: {
    position: 'absolute',
    bottom: 150,
    right: 30,
  },
  selectedDurationButton: {
    backgroundColor: '#66cdaa',
  },
  durationButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  captureButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 60,
    left: 20,
    marginLeft: 80,
  },
  captureButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CameraScreen;
