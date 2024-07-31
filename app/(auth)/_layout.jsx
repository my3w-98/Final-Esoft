import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../config/firebase'; 

const AuthLayout = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();


  return (
    <>
      <Stack options={{ headerShown: false }} >
    
          
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
          
    
       
      </Stack>

     
    </>
  );
};

export default AuthLayout;
