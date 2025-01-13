import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RNSecureStorage from 'rn-secure-storage';


import Chat from './src/screens/Chat';
import CameraScreen from './src/screens/Camera';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import Auth from './src/screens/Auth';
import Register from './src/components/form/Register';
import Login from './src/components/form/Login';
import SplashScreen from './src/screens/SplashScreen';
import Friends from './src/screens/Friends';

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkrefreshToken = async () => {
      try {
        const token = await RNSecureStorage.getItem('token');
        const refreshToken = await RNSecureStorage.getItem('refreshToken');

        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const isTokenExpired = false;

        if (isTokenExpired && refreshToken) {
          const newToken = await refreshAccessToken(refreshToken);
          if (!newToken) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
          await RNSecureStorage.setItem('token', newToken);
        }

        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkrefreshToken();
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isAuthenticated ? "Profile" : "Auth"}>
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Friends" component={Friends} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};


export default App;
