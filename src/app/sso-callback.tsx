import { useAuth } from '@clerk/expo';
import { Redirect } from 'expo-router';

const SSOCallbackScreen  = () => {
  const { isSignedIn, isLoaded } = useAuth();
  
    if (!isLoaded) {
      return null;
    }
  
    if (isSignedIn) {
      return <Redirect href={"/" as any} />;
    }
    
    return <Redirect href={"/(auth)/sign-in"} />
}

export default SSOCallbackScreen 