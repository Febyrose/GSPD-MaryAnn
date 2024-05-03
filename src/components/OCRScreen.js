import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faFilePdf, faFileExcel, faFileImport } from '@fortawesome/free-solid-svg-icons';
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
          { icon: "faFilePdf", label: 'Scan to PDF', action: openCamera },
          { icon: "faFileExcel", label: 'Scan to Excel', action: openCamera },
          { icon: "faFileImport", label: 'Import Files', action: pickImage },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconButton}
            onPress={item.action}
          >
            <View style={styles.icon}>
              {/* <FontAwesomeIcon icon={item.icon} size={30} color="#0E46A3" /> */}
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
      {!selectedImage ? (
    <Text style={styles.placeholderText}>Processed Digital Document</Text>
  ) : (
    <Image source={{ uri: selectedImage }} style={styles.image} />
  )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  horizontalIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    backgroundColor: '#f0f0f0', // Set background color for the first dotted box
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
    backgroundColor: '#0E46A3',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'center',
  },
  digitizeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default OCRScreen;
