import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background px-4">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-white">
          Home Screen
        </Text>
      </View>
    </SafeAreaView>
  );
}