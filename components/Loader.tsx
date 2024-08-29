import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";

export const Loader = ({ isLoading }: { isLoading: boolean }) => {
  const os = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;
  return (
    <View
      className="absolute flex justify-center items-center w-full h-full bg-primary/60 z-10"
      style={{ height: screenHeight }}
    >
      <ActivityIndicator
        animating={isLoading}
        color="#fff"
        size={os === "ios" ? "large" : 50}
      />
    </View>
  );
};
