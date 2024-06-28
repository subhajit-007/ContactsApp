import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN_OPTIONS} from './NavConfig';
import ContactsList from '../screens/ContactsList';
import {Provider} from 'react-redux';
import store from '../store/store';
import NewContact from '../screens/NewContact';
import UpdateContact from '../screens/UpdateContact';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
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
              <Stack.Screen name="EditContact" component={UpdateContact} options={SCREEN_OPTIONS}/>
            </Stack.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </PaperProvider>
  );
};

export default MainNavigation;
