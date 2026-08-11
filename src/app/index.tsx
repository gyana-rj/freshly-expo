import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit the app/index.tsx to edit this screen </Text>
      <Image
        source={require("../../assets/images/icon.png")}
        style={{ width: 200, height: 200, borderRadius: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink"
  },
});
