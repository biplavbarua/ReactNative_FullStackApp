import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, link } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';

import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [Form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [Submitting, setSubmitting] = useState(false)

  const submit = async () => {
    if(!Form.username === "" || !Form.email === "" || !Form.password === "") {
      Alert.alert('Error', 'All fields are required');
    }

    setSubmitting(true);
    try {
      const result = await createUser(Form.email, Form.password, Form.username);
      setUser(result);
      setIsLogged(true);
      /// Set it to Global State...

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
            Sign up to your account
          </Text>

          <FormField 
            title="Username"
            value={Form.username}
            handleChangeText={(e) => setForm({...Form, username: e})}
            otherStyles="mt-10"
          />

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
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={Submitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular ">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp