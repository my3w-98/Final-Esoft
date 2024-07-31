// Import necessary components and libraries
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import BloodTestEntry from '../services/bloodTestEntry'; // Import the BloodTestEntry component
import CustomButton from '../../components/CustomButton';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';

// BloodTests component
const BloodTests = ({ navigation }) => {
  // State hooks
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [bloodTestDone, setBloodTestDone] = useState(false);
  const [testName, setTestName] = useState('');
  const [markers, setMarkers] = useState([]);
  const db = getFirestore();

  // Handle saving data to Firestore
  const handleSave = async () => {
    try {
      if (bloodTestDone) {
        const bloodTestData = {
          date,
          testName,
          markers,
        };
        await addDoc(collection(db, 'bloodTests'), bloodTestData);
      }

      // Reset state after saving
      setDate(new Date());
      setBloodTestDone(false);
      setTestName('');
      setMarkers([]);
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  // Render header component
  const renderHeader = () => (
    <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
      <Text className="text-2xl text-white font-psemibold">Record Blood Tests</Text>
      <View className="mt-6">
        <Text className="text-lg text-white font-pregular">Selected Date: {date.toLocaleDateString()}</Text>
        <CustomButton title="Change date" handlePress={() => setShowDatePicker(true)} />
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
  );

  // Render footer component
  const renderFooter = () => (
    <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
      <CustomButton
        title="Save"
        handlePress={handleSave}
        containerStyles="mt-6 bg-success"
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
          ListEmptyComponent={() => (
            <View className="bg-customColors-color1 rounded-lg p-6 mb-6">
              <BloodTestEntry
                bloodTestDone={bloodTestDone}
                setBloodTestDone={setBloodTestDone}
                testName={testName}
                setTestName={setTestName}
                markers={markers}
                setMarkers={setMarkers}
              />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16, paddingVertical: 24 }}
        />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BloodTests;
