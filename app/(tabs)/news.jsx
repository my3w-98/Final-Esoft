import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    
    setNews([
      {
        title: 'New Clinical Trials for Lupus Research',
        imageUrl: 'https://www.lupusresearch.org/wp-content/uploads/2020/04/lra-logo-square.jpg',
        link: 'https://www.lupusresearch.org/stay-informed/researchdiscovery/new-clinical-trials/'
      },
      {
        title: 'Launch of the Lupus Landmark Study',
        imageUrl: 'https://www.lupusresearch.org/wp-content/uploads/2023/05/landmark-study.jpg',
        link: 'https://www.lupusresearch.org/stay-informed/researchdiscovery/lupus-landmark-study/'
      },
      {
        title: 'Promising New Lupus Treatments Highlighted at ACR Annual Meeting',
        imageUrl: 'https://www.lupusresearch.org/wp-content/uploads/2022/11/ACR-2023.jpg',
        link: 'https://www.lupusresearch.org/stay-informed/researchdiscovery/promising-new-lupus-treatments-highlighted-acr/'
      },
      {
        title: 'New Trial Begins to Test Investigational Cenerimod',
        imageUrl: 'https://www.lupusresearch.org/wp-content/uploads/2021/01/cenerimod-trial.jpg',
        link: 'https://www.lupusresearch.org/stay-informed/researchdiscovery/new-trial-begins-to-test-cenerimod/'
      },
      {
        title: 'New Grants and Grant Recipients Announced',
        imageUrl: 'https://www.lupusresearch.org/wp-content/uploads/2022/02/new-grants.jpg',
        link: 'https://www.lupusresearch.org/stay-informed/researchdiscovery/new-grants-recipients/'
      }
    ]);
  }, []);

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-6">
        <View className="bg-customColors-color1 rounded-lg p-6">
          <Text className="text-2xl text-white font-psemibold">News Updates</Text>
        </View>
      </ScrollView>

      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-100">
            <TouchableOpacity onPress={() => handlePress(item.link)}>
              <Image source={{ uri: item.imageUrl }} className="w-full h-40 rounded-lg" />
              <Text className="text-lg text-white font-pregular mt-2">{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default News;
