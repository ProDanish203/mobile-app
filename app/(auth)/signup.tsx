import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Button, Input } from "@/components";
import { Link, Redirect, router } from "expo-router";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { useAuth } from "@/store/AuthProvider";

const Signup = () => {
  const { setUser, setIsLoggedIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await createUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // Set the user to global state
      const res = await getCurrentUser();
      setUser(res);
      setIsLoggedIn(true);

      if (user) router.replace("/home");
      else Alert.alert("Error", "Failed to create user");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Signup To Aora
          </Text>

          <Input
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            className="mt-7"
            placeholder="johndoe"
          />

          <Input
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            className="mt-7"
            keyboardType="email-address"
            placeholder="johndoe@gmail.com"
          />

          <Input
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            className="mt-7"
            placeholder="********"
          />

          <Button
            title="Signup"
            handlePress={handleSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-lg font-psemibold text-secondary"
              >
                Login
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
