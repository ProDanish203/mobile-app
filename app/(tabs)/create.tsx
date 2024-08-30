import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@/components";
import { ResizeMode, Video } from "expo-av";
import { icons } from "@/constants";
import { router } from "expo-router";
import { createPost } from "@/lib/appwrite";
import { useAuth } from "@/store/AuthProvider";
import * as ImagePicker from "expo-image-picker";

interface FormData {
  title: string;
  prompt: string;
  thumbnail: any;
  video: any;
}

const CreatePage = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>({
    title: "",
    thumbnail: null,
    video: null,
    prompt: "",
  });

  const openPicker = async (type: string) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        type === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const file = {
        uri: asset.uri,
        fileName: asset.uri.split("/").pop() || "file",
        mimeType: asset.type || `${type}/${asset.uri.split(".").pop()}`,
        fileSize: asset.fileSize,
      };

      if (type === "image") setForm({ ...form, thumbnail: file });
      if (type === "video") setForm({ ...form, video: file });
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
      Alert.alert("Error", "Please provide all fields");
      return;
    }
    if (!user) return;
    setUploading(true);
    try {
      // Upload the video
      await createPost({
        title: form.title,
        prompt: form.prompt,
        thumbnail: form.thumbnail,
        video: form.video,
        userId: user.$id,
      });

      setForm({
        title: "",
        thumbnail: null,
        video: null,
        prompt: "",
      });
      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full pt-5">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <Input
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e: string) => setForm({ ...form, title: e })}
          className="mt-10"
        />
        {/* Video Input */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                    alt="upload"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        {/* Thumbnail Input */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Input
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e: string) => setForm({ ...form, prompt: e })}
          className="mt-7"
        />

        <Button
          title="Submit & Publish"
          containerStyles="mt-7"
          isLoading={uploading}
          handlePress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreatePage;
