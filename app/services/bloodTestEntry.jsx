// Import necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Default blood tests with their markers
const defaultBloodTests = {
  ESR: ['ESR Value'],
  CRP: ['CRP Value'],
  'FBC/CBC': ['HB', 'WBC', 'Plt', 'Neutrophils', 'Lymphocytes', 'RBC', 'HCT', 'MCV', 'MCH'],
  ALT: ['ALT Value'],
};

// BloodTestEntry component
const BloodTestEntry = ({ bloodTestDone, setBloodTestDone, testName, setTestName, markers, setMarkers }) => {
  const [tempMarkers, setTempMarkers] = useState({});
  const db = getFirestore();

  // Handle value change for default markers
  const handleDefaultMarkerValueChange = (marker, value) => {
    setTempMarkers({ ...tempMarkers, [marker]: value });
  };

  // Save markers to state and Firestore
  const saveMarkers = async () => {
    const newMarkers = Object.entries(tempMarkers).map(([name, value]) => ({ name, value }));
    setMarkers([...markers, ...newMarkers]);
    setTempMarkers({});

    try {
      await addDoc(collection(db, 'bloodTests'), {
        testName,
        markers: [...markers, ...newMarkers],
      });
      Alert.alert('Success', 'Blood test results saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save blood test results');
    }
  };

  // Handle delete marker
  const deleteMarker = (index) => {
    const newMarkers = markers.filter((_, i) => i !== index);
    setMarkers(newMarkers);
  };

  return (
    <View className="mt-4">
      {/* Toggle switch to indicate if a blood test was done */}
      <Text className="text-lg text-white">Blood Test Done?</Text>
      <Switch
        value={bloodTestDone}
        onValueChange={() => setBloodTestDone(!bloodTestDone)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={bloodTestDone ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />

      {bloodTestDone && (
        <View className="mt-4">
          {/* Picker for selecting the test name */}
          <Text className="text-lg text-white">Test Name</Text>
          <Picker
            selectedValue={testName}
            onValueChange={(itemValue) => setTestName(itemValue)}
            className="text-white bg-black rounded-lg mt-2"
          >
            {Object.keys(defaultBloodTests).map((test, index) => (
              <Picker.Item key={index} label={test} value={test} />
            ))}
          </Picker>

          {/* Inputs for entering marker values */}
          <Text className="text-lg text-white mt-4">Markers</Text>
          {defaultBloodTests[testName] && defaultBloodTests[testName].map((defaultMarker, index) => (
            <View key={index} className="flex-row justify-between items-center mt-2">
              <Text className="text-lg text-white">{defaultMarker}</Text>
              <TextInput
                className="border border-white rounded-lg p-2 mt-2 mb-2 text-white bg-black w-1/2"
                placeholder="Value"
                placeholderTextColor="#CDCDE0"
                onChangeText={(value) => handleDefaultMarkerValueChange(defaultMarker, value)}
                returnKeyType="done"
              />
            </View>
          ))}

          {/* Save button to save the marker values */}
          <View className="mt-8">
            <CustomButton title="Save Markers" handlePress={saveMarkers} />
          </View>

          {/* Display the list of saved markers with delete option */}
          {markers.length > 0 && (
            <FlatList
              data={markers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="p-4 border-b border-white mt-4">
                  <Text className="text-lg text-white">{item.name}: {item.value}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <TouchableOpacity onPress={() => deleteMarker(index)}>
                      <Text className="text-red-500">Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default BloodTestEntry;
