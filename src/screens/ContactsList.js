import React, {useCallback, useEffect} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {REMOVE_CONTACT, fetchContacts} from '../store/contactsSlice';
import {Swipeable} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {List, FAB} from 'react-native-paper';

const ContactsList = ({navigation}) => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contactList);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchContacts());
    }, [dispatch]),
  );

  const handleRemoveContact = id => {
    dispatch(REMOVE_CONTACT(id));
  };

  const renderNoDataFound = () => {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", height: 100}}>
        <Text style={{color: "#847f7f", fontSize: 20}}>No Contacts found !</Text>
        <Text style={{color: "#847f7f", fontSize: 14}}>Please add new contacts</Text>
      </View>
    );
  };

  const renderContactListItem = ({item}) => {
    const rightSwipeActions = () => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FAB
            icon={require('../assets/icons/edit.png')}
            style={styles.editFab}
            onPress={() => navigation.navigate('EditContact', {id: item.id})}
          />
          <FAB
            icon={require('../assets/icons/trash.png')}
            style={styles.deleteFab}
            onPress={() => handleRemoveContact(item.id)}
          />
        </View>
      );
    };

    return (
      <Swipeable renderRightActions={rightSwipeActions}>
        <List.Item
          title={item?.name}
          titleStyle={styles.contactText}
          style={{backgroundColor: '#f3f1f1', marginBottom: 2}}
          description={item?.number}
          left={() => {
            return item.photo ? (
              <Image source={{uri: item.photo}} style={styles.profilePhoto} />
            ) : (
              <Image
                source={require('../assets/icons/user.png')}
                style={styles.profilePhoto}
              />
            );
          }}
        />
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactListItem}
        ListEmptyComponent={renderNoDataFound}
        keyExtractor={item => item.id}
      />
      <FAB
        icon={require('../assets/icons/add-user.png')}
        style={styles.newContactFab}
        onPress={() => navigation.navigate('NewContact')}
      />
    </View>
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  contactText: {
    fontSize: 16,
    color: 'black',
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  deleteFab: {
    marginRight: 2,
    backgroundColor: 'red',
  },
  editFab: {
    marginRight: 2,
  },
  noDataFab: {
    backgroundColor: '#edebebf8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  newContactFab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
