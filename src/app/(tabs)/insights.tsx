import ClearCompletedButton from '@/src/components/insights/ClearCompletedButton'
import InsightsCategorySection from '@/src/components/insights/InsightsCategorySection'
import InsightsPrioritySection from '@/src/components/insights/InsightsPrioritySection'
import InsightsStatSection from '@/src/components/insights/InsightsStatSection'
import UserProfile from '@/src/components/insights/UserProfile'
import TabScreenBackground from '@/src/components/TabScreenBackground'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const InsightScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView className="flex-1 bg-background"

     showsVerticalScrollIndicator={false}
     contentContainerStyle={{
      paddingHorizontal: 20,             // Keeps the left/right spacing
      paddingTop: insets.top + 20,       // Clears the punch hole/notch safely
      paddingBottom: insets.bottom + 100, // Clears the floating tab bar safely
      gap: 14
     }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <TabScreenBackground />

      <UserProfile />
      <InsightsStatSection />
      <InsightsCategorySection />
      <InsightsPrioritySection />
      <ClearCompletedButton />
    </ScrollView>
  )
}

export default InsightScreen