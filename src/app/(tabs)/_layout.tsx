import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, useColorScheme } from "react-native";
import { useGroceryStore } from "@/src/store/grocery-store";
import { useEffect } from "react";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const{ loadItems, items } = useGroceryStore();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const activeIconColor = isDark ? "#4ade80" : "#047857"; 
  const inactiveIconColor = isDark ? "#8e8e93" : "#52525b";
  const blurTheme = isDark ? "dark" : "light";

  useEffect(() => {
    loadItems();
  }, [])

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeIconColor, 
        tabBarInactiveTintColor: inactiveIconColor,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          borderTopWidth: 0,
          elevation: 0, // Removes the solid shadow on Android
          backgroundColor: "transparent", // Required for the blur to show through
        },
        tabBarBackground: () => (
          <BlurView 
            tint= {blurTheme} 
            intensity={80} 
            style={StyleSheet.absoluteFill} 
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "List",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "list" : "list-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="planner"
        options={{
          title: "Planner",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "add-circle" : "add-circle-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "bar-chart" : "bar-chart-outline"} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}