import { View, Image, Text, ImageSourcePropType } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { tabsData } from "../../constants";

const TabIcon = ({
  icon,
  color,
  focused,
  name,
}: {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="flex items-center justify-center flex-col gap-y-1">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        {tabsData.map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              headerShown: false,
              tabBarIcon: ({ focused, color }) => (
                <TabIcon
                  icon={tab.icon}
                  name={tab.title}
                  color={color}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
