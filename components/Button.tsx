import { TouchableOpacity, Text } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";

export const Button = ({
  title,
  containerStyles,
  handlePress,
  textStyles,
  isLoading,
}: {
  title: string;
  containerStyles: string;
  handlePress: any;
  textStyles?: string;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={cn(
        "disabled:opacity-50 bg-secondary rounded-xl min-h-[62px] justify-center items-center",
        containerStyles,
        isLoading && "opacity-50"
      )}
      disabled={isLoading}
    >
      <Text className={cn("text-primary font-psemibold text-lg", textStyles)}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
