import { AuthView } from '@clerk/expo/native'
import { useAuth, useUser } from '@clerk/expo'
import { useState } from 'react'
import { Button, Modal, Text, View } from 'react-native'

export default function HomeScreen() {
  const { isSignedIn } = useAuth({ treatPendingAsSignedOut: false })
  const { user } = useUser()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <View>
      {isSignedIn ? (
        <Text>User ID: {user?.id}</Text>
      ) : (
        <Button title="Sign in" onPress={() => setIsAuthOpen(true)} />
      )}
      <Modal
        animationType="slide"
        visible={isAuthOpen}
        presentationStyle="pageSheet"
        onRequestClose={() => setIsAuthOpen(false)}
      >
        <AuthView mode="signInOrUp" onDismiss={() => setIsAuthOpen(false)} />
      </Modal>
    </View>
  )
}