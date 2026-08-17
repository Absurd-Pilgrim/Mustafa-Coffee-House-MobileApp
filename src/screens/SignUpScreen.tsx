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



function SignupField({
  label,
  placeholder,
  value,
  onChange,
  half = false,
  secure = false,
  keyboard = "default",
  autoComplete = "off",
  onToggleSecure,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  half?: boolean
  secure?: boolean
  keyboard?: "default" | "email-address" | "phone-pad" | "number-pad"
  autoComplete?: "off" | "name" | "given-name" | "family-name" | "email" | "tel" | "new-password"
  onToggleSecure?: () => void
}) {
  return (
    <View style={[su.fieldWrap, half && su.half]}>
      <Text style={su.label}>{label}</Text>
      <View style={su.field}>
      <TextInput
        key={secure ? "secure" : "visible"}
        value={value}
          onChangeText={onChange}
          style={su.input}
          placeholder={placeholder}
          placeholderTextColor="#8D8883"
          secureTextEntry={secure}
          keyboardType={keyboard}
          autoComplete={autoComplete}
          textContentType={
            autoComplete === "new-password"
              ? "newPassword"
              : autoComplete === "email"
                ? "emailAddress"
                : autoComplete === "tel"
                  ? "telephoneNumber"
                  : "none"
          }
          importantForAutofill={autoComplete === "off" ? "no" : "yes"}
          autoCapitalize={
            keyboard === "email-address" || onToggleSecure
              ? "none"
              : "sentences"
          }
        />
        {onToggleSecure && (
          <Pressable
            onPress={onToggleSecure}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={secure ? "Show password" : "Hide password"}
          >
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#6E625B"
            />
          </Pressable>
        )}
      </View>
    </View>
  )
}
function Checkbox({
  checked,
  onPress,
  children,
}: {
  checked: boolean
  onPress: () => void
  children: React.ReactNode
}) {
  return (
    <Pressable onPress={onPress} style={su.checkRow}>
      <View style={[su.checkbox, checked && su.checkboxOn]}>
        {checked && <Ionicons name="checkmark" size={16} color={C.espresso} />}
      </View>
      <Text style={su.checkText}>{children}</Text>
    </Pressable>
  )
}
export default function SignUpScreen({ back, done }: { back: () => void; done: (name: string) => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [offers, setOffers] = useState(false)
  const [terms, setTerms] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [birthdayText, setBirthdayText] = useState("")
  const [pickerDate, setPickerDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const formScrollRef = useRef<ScrollView>(null)
  const step1Valid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.replace(/\D/g, "").length >= 7
  const createAccountValid =
    step1Valid &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword &&
    terms
  const goBack = () => (step === 2 ? setStep(1) : back())
  const formatBirthday = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8)
    if (digits.length <= 2) return digits
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`
  }
  const openDatePicker = () => {
    setPickerDate(new Date())
    setShowDatePicker(true)
  }
  const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false)
    if (event.type === "set" && date) {
      setPickerDate(date)
      setBirthdayText(
        `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`,
      )
    }
  }
  return (
    <KeyboardAvoidingView
      style={su.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={su.top}>
        <SafeAreaView>
          <Pressable onPress={goBack} style={su.back}>
            <Text style={su.backText}>← Back</Text>
          </Pressable>
          <Image source={A.logo} contentFit="contain" style={su.logo} />
          <View style={su.headingRow}>
            <Text style={su.heading}>
              {step === 1 ? "Create account." : "Almost there."}
            </Text>
            <Text style={su.step}>Step {step} of 2</Text>
          </View>
          {step === 1 && (
            <Text style={su.welcome}>
              Join today — receive{" "}
              <Text style={su.welcomeStrong}>250 Beans</Text> as our welcome
              gift.
            </Text>
          )}
        </SafeAreaView>
      </View>
      <ScrollView
        ref={formScrollRef}
        contentContainerStyle={su.form}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        {step === 1 ? (
          <>
            <View style={su.nameRow}>
              <SignupField
                label="FIRST NAME"
                placeholder="First"
                value={firstName}
                onChange={setFirstName}
                autoComplete="given-name"
                half
              />
              <SignupField
                label="LAST NAME"
                placeholder="Last"
                value={lastName}
                onChange={setLastName}
                autoComplete="family-name"
                half
              />
            </View>
            <SignupField
              label="EMAIL"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              keyboard="email-address"
            />
            <SignupField
              label="PHONE"
              placeholder="+1 (312) 555-0100"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
              keyboard="phone-pad"
            />
            <View style={su.grow} />
            <Pressable
              onPress={() => setStep(2)}
              disabled={!step1Valid}
              accessibilityState={{ disabled: !step1Valid }}
              style={[su.continue, !step1Valid && su.continueDisabled]}
            >
              <Text
                style={[
                  su.continueText,
                  !step1Valid && su.continueTextDisabled,
                ]}
              >
                Continue
              </Text>
            </Pressable>
            <View style={su.divider}>
              <View style={su.line} />
              <Text style={su.or}>or continue with</Text>
              <View style={su.line} />
            </View>
            <Pressable style={su.social}>
              <Ionicons name="logo-apple" size={22} color={C.espresso} />
              <Text style={su.socialText}>Continue with Apple</Text>
            </Pressable>
            <Pressable style={su.social}>
              <Text style={su.google}>G</Text>
              <Text style={su.socialText}>Continue with Google</Text>
            </Pressable>
            <Pressable onPress={back} style={su.signIn}>
              <Text style={su.signInText}>
                Already a member? <Text style={su.signInLink}>Sign In</Text>
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <SignupField
              label="PASSWORD"
              placeholder="Create a password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              secure={!showPassword}
              onToggleSecure={() => setShowPassword(!showPassword)}
            />
            <SignupField
              label="CONFIRM PASSWORD"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
              secure={!showConfirmPassword}
              onToggleSecure={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            />
            <View style={su.fieldWrap}>
              <Text style={su.label}>
                BIRTHDAY <Text style={su.optional}>(optional)</Text>
              </Text>
              <View style={su.field}>
                <TextInput
                  value={birthdayText}
                  onChangeText={(value) =>
                    setBirthdayText(formatBirthday(value))
                  }
                  onFocus={() =>
                    setTimeout(
                      () =>
                        formScrollRef.current?.scrollTo({
                          y: 285,
                          animated: true,
                        }),
                      180,
                    )
                  }
                  style={su.input}
                  placeholder="dd-mm-yyyy"
                  placeholderTextColor="#8D8883"
                  keyboardType="number-pad"
                  maxLength={10}
                  autoComplete="off"
                  textContentType="none"
                  importantForAutofill="no"
                />
                <Pressable
                  onPress={openDatePicker}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel="Open birthday calendar"
                >
                  <Ionicons
                    name="calendar-outline"
                    size={22}
                    color={C.espresso}
                  />
                </Pressable>
              </View>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display={Platform.OS === "android" ? "calendar" : "spinner"}
                maximumDate={new Date()}
                onChange={onDateChange}
              />
            )}
            <Checkbox checked={offers} onPress={() => setOffers(!offers)}>
              Receive offers, seasonal updates, and exclusive rewards.
            </Checkbox>
            <Checkbox checked={terms} onPress={() => setTerms(!terms)}>
              I agree to the <Text style={{ color: C.caramel }}>Terms</Text> and{" "}
              <Text style={{ color: C.caramel }}>Privacy Policy</Text>.
            </Checkbox>
            <View style={su.grow} />
            <Pressable
              onPress={() => done(`${firstName.trim()} ${lastName.trim()}`)}
              disabled={!createAccountValid}
              accessibilityState={{ disabled: !createAccountValid }}
              style={[su.create, !createAccountValid && su.createDisabled]}
            >
              <Text
                style={[
                  su.createText,
                  !createAccountValid && su.createTextDisabled,
                ]}
              >
                Create Account
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

