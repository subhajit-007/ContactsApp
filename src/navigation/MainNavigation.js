import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_OPTIONS} from './NavConfig';
import ContactsList from '../screens/ContactsList';
import {Provider} from 'react-redux';
import store from '../store/store';
import NewContact from '../screens/NewContact';
import UpdateContact from '../screens/UpdateContact';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={ContactsList}
            options={SCREEN_OPTIONS}
          />
          <Stack.Screen
            name="NewContact"
            component={NewContact}
            options={SCREEN_OPTIONS}
          />
          <Stack.Screen name="EditContact" component={UpdateContact} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MainNavigation;
