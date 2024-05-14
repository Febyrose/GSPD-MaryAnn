import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome6 } from '@expo/vector-icons';
import OCRScreen from '../components/OCRScreen';
import ProfileScreen from '../components/ProfileScreen';
import EditProfileScreen from '../components/EditProfileScreen';
import ScannedDocScreen from '../components/ScannedDoc';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import ResultScreen from '../components/ResultScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#68AAAC', // D2V Blue
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: '#666666', // Dark grey color for tab labels
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor = focused ? '#CFEEEF' : '#376473'; // Dark grey with increased opacity for focused, faded dark grey for unfocused
          let icon = "";
          if (route.name === 'OCR') {
            icon = <FontAwesome6 name='magnifying-glass-chart' size={size} color={iconColor} />;
          } else if (route.name === 'Profile') {
            icon = <FontAwesome6 name='person' size={size} color={iconColor} />;
          } else if (route.name === 'History') {
            icon = <FontAwesome6 name='book' size={size} color={iconColor} />;
          }
          return icon;
        },
      })}
    >
      <Tab.Screen name="OCR" component={OCRScreen} />
      <Tab.Screen name="History" component={ScannedDocScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MyTabs}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: '#68AAAC', // Light Blue
            },
            headerTintColor: '#FFFFFF', // White color for text/icons
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 10, fontSize: 22, fontWeight: 'bold', color: '#212121' }}>MedScan</Text>
              </View>
            ),
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../../assets/back.png')} style={{ width: 24, height: 24, marginLeft: 10 }} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
