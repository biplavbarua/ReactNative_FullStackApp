import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, link } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  const [Form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {

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
            isLoading={isSubmitting}
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