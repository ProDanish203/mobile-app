import {
  View,
  Text,
  KeyboardType,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { icons } from "@/constants";
import { Button } from "./Button";

export const Input = ({
  title,
  value,
  handleChangeText,
  className,
  keyboardType,
  placeholder,
}: {
  title: string;
  value: string;
  handleChangeText: any;
  className?: string;
  keyboardType?: KeyboardType;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <View className={cn("space-y-2 mt-7", className)}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="w-full flex-1 text-white font-psemibold text-base items-center justify-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      
    </View>
  );
};
