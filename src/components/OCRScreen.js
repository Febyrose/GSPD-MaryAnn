import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import handleImage from './OCRBackend';

const OCRScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedText, setScannedText] = useState("");

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const openCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    }
  };

  const handleDigitizeDocument = async () => {
    if (selectedImage == null) {
      console.log("No image selected to scan. Abort.");
      setScannedText(["Select image and press button again."]);
      return;
    }
    // Add logic to digitize the selected image
    // This function will be triggered when the "Digitize Image" button is pressed
    console.log('Digitizing image...');
    // results is an array of strings
    results = await handleImage(selectedImage);
    console.log('Received results: ', results);
    setScannedText(results);
  };

  return (
    <View style={styles.container}>
      <View style={styles.horizontalIconsContainer}>
        {[
          { icon: "camera-retro", label: 'Scan', action: openCamera },
          // { icon: "file-excel", label: 'Scan to Excel', action: openCamera },
          { icon: "file-import", label: 'Import Files', action: pickImage },
        ].map((item, index) => ( 
          <TouchableOpacity
            key={index}
            style={styles.iconButton}
            onPress={item.action}
          >
            <View style={styles.icon}>
              <FontAwesome6 name={item.icon} size={24} color="#212121" />
            </View>
            <Text style={styles.iconLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* First Rectangular dotted box */}
      <View style={[styles.dottedBox, styles.elevatedBox]}>
      {!selectedImage ? (
    <Text style={styles.placeholderText}>Selected Document For Digitization</Text>
  ) : (
    <Image source={{ uri: selectedImage }} style={styles.image} />
  )}     
        
      </View>

      {/* "Digitize Image" button */}
      <TouchableOpacity style={styles.digitizeButton} onPress={handleDigitizeDocument}>
        <Text style={styles.digitizeButtonText}>Digitize Document</Text>
      </TouchableOpacity>

      {/* Second Rectangular dotted box */}
      <View style={[styles.dottedBox, styles.elevatedBox]}>
      {!scannedText ? (
    <Text style={styles.placeholderText}>Processed Digital Document</Text>
  ) : (
    <Text style={styles.placeholderText}>
      {scannedText.map((block) => {
        return block + '\n';
      })}</Text>
  )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F6F7',
  },
  horizontalIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  iconButton: {
    alignItems: 'center',
    width: '30%', // Adjust width to fit three items in a row
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },
  dottedBox: {  
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed', // Use dashed border style
    borderColor: '#999',
    backgroundColor: '#f2f2f2', // Set background color for the first dotted box
    width: '80%',
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  elevatedBox: {
    backgroundColor: '#fff', // Different background color for the elevated box
    elevation: 20, // Increased elevation for the second dotted box
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  digitizeButton: {
    backgroundColor: '#CFEEEF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  digitizeButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OCRScreen;
