import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from "./app/components/buttons/welcome";
import Register from "./app/components/buttons/register";
import Login from "./app/components/buttons/login";
function App() {

  return (
      <View style={styles.container}>
          <Register />
          <Login />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fffc1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App