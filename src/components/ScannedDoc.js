import React, { createContext, useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import documentThumbnail from '../../assets/document-medicine.svg'; 
import { useFocusEffect } from '@react-navigation/native';


const ScannedDocScreen = () => {

  const [scannedDocuments, setScannedDocuments] = useState([]);
  const STORAGE_KEY = 'scannedDocuments';

  useFocusEffect(
    React.useCallback(() => {
      const loadDocuments = async () => {
        try {
          const storedData = await AsyncStorage.getItem('scannedDocuments');
          console.log('Stored Data:', storedData);
  
          const storedDocuments = await AsyncStorage.getItem('scannedDocuments');
          console.log(storedDocuments)
          if (storedDocuments) {
            setScannedDocuments(JSON.parse(storedDocuments));
          } else {
            const defaultDocuments = [
              { id: 1, name: 'Document 12s', date: '2024-04-20', thumbnail: documentThumbnail },
              { id: 2, name: 'Document 23', date: '2024-04-22', thumbnail: documentThumbnail },
              { id: 3, name: 'Document 34', date: '2024-04-23', thumbnail: documentThumbnail },
              { id: 4, name: 'Document 46121', date: '2024-04-24', thumbnail: documentThumbnail },
            ];
            setScannedDocuments(defaultDocuments);
            await AsyncStorage.setItem('scannedDocuments', JSON.stringify(defaultDocuments));
          }
        } catch (e) {
          console.error('Failed to load documents from storage', e);
        }
      };
  
      loadDocuments();
    }, [])
  );

  // Render item for GridView
  const renderGridItem = (item) => (
    <View style={styles.gridItem} key={item.id}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <Text style={styles.documentName}>{item.name}</Text>
      <Text style={styles.documentDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Documents History</Text>
      <ScrollView>
        <View style={styles.gridContainer}>
          {scannedDocuments.map((item) => renderGridItem(item))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '33%', // Adjust the width as needed for 2-column layout
    marginBottom: 20,
    alignItems: 'center',
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  documentName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  documentDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default ScannedDocScreen;
