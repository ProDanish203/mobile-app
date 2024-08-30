import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { EmptyState, InfoBox, VideoCard } from "@/components";
import { getUserPosts, logout } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { useAuth } from "@/store/AuthProvider";
import { router } from "expo-router";

const ProfilePage = () => {
  const { user, setUser, setIsLoggedIn } = useAuth();

  const { data, isLoading, refresh } = useAppwrite(() =>
    getUserPosts(user.$id)
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/login");
  };

  return (
    <SafeAreaView className="bg-primary min-h-screen">
      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <VideoCard data={item} />}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-cebter mt-6 mb-6 px-4">
            <TouchableOpacity
              className="flex items-end mb-10"
              onPress={() => handleLogout()}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center mx-auto">
              <Image
                source={{ uri: user?.avatar || "" }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>

            {/* Info box */}
            <InfoBox
              title={user?.username || ""}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />
            <View className="mt-5 flex-row items-center justify-center">
              <InfoBox
                title={data.length || 0}
                subTitle="Posts"
                containerStyles="mr-10 -mt-5"
                titleStyles="text-xl"
              />
              <InfoBox
                title={"1.3k"}
                subTitle="Followers"
                containerStyles="-mt-5"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="No videos found for this account"
            isProfile
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default ProfilePage;
