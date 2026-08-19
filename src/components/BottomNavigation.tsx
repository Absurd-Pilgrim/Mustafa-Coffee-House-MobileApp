import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors as C } from "../theme"
import { s } from "../theme/screenStyles"
import type { Screen } from "../types"

export default function BottomNavigation({
  current,
  go,
  count,
}: {
  current: Screen
  go: (x: Screen) => void
  count: number
}) {
  const tabs: [Screen, string, keyof typeof Ionicons.glyphMap][] = [
    ["home", "Home", "home"],
    ["menu", "Menu", "cafe"],
    ["cart", "Order", "bag-handle"],
    ["rewards", "Rewards", "leaf"],
    ["account", "Account", "person"],
  ]
  return (
    <SafeAreaView edges={["bottom"]} style={s.nav}>
      {tabs.map(([key, label, icon]) => (
        <Pressable key={key} onPress={() => go(key)} style={s.navItem}>
          <View>
            {key === "cart" && count > 0 && (
              <View style={s.cartBadge}>
                <Text style={s.cartBadgeText}>{count}</Text>
              </View>
            )}
            <Ionicons
              name={
                current === key
                  ? icon
                  : `${icon}-outline` as keyof typeof Ionicons.glyphMap
              }
              size={23}
              color={current === key ? C.gold : C.latte}
            />
          </View>
          <Text style={[s.navLabel, current === key && { color: C.gold }]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </SafeAreaView>
  )
}

