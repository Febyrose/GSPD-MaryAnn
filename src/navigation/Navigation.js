import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OCRScreen from '../components/OCRScreen';
import ProfileScreen from '../components/ProfileScreen';
import ScannedDocScreen from '../components/ScannedDoc';
import { Image, TouchableOpacity, Text, View } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabIcons = {
  OCR: require('../../assets/ocr_icon.png'),
  Profile: require('../../assets/profile_icon.png'),
  History: require('../../assets/scanlogo.png'),
};

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#daf0e2', // Light green color
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconSource = tabIcons[route.name];
          return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
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
                backgroundColor: '#daf0e2', // Light green color
              },
              headerTintColor: '#FFFFFF', // White color for text/icons
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/logo.png')} style={{ width: 32, height: 32, marginLeft: 10 }} />
                <Text style={{ marginLeft: 10, fontSize: 22, fontWeight: 'bold', color: 'black' }}>Medical OCR</Text>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
