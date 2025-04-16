import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './configureStore'; // Ahora solo importamos store
import Dashboard from './src/components/Dashboard';
import ListClients from "./src/components/ListClients"
import AgendaTurnos from './src/components/AgendaTurnos';

import FormLogin from './src/components/FormLogin';
import { StyleSheet } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AgendaTurnos">
        <Stack.Screen name="AgendaTurnos" component={AgendaTurnos}/>
        <Stack.Screen name="Login" component={FormLogin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="ListClients" component={ListClients}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => (
  <Provider store={configureStore}>
    <App />
  </Provider>
);

// export default App

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400,
  },
  // css importante para que el boton funcione correctamente al hacer click
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});
