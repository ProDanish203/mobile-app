import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getSearchResults } from "@/lib/appwrite";
import { EmptyState, SearchBar, VideoCard } from "@/components";

const SearchPage = () => {
  const { query }: { query: string } = useLocalSearchParams();

  const { data, isLoading, refresh } = useAppwrite(() =>
    getSearchResults(query)
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    refresh();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary min-h-screen pt-10">
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <VideoCard data={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results for:
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchBar
                placeholder={"Search for a video topic"}
                initialValue={query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default SearchPage;
