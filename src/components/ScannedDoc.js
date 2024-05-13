import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const ScannedDocScreen = () => {
  // Sample data for scanned documents
  const scannedDocuments = [
    { id: 1, name: 'Document 1', date: '2024-04-20', thumbnail: require('../../assets/document-medicine.svg') },
    { id: 2, name: 'Document 2', date: '2024-04-22', thumbnail: require('../../assets/document-medicine.svg') },
    { id: 3, name: 'Document 3', date: '2024-04-23', thumbnail: require('../../assets/document-medicine.svg') },
    { id: 4, name: 'Document 4', date: '2024-04-24', thumbnail: require('../../assets/document-medicine.svg') },
    // Add more documents as needed
  ];

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
