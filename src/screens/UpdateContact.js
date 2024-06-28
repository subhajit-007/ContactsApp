import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {UPDATE_CONTACT} from '../store/contactsSlice';
import {ScrollView} from 'react-native-gesture-handler';
import {Appbar, Button, TextInput, ToggleButton} from 'react-native-paper';

const UpdateContact = ({route, navigation}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const contact = useSelector(state =>
    state.contacts.contactList.find(contact => contact.id === id),
  );

  const [name, setName] = useState(contact ? contact.name : '');
  const [number, setNumber] = useState(
    contact ? contact.number.toString() : '',
  );
  const [photo, setPhoto] = useState(contact ? contact.photo : null);
  const [fav, setFav] = useState(contact ? contact.fav : false);

  const handleUpdateContact = () => {
    if (name && number) {
      dispatch(
        UPDATE_CONTACT({id, name, number: parseInt(number), photo, fav}),
      );
      navigation.goBack();
    }
  };

  const handleSelectPhoto = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
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

  const onFavToggle = () => {
    setFav(!fav);
  };

  return (
    <>
      <Appbar.Header dark="false" mode="small">
        <Appbar.Action
          icon={require('../assets/icons/previous.png')}
          size={30}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Edit Contact" />
      </Appbar.Header>
      <ScrollView style={styles.container}>
        <View>
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
                style={{marginHorizontal: 5}}
                onPress={handleSelectPhoto}>
                Select Photo
              </Button>
              <Button
                icon={
                  fav
                    ? require('../assets/icons/favorite.png')
                    : require('../assets/icons/star.png')
                }
                mode={fav ? 'contained' : 'outlined'}
                style={{marginLeft: 5}}
                onPress={onFavToggle}>
                Favorite
              </Button>
            </View>
          </View>
          <TextInput
            mode="outlined"
            label="Contact Name"
            placeholder="Enter contact name"
            value={name}
            style={[styles.input]}
            onChangeText={value => setName(value)}
          />

          <TextInput
            mode="outlined"
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={number}
            style={[styles.input]}
            onChangeText={setNumber}
            keyboardType="numeric"
          />
          <Button
            mode="contained"
            onPress={handleUpdateContact}
            style={{marginVertical: 10}}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1a1919',
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
  },
});

export default UpdateContact;
