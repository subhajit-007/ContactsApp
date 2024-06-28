import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  contactList: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    SET_CONTACTS: (state, action) => {
      state.contactList = action.payload;
    },
    ADD_CONTACT: (state, action) => {
      state.contactList.push(action.payload);
      // console.log("Payload ===> ", action.payload);
      AsyncStorage.setItem('contacts', JSON.stringify(state.contactList));
    },
    REMOVE_CONTACT: (state, action) => {
      state.contactList = state.contactList.filter(contact => contact.id !== action.payload);
      AsyncStorage.setItem('contacts', JSON.stringify(state.contactList));
    },
    UPDATE_CONTACT: (state, action) => {
      const { id, name, number } = action.payload;
      const index = state.contactList.findIndex(contact => contact?.id === id);
      if (index !== -1) {
        state.contactList[index] = { ...state.contactList[index], name, number };
        AsyncStorage.setItem('contacts', JSON.stringify(state.contactList));
      }
    },
  },
});

export const { SET_CONTACTS, ADD_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT } = contactsSlice.actions;

export const fetchContacts = () => async dispatch => {
  const storedContacts = await AsyncStorage.getItem('contacts');
  // console.log("storedContacts ===> ", storedContacts)
  if (storedContacts) {
    dispatch(SET_CONTACTS(JSON.parse(storedContacts)));
  }
};

export default contactsSlice.reducer;
