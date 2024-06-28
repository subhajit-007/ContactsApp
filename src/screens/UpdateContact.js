import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CONTACT } from '../store/contactsSlice';

const UpdateContact = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const contact = useSelector(state =>
    state.contacts.contactList.find(contact => contact.id === id)
  );

  const [name, setName] = useState(contact ? contact.name : '');
  const [number, setNumber] = useState(contact ? contact.number.toString() : '');

  const handleUpdateContact = () => {
    if (name && number) {
      dispatch(UPDATE_CONTACT({ id, name, number: parseInt(number) }));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>contact Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>number:</Text>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <Button title="Save Changes" onPress={handleUpdateContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "black"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    color: "black"
  },
});

export default UpdateContact;
