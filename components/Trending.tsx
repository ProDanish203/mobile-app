import { View, Text, FlatList } from "react-native";
import React from "react";

export const Trending = ({ posts }: { posts: { id: number }[] }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-2xl text-white">{item.id}</Text>
      )}
      horizontal
    />
  );
};
