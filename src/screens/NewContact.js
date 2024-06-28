import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {ADD_CONTACT} from '../store/contactsSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';

const NewContact = ({navigation}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();

  const isFormValid = () => {
    console.log('valid ===> ', name.length > 2 && number.length == 10);
    return name.length > 2 && number.length == 10;
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

  const onFavToggle = () => {
    setFav(!fav);
  };

  const handleAddContact = () => {
    if (isFormValid()) {
      const newBudget = {id: uuidv4(), name, number: parseInt(number), photo};
      dispatch(ADD_CONTACT(newBudget));
      navigation.goBack();
    }
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
        <Appbar.Content title="New Contact" />
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
                style={{marginLeft: 5}}
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

          {/* Error shows when input is not 0 or 3 char long */}
          {name.length != 0 && name.length < 3 && (
            <Text
              variant="labelSmall"
              style={{color: '#a70d0d', marginLeft: 5}}>
              Name must be atlest 3 character long
            </Text>
          )}

          <TextInput
            mode="outlined"
            label="Mobile Number"
            placeholder="10 digit mobile number"
            value={number}
            style={[styles.input]}
            onChangeText={setNumber}
            keyboardType="numeric"
          />

          {/* Error shows when input is 10 digit long */}
          {!(number.length == 10) && (
            <Text
              variant="labelSmall"
              style={{color: '#a70d0d', marginLeft: 5}}>
              Mobile no. must be 10 digit long
            </Text>
          )}

          <Button
            mode="contained"
            disabled={!isFormValid()}
            onPress={handleAddContact}
            style={{marginVertical: 10}}>
            Save
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default NewContact;
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
