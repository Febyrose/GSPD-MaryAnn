import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ScannedDocScreen = () => {
  // Sample data for scanned documents
  const scannedDocuments = [
    { id: 1, name: 'Document 1', date: '2024-04-20' },
    { id: 2, name: 'Document 2', date: '2024-04-22' },
    { id: 3, name: 'Document 3', date: '2024-04-23' },
    // Add more documents as needed
  ];

  // Render item for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.documentItem}>
      <Text style={styles.documentName}>{item.name}</Text>
      <Text style={styles.documentDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned Documents History</Text>
      <FlatList
        data={scannedDocuments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.documentList}
      />
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
  documentList: {
    flex: 1,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  documentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  documentDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default ScannedDocScreen;
