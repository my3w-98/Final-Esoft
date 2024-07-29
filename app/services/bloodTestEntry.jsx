import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../../components/CustomButton';

const defaultBloodTests = {
  ESR: ['ESR Value'],
  CRP: ['CRP Value'],
  'FBC/CBC': ['HB', 'WBC', 'Plt', 'Neutrophils', 'Lymphocytes', 'RBC', 'HCT', 'MCV', 'MCH'],
  ALT: ['ALT Value'],
  
  
};

const BloodTestEntry = ({ bloodTestDone, setBloodTestDone, testName, setTestName, markers, setMarkers }) => {
  const [markerName, setMarkerName] = useState('');
  const [markerValue, setMarkerValue] = useState('');
  const [tempMarkers, setTempMarkers] = useState({});

  const handleAddMarker = () => {
    if (markerName.trim() && markerValue.trim()) {
      setMarkers([...markers, { name: markerName.trim(), value: markerValue.trim() }]);
      setMarkerName('');
      setMarkerValue('');
    }
  };

  const handleDefaultMarkerValueChange = (marker, value) => {
    setTempMarkers({ ...tempMarkers, [marker]: value });
  };

  const saveDefaultMarkers = () => {
    const newMarkers = Object.entries(tempMarkers).map(([name, value]) => ({ name, value }));
    setMarkers([...markers, ...newMarkers]);
    setTempMarkers({});
  };

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'pregular' }}>Blood Test Done?</Text>
      <Button title={bloodTestDone ? "No" : "Yes"} onPress={() => setBloodTestDone(!bloodTestDone)} />
      {bloodTestDone && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'pregular' }}>Test Name</Text>
          <Picker
            selectedValue={testName}
            onValueChange={(itemValue) => setTestName(itemValue)}
            style={{ color: '#FFFFFF', backgroundColor: '#000000', borderRadius: 8, marginTop: 8 }}
          >
            {Object.keys(defaultBloodTests).map((test, index) => (
              <Picker.Item key={index} label={test} value={test} />
            ))}
          </Picker>
          <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'pregular', marginTop: 16 }}>Markers</Text>
          {defaultBloodTests[testName] && defaultBloodTests[testName].map((defaultMarker, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'pregular' }}>{defaultMarker}</Text>
              <TextInput
                style={{ borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, padding: 8, marginTop: 8, marginBottom:8, color: '#FFFFFF', backgroundColor: '#000000', width: '50%' }}
                placeholder="Value"
                placeholderTextColor="#CDCDE0"
                onChangeText={(value) => handleDefaultMarkerValueChange(defaultMarker, value)}
                returnKeyType="done"
              />
            </View>
          ))}
          <View style={{ marginTop: 30}} ><Button  title="Save Markers" onPress={saveDefaultMarkers} /></View>
          {testName === 'Other' && (
            <View>
              <TextInput
                style={{ borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, padding: 8, marginTop: 8, color: '#FFFFFF', backgroundColor: '#000000' }}
                placeholder="Enter marker"
                placeholderTextColor="#CDCDE0"
                value={markerName}
                onChangeText={setMarkerName}
                returnKeyType="done"
              />
              <TextInput
                style={{ borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 8, padding: 8, marginTop: 8,marginBottom: 8, color: '#FFFFFF', backgroundColor: '#000000' }}
                placeholder="Enter marker value"
                placeholderTextColor="#CDCDE0"
                value={markerValue}
                onChangeText={setMarkerValue}
                returnKeyType="done"
              />
              <CustomButton
                title="Add Marker"
                handlePress={handleAddMarker}
                containerStyles={{ marginTop: 16 }}
              />
            </View>
          )}
          {markers.length > 0 && (
            <FlatList
              data={markers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ padding: 16, borderBottomColor: '#FFFFFF', borderBottomWidth: 1, marginTop: 16 }}>
                  <Text style={{ fontSize: 18, color: '#FFFFFF', fontFamily: 'pregular' }}>{item.name}: {item.value}</Text>
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
