import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import Svg, { G, Path } from "react-native-svg"
import { colors as C } from "../theme"
import { s } from "../theme/screenStyles"
import type { Screen } from "../types"

function CoffeeBeanIcon({
  color,
  filled,
  size = 24,
}: {
  color: string
  filled: boolean
  size?: number
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      accessibilityElementsHidden
      focusable={false}
    >
      <G rotation={25} origin="50, 50">
        {filled ? (
          <>
            <Path
              d="M44.5 10C27 10 14 26 14 50S27 90 44.5 90C47 90 48.5 86 46.5 80C41 64 41 36 46.5 20C48.5 14 47 10 44.5 10Z"
              fill={color}
            />
            <Path
              d="M55.5 10C53 10 51.5 14 53.5 20C59 36 59 64 53.5 80C51.5 86 53 90 55.5 90C73 90 86 74 86 50S73 10 55.5 10Z"
              fill={color}
            />
          </>
        ) : (
          <>
            <Path
              d="M50 10C28.7 10 14 26.4 14 50S28.7 90 50 90 86 73.6 86 50 71.3 10 50 10Z"
              stroke={color}
              strokeWidth={7}
              strokeLinejoin="round"
            />
            <Path
              d="M53.5 13C43 29 41.5 39.5 49.5 51.5 57.5 63.5 58 73.5 47 87"
              stroke={color}
              strokeWidth={7}
              strokeLinecap="round"
            />
          </>
        )}
      </G>
    </Svg>
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

