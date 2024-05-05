import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  // Function to handle the press event for the Add Qualification button
  const handleAddQualification = () => {
    // Implement your logic here
    console.log('Add Qualification button pressed');
  };

  // Function to handle the press event for the Edit Profile button
  const handleEditProfile = () => {
    // Implement your logic here
    console.log('Edit Profile button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/profile_icon.png')} // Replace with actual profile photo
          style={styles.profilePhoto}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>Dr. John Doe</Text>
          <Text style={styles.email}>john.doe@gamil.com</Text>
          <Text style={styles.number}>Phone: +46735671835</Text>
          {/* Add other profile information here */}
          <Text style={styles.qualifications}>Qualifications: MBBS, MD</Text>
          {/* Add more qualifications or information */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddQualification}>
          <Text style={styles.buttonText}>Add Qualification</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  number: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  qualifications: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#CFEEEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#212121',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;