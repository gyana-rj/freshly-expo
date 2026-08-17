import { Show, useClerk, useUser } from '@clerk/expo'
import { UserButton, UserProfileView } from '@clerk/expo/native';
import { Link } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useClerk(); 

  return (
    <View style={styles.container}>
     <Text style={styles.container}>Welcome</Text>

     <Show when="signed-in">
        <Text> Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Pressable style={styles.button} onPress={() => signOut()}>
            <Text style={styles.buttonText}>Sign out</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24 }}>User ID: {user?.id}</Text>
        <UserButton />
        </View>
        <UserProfileView style={{ flex: 1 }} />
     </Show>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})