import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { Button } from "./Button";
import { router } from "expo-router";

export const EmptyState = ({
  title,
  subTitle,
  btnText,
  isProfile,
}: {
  title: string;
  subTitle?: string;
  btnText?: string;
  isProfile?: boolean;
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subTitle}
      </Text>

      <Button
        title={isProfile ? "Back to Explore" : "Create A Video"}
        handlePress={() => router.push(isProfile ? "/home" : "/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};
