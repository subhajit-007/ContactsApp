import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {ADD_CONTACT} from '../store/contactsSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Appbar, Button, TextInput} from 'react-native-paper';

const NewContact = ({navigation}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const dispatch = useDispatch();

  const handleAddContact = () => {
    if (name && number) {
      const newBudget = {id: uuidv4(), name, number: parseInt(number), photo};
      dispatch(ADD_CONTACT(newBudget));
      navigation.goBack();
    }
  };

  const handleSelectPhoto = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
        console.log('response.assets[0].uri ===> ', response.assets[0].uri);
      }
    });
  };

  const handleTakePhoto = () => {
    launchCamera({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <>
      <Appbar.Header dark="false" mode="small">
        <Appbar.Action icon={require('../assets/icons/previous.png')} size={30} onPress={() => {navigation.goBack()}} />
        <Appbar.Content title="New Contact" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{uri: photo}} style={styles.photo} />
          ) : (
            <Image
              source={require('../assets/icons/user.png')}
              style={styles.photo}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              icon={require('../assets/icons/camera.png')}
              mode="contained"
              onPress={handleTakePhoto}
              style={{marginRight: 5}}>
              Take Photo
            </Button>
            <Button
              icon={require('../assets/icons/folder.png')}
              mode="contained"
              style={{marginLeft: 5}}
              onPress={handleSelectPhoto}>
              Select Photo
            </Button>
          </View>
        </View>

        <TextInput
          mode="outlined"
          label="Contact Name"
          placeholder="Enter contact name"
          value={name}
          style={[styles.input, {backgroundColor: 'white'}]}
          onChangeText={value => setName(value)}
        />

        <TextInput
          mode="outlined"
          label="Mobile Number"
          placeholder="Enter mobile number"
          value={number}
          style={[styles.input, {backgroundColor: 'white'}]}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          onPress={handleAddContact}
          style={{marginVertical: 10}}>
          Save
        </Button>
      </View>
    </>
  );
};

export default NewContact;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    color: 'black',
    marginVertical: 10,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
