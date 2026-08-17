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

function Field({
  label,
  icon,
  secure,
}: {
  label: string
  icon: keyof typeof Ionicons.glyphMap
  secure?: boolean
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <View style={s.field}>
        <Ionicons name={icon} color={C.caramel} size={19} />
        <TextInput
          placeholder={label === "EMAIL" ? "you@example.com" : "••••••••"}
          placeholderTextColor="#9B8B82"
          secureTextEntry={secure}
          style={s.input}
        />
      </View>
    </View>
  )
}

export default function SignInScreen({back,done,createAccount}:{back:()=>void;done:(name?:string)=>void;createAccount:()=>void}) {
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())&&password.length>0;
  return <KeyboardAvoidingView style={si.screen} behavior={Platform.OS==='ios'?'padding':undefined}>
    <View style={si.top}><SafeAreaView><Pressable onPress={back} style={si.back}><Text style={si.backText}>← Back</Text></Pressable><Image source={A.logo} contentFit="contain" style={si.logo}/><Text style={si.heading}>Welcome back.</Text></SafeAreaView></View>
    <ScrollView contentContainerStyle={si.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View><Text style={si.label}>EMAIL</Text><View style={si.field}><TextInput value={email} onChangeText={setEmail} placeholder="you@example.com" placeholderTextColor="#9A8E87" keyboardType="email-address" autoCapitalize="none" autoComplete="email" textContentType="emailAddress" style={si.input}/></View></View>
      <View style={si.passwordWrap}><Text style={si.label}>PASSWORD</Text><View style={si.field}><TextInput value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor="#9A8E87" secureTextEntry autoCapitalize="none" autoComplete="current-password" textContentType="password" style={si.input}/></View></View>
      <Pressable style={si.forgot}><Text style={si.forgotText}>Forgot password?</Text></Pressable><View style={si.grow}/>
      <Pressable disabled={!valid} onPress={()=>done()} style={[si.signin,!valid&&si.signinDisabled]}><Text style={[si.signinText,!valid&&si.signinTextDisabled]}>Sign In</Text></Pressable>
      <View style={si.divider}><View style={si.line}/><Text style={si.or}>or continue with</Text><View style={si.line}/></View>
      <Pressable style={si.social}><Ionicons name="logo-apple" size={20} color={C.espresso}/><Text style={si.socialText}>Continue with Apple</Text></Pressable>
      <Pressable style={si.social}><Text style={si.google}>G</Text><Text style={si.socialText}>Continue with Google</Text></Pressable>
      <Pressable onPress={createAccount} style={si.create}><Text style={si.createText}>New to Mustafa? <Text style={si.createLink}>Create Account</Text></Text></Pressable>
    </ScrollView>
  </KeyboardAvoidingView>
}


