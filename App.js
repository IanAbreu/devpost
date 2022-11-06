import React from 'react';
import {SafeAreaView, View, Text, } from 'react-native';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/routes';

import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={'#36393f'}
          barStyle={'light-content'}
          translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}