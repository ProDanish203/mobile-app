import { View, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

export const SearchBar = ({
  placeholder,
  initialValue,
}: {
  placeholder?: string;
  initialValue?: string;
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialValue || "");

  const handleSearch = () => {
    if (!query)
      return Alert.alert(
        "Missing query",
        "Please input something to search results"
      );

    if (pathname.startsWith("/search")) router.setParams({ query });
    else router.push(`/search/${query}`);
  };

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e: string) => setQuery(e)}
        keyboardType="default"
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} resizeMode="contain" className="w-5 h-5" />
      </TouchableOpacity>
    </View>
  );
};
