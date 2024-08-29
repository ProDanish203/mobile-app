import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { IVideo } from "@/types/type";
import { icons } from "@/constants";
import { Video, ResizeMode } from "expo-av";

export const VideoCard = ({ data }: { data: IVideo }) => {
  const { title, prompt, video, thumbnail, createdBy } = data;
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      {/* Author Information and Title */}
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: createdBy.avatar }}
              resizeMode="cover"
              className="w-full h-full rounded-lg"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {createdBy.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} resizeMode="contain" className="w-5 h-5" />
        </View>
      </View>

      {/* Video and Thumbnail Dipslay */}
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative w-full h-60 rounded-xl mt-3 justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full rounded-xl mt-3"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
