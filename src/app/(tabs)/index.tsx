import CompletedItems from "@/src/components/list/CompletedItems";
import ListHeroCard from "@/src/components/list/ListHeroCard";
import PendingItemCard from "@/src/components/list/PendingItemCard";
import TabScreenBackground from "@/src/components/TabScreenBackground";
import { useGroceryStore } from "@/src/store/grocery-store";
import {FlatList, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ListScreen() {
  const { items } = useGroceryStore();
  const pendingItems = items.filter((item) => !item.purchased)
  const insets = useSafeAreaInsets();
  return (

     <FlatList
        className="flex-1 bg-background"
        data={pendingItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => <PendingItemCard item={item} />}
        contentContainerStyle={{ 
          padding: 20, paddingBottom: 80 + insets.bottom, gap: 14,
          paddingHorizontal: 20, paddingTop: insets.top + 20
        }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ gap: 14 }}>
              <TabScreenBackground />
              <ListHeroCard />
              <View className="flex-row items-center justify-between px-1">
                  <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
                      Shopping Items 
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                      {pendingItems.length}active
                  </Text>
              </View>
          </View>
        }
        ListFooterComponent={<CompletedItems />}
     />
  );
}




// First verson with item.map
/*
<ScrollView className="flex-1 bg-background py-4"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 20, gap: 14}}
    >
      <TabScreenBackground />
      <ListHeroCard />

       <View className="flex-row items-center justify-between px-1">
        <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
          Shopping items
        </Text>
        <Text className="text-sm text-muted-foreground">{pendingItems.length} active</Text>
      </View>

      {pendingItems.map((item) => 
      (<PendingItemCard key={item.id} item={item}/>))}

      <CompletedItems />

    </ScrollView>

*/