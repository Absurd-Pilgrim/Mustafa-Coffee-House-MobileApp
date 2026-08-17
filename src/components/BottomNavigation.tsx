import { useRef, useState } from "react"
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { assets as A } from "../data/assets"
import { products } from "../data/products"
import { colors as C } from "../theme"
import { as, cs, hs, ms, ps, rs, s, si, su, xs } from "../theme/screenStyles"
import type { CartItem, Product, Screen } from "../types"

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
    <SafeAreaView style={s.nav}>
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

