import { View, Text } from "react-native";
import React from "react";

export const InfoBox = ({
  title,
  containerStyles,
  titleStyles,
  subTitle,
}: {
  title: string;
  titleStyles: string;
  containerStyles?: string;
  subTitle?: string;
}) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subTitle}
      </Text>
    </View>
  );
};
