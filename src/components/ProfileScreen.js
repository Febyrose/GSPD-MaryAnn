import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    qualifications: '',
    profileImage: null,
  });

  useEffect(() => {
    if (route.params) {
      setProfile({
        name: route.params.name || '',
        email: route.params.email || '',
        phoneNumber: route.params.phoneNumber || '',
        qualifications: route.params.qualifications || '',
        profileImage: route.params.profileImage || null,
      });
    }
  }, [route.params]);

  const handleEditProfile = () => {
    navigation.navigate('Edit Profile', { ...profile });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* <ProfileImage profileImage={profile.profileImage} /> */}
        <ProfileInfo profile={profile} />
        <View style={styles.buttonContainer}>
          <EditButton onPress={handleEditProfile} />
        </View>
      </View>
    </View>
  );
};

const ProfileInfo = ({ profile }) => (
  <View style={styles.profileInfo}>
    <Text style={styles.name}>{profile.name || 'New User'}</Text>
    <InfoRow icon="envelope" text={profile.email || 'Add Email'} />
    <InfoRow icon="phone" text={profile.phoneNumber || 'Add Phone Number'} />
    <InfoRow icon="user-graduate" text={profile.qualifications || 'Add Qualifications'} />
  </View>
);

const ProfileImage = ({ profileImage }) => (
  <Image
    source={profileImage ? { uri: `data:image/jpeg;base64,${profileImage}` } : require('../../assets/profile_icon.png')}
    style={styles.profilePhoto}
  />
);

const InfoRow = ({ icon, text }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconColumn}>
      <FontAwesome5 name={icon} size={16} color="#666" style={styles.icon} />
    </View>
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const EditButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>Edit Profile</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F6F7',
    padding: 20,
    
  },
  profileContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '80%',
    backgroundColor: '#fff',
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
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconColumn: {
    width: 20, // Set a fixed width for the icon column
  },
  icon: {
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    flex: 1, // Allow text to take remaining space
  },
  buttonContainer: {
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
