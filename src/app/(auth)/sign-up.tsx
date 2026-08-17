import { useAuth, useSignUp } from '@clerk/expo'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SignUpScreen() {
  const { isLoaded, isSignedIn } = useAuth()
  const { signUp, errors, fetchStatus } = useSignUp()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSignUp = async () => {
    if (!signUp) return

    setFormError(null)

    const { error } = await signUp.password({ emailAddress, password })
    if (error) {
      setFormError(error.message ?? 'Sign up failed')
      return
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode()
    if (sendError) {
      setFormError(sendError.message ?? 'Could not send verification code')
      return
    }

    setIsVerifying(true)
  }

  const handleVerify = async () => {
    if (!signUp) return

    setFormError(null)

    const { error } = await signUp.verifications.verifyEmailCode({ code })
    if (error) {
      setFormError(error.message ?? 'Verification failed')
      return
    }

    if (signUp.status === 'complete') {
      const { error: finalizeError } = await signUp.finalize()
      if (finalizeError) {
        setFormError(finalizeError.message ?? 'Could not finish sign up')
      }
    }
  }

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return (
      <View style={styles.container}>
        <Text>You're signed in</Text>
      </View>
    )
  }

  if (isVerifying) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          keyboardType="numeric"
        />
        {errors.fields.code ? (
          <Text style={styles.error}>{errors.fields.code.message}</Text>
        ) : null}
        {formError ? <Text style={styles.error}>{formError}</Text> : null}
        <Button
          title={fetchStatus === 'fetching' ? 'Verifying…' : 'Verify'}
          onPress={handleVerify}
          disabled={fetchStatus === 'fetching'}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={setEmailAddress}
        keyboardType="email-address"
      />
      {errors.fields.emailAddress ? (
        <Text style={styles.error}>{errors.fields.emailAddress.message}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      {errors.fields.password ? (
        <Text style={styles.error}>{errors.fields.password.message}</Text>
      ) : null}
      {formError ? <Text style={styles.error}>{formError}</Text> : null}
      <Button
        title={fetchStatus === 'fetching' ? 'Signing up…' : 'Sign up'}
        onPress={handleSignUp}
        disabled={fetchStatus === 'fetching'}
      />
      {/* Required for sign-up flows on Expo web. Clerk skips the browser CAPTCHA on iOS and Android */}
      <View nativeID="clerk-captcha" />
      <Link href="/(auth)/sign-in" style={styles.link}>
        Already have an account? Sign in
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  error: {
    color: '#c62828',
    fontSize: 14,
  },
  link: {
    textAlign: 'center',
    color: '#2563eb',
    marginTop: 8,
  },
})
