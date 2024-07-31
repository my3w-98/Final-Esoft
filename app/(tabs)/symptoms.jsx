import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Keyboard, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import SymptomsEntry from '../services/symptomsEntry';
import BloodTestEntry from '../services/bloodTestEntry';
import CustomButton from '../../components/CustomButton';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

// Symptoms component
const Symptoms = () => {
  // State hooks
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [symptoms, setSymptoms] = useState([]);
  const [bloodTestDone, setBloodTestDone] = useState(false);
  const [testName, setTestName] = useState('');
  const [markers, setMarkers] = useState([]);
  const db = getFirestore();

  // Handle saving data to Firestore
  const handleSave = async () => {
    try {
      const data = {
        date,
        symptoms,
        bloodTestDone,
        testName,
        markers,
      };
      await addDoc(collection(db, 'symptoms'), data);
      setDate(new Date());
      setSymptoms([]);
      setBloodTestDone(false);
      setTestName('');
      setMarkers([]);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  // Render header component
  const renderHeader = () => (
    <>
      <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
        <Text className="text-2xl text-white font-psemibold">Record Symptoms</Text>
        <View className="mt-6">
          <Text className="text-lg text-white font-pregular">Select Date</Text>
          <Button onPress={() => setShowDatePicker(true)} title="Show date picker" />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}
        </View>
      </View>

      <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
        <Text className="text-xl text-white font-psemibold">Symptoms</Text>
        <SymptomsEntry symptoms={symptoms} setSymptoms={setSymptoms} />
      </View>
    </>
  );

  // Render footer component
  const renderFooter = () => (
    <View className="bg-customColors-color1 rounded-lg p-6">
      <CustomButton
        title="Save"
        handlePress={handleSave}
        containerStyles="mt-6"
      />
    </View>
  );

  // Render the component UI
  return (
    <SafeAreaView className="bg-primarytabs flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={[]} // No data as the content is not a list
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Symptoms;
