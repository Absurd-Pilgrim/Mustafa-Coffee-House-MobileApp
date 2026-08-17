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
import Button from "../components/PrimaryButton"

export default function SplashScreen({ next }: { next: () => void }) {
  return (
    <ImageBackground source={A.cup} style={s.fill}>
      <LinearGradient
        colors={["rgba(8,5,3,.68)", "rgba(8,5,3,.08)", "rgba(8,5,3,.94)"]}
        locations={[0, 0.45, 1]}
        style={s.fill}
      >
        <SafeAreaView style={s.splash}>
          <Text style={s.splashTitle}>
            Where Heritage{`
`}Meets Hospitality
          </Text>
          <Button title="Let's Begin" onPress={next} />
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}
