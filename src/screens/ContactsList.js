import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {REMOVE_CONTACT, fetchContacts} from '../store/contactsSlice';

const ContactsList = ({navigation}) => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactList);

  useEffect(() => {
    dispatch(fetchContacts());
    // console.log("selector data ===> ", contacts);
  }, [dispatch]);

  const handleRemoveContact = id => {
    dispatch(REMOVE_CONTACT(id));
  };

  const renderContactListItem = ({item}) => (
    <View style={styles.contactItem}>
      <Text style={styles.contactText}>name: {item.name}</Text>
      <Button title="Remove" onPress={() => handleRemoveContact(item.id)} />
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditContact', {id: item.id})}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactListItem}
        keyExtractor={item => item.id}
      />
      <Button
        title="New Contact"
        onPress={() => navigation.navigate('NewContact')}
      />
    </View>
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    color: 'black',
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
    color: 'black',
  },
  editText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
