import { View, Text, Image, TextInput, KeyboardType } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { icons } from "@/constants";

export const SearchBar = ({
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
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        keyboardType={keyboardType}
      />

      <TouchableOpacity>
        <Image source={icons.search} />
      </TouchableOpacity>
    </View>
  );
};
