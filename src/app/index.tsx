import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-white text-4xl bg-purple-900">
        Edit the app/index.tsx to edit this screen 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray"
  },
});
