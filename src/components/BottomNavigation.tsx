import { Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { colors as C } from "../theme"
import { s } from "../theme/screenStyles"
import type { Screen } from "../types"

function CoffeeBeanIcon({ color, filled }: { color: string; filled: boolean }) {
  return (
    <View style={beanStyles.icon}>
      <View
        style={[
          beanStyles.bean,
          { borderColor: color, backgroundColor: filled ? color : "transparent" },
        ]}
      >
        <View
          style={[
            beanStyles.groove,
            { borderColor: filled ? C.espresso : color },
          ]}
        />
      </View>
    </View>
  )
}

export default function BottomNavigation({
  current,
  go,
  count,
}: {
  current: Screen
  go: (x: Screen) => void
  count: number
}) {
  const tabs: { key: Screen; label: string; icon?: keyof typeof Ionicons.glyphMap; coffeeBean?: boolean }[] = [
    { key: "home", label: "Home", icon: "home" },
    { key: "menu", label: "Menu", icon: "cafe" },
    { key: "cart", label: "Order", icon: "bag-handle" },
    { key: "rewards", label: "Rewards", coffeeBean: true },
    { key: "account", label: "Account", icon: "person" },
  ]
  return (
    <SafeAreaView edges={["bottom"]} style={s.nav}>
      {tabs.map(({ key, label, icon, coffeeBean }) => (
        <Pressable key={key} onPress={() => go(key)} style={s.navItem}>
          <View>
            {key === "cart" && count > 0 && (
              <View style={s.cartBadge}>
                <Text style={s.cartBadgeText}>{count}</Text>
              </View>
            )}
            {coffeeBean ? (
              <CoffeeBeanIcon
                color={current === key ? C.gold : C.latte}
                filled={current === key}
              />
            ) : icon ? (
              <Ionicons
                name={
                  current === key
                    ? icon
                    : `${icon}-outline` as keyof typeof Ionicons.glyphMap
                }
                size={23}
                color={current === key ? C.gold : C.latte}
              />
            ) : null}
          </View>
          <Text style={[s.navLabel, current === key && { color: C.gold }]}>
            {label}
          </Text>
        </Pressable>
      ))}
    </SafeAreaView>
  )
}

const beanStyles = StyleSheet.create({
  icon: {
    width: 23,
    height: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  bean: {
    width: 14,
    height: 22,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-35deg" }],
  },
  groove: {
    width: 7,
    height: 15,
    borderLeftWidth: 2,
    borderRadius: 6,
    transform: [{ rotate: "10deg" }],
  },
})

