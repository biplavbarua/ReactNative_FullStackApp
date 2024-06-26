import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, link, router } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { getCurrentUser, signIn } from '../../lib/appwrite';

const SignIn = () => {
  const [Form, setForm] = useState({
    email: '',
    password: ''
  })

  const [Submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if(!Form.email === "" || !Form.password === "" ) {
      Alert.alert('Error', 'All fields are required');
    }

    setSubmitting(true);
    
    try {
      await signIn(Form.email, Form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      Alert.alert('Success', 'You have successfully logged in');
      router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px] "/>

          <Text className="text-2xl text-white text-semibold mt-10 font-semibold">
            Log in to your account
          </Text>

          <FormField 
            title="Email"
            value={Form.email}
            handleChangeText={(e) => setForm({...Form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={Form.password}
            handleChangeText={(e) => setForm({...Form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={Submitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular ">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn