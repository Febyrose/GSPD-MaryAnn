import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ResultScreen = ({ route }) => {
  // Extract scanned text from route parameters
  const { scannedText } = route.params;

  // Initialize state variables for editable fields
  const [patientName, setPatientName] = useState(scannedText.patientName || '');
  const [age, setAge] = useState(scannedText.age || '');
  const [sex, setSex] = useState(scannedText.sex || '');
  const [address, setAddress] = useState(scannedText.address || '');
  const [dateOfAdmission, setDateOfAdmission] = useState(scannedText.dateOfAdmission || '');
  const [cardNumber, setCardNumber] = useState(scannedText.cardNumber || '');
  const [diagnosis, setDiagnosis] = useState(scannedText.diagnosis || '');

  // Sample tabular data
  const tableData = [
    { serialNumber: '1', date: '2024-05-15', ketamine: 'Yes', propofol: 'No', diazepam: 'Yes', bp: '140/90',pr:135, spo:100, temp:0, timeOfInduction: '10:00 AM', durationofProcedure:15, durationofAnesthesia:12, timeRecovery:4.5, nameAnesthetist:"Dolor Sit" },
    { serialNumber: '2', date: '2024-05-16', ketamine: 'No', propofol: 'Yes', diazepam: 'No', bp: '140/90',pr:135, spo:100, temp:0, timeOfInduction: '11:30 AM', durationofProcedure:15, durationofAnesthesia:11, timeRecovery:5.0, nameAnesthetist:"Consectetur" },
    // Add more rows as needed
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Patient Information</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Patient Name</Text>
          <TextInput
            style={styles.input}
            value={patientName}
            onChangeText={setPatientName}
            placeholder="Enter patient name"
            placeholderTextColor="#999"
          />
        </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter age"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Sex</Text>
        <TextInput
          style={styles.input}
          value={sex}
          onChangeText={setSex}
          placeholder="Enter sex"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter address"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Date of Admission</Text>
        <TextInput
          style={styles.input}
          value={dateOfAdmission}
          onChangeText={setDateOfAdmission}
          placeholder="Enter date of admission"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="Enter card number"
          placeholderTextColor="#999"
        />
      </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Diagnosis</Text>
          <TextInput
            style={[styles.input, styles.diagnosisInput]}
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Enter diagnosis"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Serial No.</Text>
            <Text style={styles.tableHeader}>Date</Text>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeader}>Type of Sedation</Text>
              <View style={styles.subHeaderRow}>
                <Text style={styles.subHeader2}>Ketamine</Text>
                <Text style={styles.subHeader2}>Propofol</Text>
                <Text style={styles.subHeader2}>Diazepam</Text>
              </View>
            </View>
            <View style={styles.subHeaderContainer}>
              <Text style={styles.subHeader}>Vital Sign</Text>
              <View style={styles.subHeaderRow}>
                <Text style={styles.subHeader2}>B/P</Text>
                <Text style={styles.subHeader2}>PR</Text>
                <Text style={styles.subHeader2}>SPO2</Text>
                <Text style={styles.subHeader2}>Temp</Text>
              </View>
            </View>
            <Text style={styles.tableHeader}>Time of Induction</Text>
            <Text style={styles.tableHeader}>Duration of Procedure</Text>
            <Text style={styles.tableHeader}>Duration of Anesthesia</Text>
            <Text style={styles.tableHeader}>Time of Recovery</Text>
            <Text style={styles.tableHeader}>Name of Anesthetist</Text>
          </View>
          {/* Table Body */}
          {tableData.map((rowData, index) => (
            <View key={index} style={[styles.tableRow, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={styles.tableCell}>{rowData.serialNumber}</Text>
              <Text style={styles.tableCell}>{rowData.date}</Text>
              <View style={styles.subCellContainer}>
                <Text style={styles.subCell}>{rowData.ketamine}</Text>
                <Text style={styles.subCell}>{rowData.propofol}</Text>
                <Text style={styles.subCell}>{rowData.diazepam}</Text>
              </View>
              <View style={styles.subCellContainer}>
                <Text style={styles.subCell}>{rowData.bp}</Text>
                <Text style={styles.subCell}>{rowData.pr}</Text>
                <Text style={styles.subCell}>{rowData.spo}</Text>
                <Text style={styles.subCell}>{rowData.temp}</Text>
              </View>

              <Text style={styles.tableCell}>{rowData.timeOfInduction}</Text>
              <Text style={styles.tableCell}>{rowData.durationofProcedure}</Text>
              <Text style={styles.tableCell}>{rowData.durationofAnesthesia}</Text>
              <Text style={styles.tableCell}>{rowData.timeRecovery}</Text>
              <Text style={styles.tableCell}>{rowData.nameAnesthetist}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Save button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Data saved")}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#212121',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#212121',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#212121',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#212121',
  },
  diagnosisInput: {
    height: 100,
  },
  tableContainer: {
    marginVertical: 20, // Add margin top and bottom
    marginHorizontal: 10, // Add margin left and right
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  evenRow: {
    backgroundColor: '#F0F6F7',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  tableHeader: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    color: '#212121',
    textAlign: 'center',
  },

  subHeader: {
    flex: 1, // Adjust the flex property
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#212121',
    paddingHorizontal: 5,
  },

  subHeader2: {
    width: 100,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#212121',
    paddingHorizontal: 5,
  },



  subHeaderContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center', // Align items vertically in the center
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10, // Add horizontal padding
  },

  subCell: {
    width: 100,
    textAlign: 'center',
    color: '#212121',
  },
  subCellContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10, // Add horizontal padding
  },
  tableCell: {
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#212121',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#68AAAC',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginStart:50,
    marginEnd:50,
    marginBottom:20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ResultScreen;
