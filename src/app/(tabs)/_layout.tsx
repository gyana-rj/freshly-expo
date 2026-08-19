import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from "nativewind";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const tabTintColor = isDark ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)";

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <NativeTabs tintColor={tabTintColor}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf={{
          default: "list.bullet.clipboard", 
          selected: "list.bullet.clipboard.fill"
        }} 
        md="list" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="planner">
        <NativeTabs.Trigger.Icon sf={{
          default: "plus.circle",
          selected: "plus.circle.fill"
        }} 
        md="add" />
        <NativeTabs.Trigger.Label>Planner</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>


      <NativeTabs.Trigger name="insights">
        <NativeTabs.Trigger.Icon sf={{
          default: "chart.bar",
          selected: "chart.bar.fill"
        }} 
        md="analytics" />
        <NativeTabs.Trigger.Label>Insights</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

  </NativeTabs>
}
