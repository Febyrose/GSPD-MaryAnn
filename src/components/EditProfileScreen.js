import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system'; 

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { name: initialName, email: initialEmail, phoneNumber: initialPhoneNumber, qualifications: initialQualifications } = route.params || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [qualifications, setQualifications] = useState(initialQualifications || '');

  useEffect(() => {
    setName(initialName || '');
    setEmail(initialEmail || '');
    setPhoneNumber(initialPhoneNumber || '');
    setQualifications(initialQualifications || '');
  }, [initialName, initialEmail, initialPhoneNumber, initialQualifications]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

    if (!result.cancelled) {
      setSelectedImage(result.uri); 
    }
  };

  const confirm = async () => {
    let savedImageUri = null;

    if (selectedImage) {
      try {
        const savedImage = await FileSystem.copyAsync({ from: selectedImage, to: FileSystem.documentDirectory + 'profile_image.jpg' });
        savedImageUri = savedImage.uri;
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }

    navigation.navigate('Profile', {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      qualifications: qualifications,
      profileImage: savedImageUri, 
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {selectedImage? (
            <Image source={{ uri: selectedImage }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.placeholderContainer}>
              <FontAwesome5 name="camera" size={48} color="#999" />
              <Text style={styles.placeholderText}>Pick Photo</Text>
            </View>
          )}
        </TouchableOpacity> */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="phone" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user-graduate" size={16} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Qualifications"
              value={qualifications}
              onChangeText={setQualifications}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={confirm}>
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const imagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F6F7',
  },
  profileContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    backgroundColor: "white"
  },
  imagePicker: {
    borderRadius: 75,
    overflow: 'hidden',
    width: 150,
    height: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    resizeMode: 'cover',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  inputIcon: {
    marginRight: 20,
    color: '#666',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    placeholderTextColor: '#999',
  },
  confirmButton: {
    backgroundColor: '#CFEEEF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  confirmButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
