import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton'; 
import { images } from '../../constants'; 
import FormField from '../../components/FormField'; 
import { Link, useRouter } from 'expo-router'; 
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../config/firebase'; 

// SignIn component
const SignIn = () => {
  // useState hook to manage form state
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  // useState hook to manage the submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Router hook for navigation
  const router = useRouter();

  // Function to handle form submission
  const submit = async () => {
    console.log('Submit clicked');
    setIsSubmitting(true); // Set submitting state to true
    try {
      // Sign in with email and password using Firebase authentication
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      console.log('User signed in successfully:', userCredential.user);
      router.push('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error signing in:', error); // Log any errors
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Render the component UI
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-3 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[80px] h-[45px]" />
          <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Sign in to LupEase</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-10"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
          />
                 <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2 ">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
