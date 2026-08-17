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

const slides = [
  [A.counter, "Crafted With Heritage", "Discover premium coffee, authentic teas, and flavors prepared with care."],
  [A.seating, "Hospitality Around the Clock", "Order your favorites, find a comfortable space, and enjoy Mustafa Coffee House 24 hours a day."],
  [A.exterior, "Every Pour Earns Beans", "Earn rewards with every visit and unlock experiences created for true coffee lovers."],
] as const

export default function OnboardingScreen({
  signin,
  signup,
}: {
  signin: () => void
  signup: () => void
}) {
  const [i, setI] = useState(0)
  const [image, title, body] = slides[i]
  const last = i === 2
  return (
    <View style={[s.fill, { backgroundColor: C.espresso }]}>
      <ImageBackground source={image} style={s.onboardImage}>
        <LinearGradient
          colors={["rgba(34,17,11,.1)", C.espresso]}
          style={s.fill}
        />
        {!last && (
          <Pressable onPress={() => setI(2)} style={s.skip}>
            <Text style={s.muted}>Skip</Text>
          </Pressable>
        )}
        <View style={s.dots}>
          {slides.map((_, n) => (
            <View key={n} style={[s.dot, n === i && s.dotActive]} />
          ))}
        </View>
      </ImageBackground>
      <View style={s.onboardCopy}>
        <View style={s.rule} />
        <Text style={s.lightTitle}>{title}</Text>
        <Text style={s.lightBody}>{body}</Text>
      </View>
      <SafeAreaView style={s.actions}>
        {last ? (
          <>
            <View style={s.offer}>
              <Ionicons name="cafe-outline" color={C.gold} size={23} />
              <View>
                <Text style={s.offerLabel}>WELCOME OFFER</Text>
                <Text style={s.offerText}>
                  Join today — receive{" "}
                  <Text style={{ color: C.gold, fontFamily: "FiraBold" }}>
                    250 Beans
                  </Text>
                </Text>
              </View>
            </View>
            <Button title="Create Account" onPress={signup} />
            <Pressable onPress={signin} style={s.textButton}>
              <Text style={s.muted}>Sign In</Text>
            </Pressable>
          </>
        ) : (
          <View style={s.between}>
            <Pressable disabled={!i} onPress={() => setI(i - 1)}>
              <Text style={[s.muted, !i && { opacity: 0 }]}>← Back</Text>
            </Pressable>
            <Pressable onPress={() => setI(i + 1)} style={s.next}>
              <Text style={s.nextText}>→</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

