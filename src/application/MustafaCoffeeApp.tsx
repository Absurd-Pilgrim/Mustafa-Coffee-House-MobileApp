// import { useMemo, useState } from "react"
// import { ActivityIndicator, SafeAreaView, View } from "react-native"
// import { useFonts as useDMFonts, DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display"
// import { useFonts as useFiraFonts, FiraSans_400Regular, FiraSans_500Medium, FiraSans_600SemiBold, FiraSans_700Bold } from "@expo-google-fonts/fira-sans"
// import SplashScreen from "../screens/SplashScreen"
// import OnboardingScreen from "../screens/OnboardingScreen"
// import SignInScreen from "../screens/SignInScreen"
// import SignUpScreen from "../screens/SignUpScreen"
// import HomeScreen from "../screens/HomeScreen"
// import MenuScreen from "../screens/MenuScreen"
// import ProductScreen from "../screens/ProductScreen"
// import CartScreen from "../screens/CartScreen"
// import CheckoutScreen from "../screens/CheckoutScreen"
// import RewardsScreen from "../screens/RewardsScreen"
// import AccountScreen from "../screens/AccountScreen"
// import BottomNavigation from "../components/BottomNavigation"
// import { products } from "../data/products"
// import { colors as C } from "../theme"
// import { s } from "../theme/screenStyles"
// import type { CartItem, Product, Screen } from "../types"

// export default function MustafaCoffeeApp() {
//  const [dm]=useDMFonts({DMSerifDisplay_400Regular}); const [fira]=useFiraFonts({FiraSans_400Regular,FiraSans_500Medium,FiraSans_600SemiBold,FiraSans_700Bold})
//  const [screen,setScreen]=useState<Screen>("splash"); const [cart,setCart]=useState<CartItem[]>([]); const [beans,setBeans]=useState(240); const [userName,setUserName]=useState("User Name"); const [selectedProduct,setSelectedProduct]=useState<Product>(products[0])
//  const add=(p:Product)=>setCart(old=>old.some(x=>x.id===p.id)?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+1}:x):[...old,{...p,quantity:1}])
//  const change=(id:string,d:number)=>setCart(old=>old.map(x=>x.id===id?{...x,quantity:x.quantity+d}:x).filter(x=>x.quantity>0))
//  const openProduct=(p:Product)=>{setSelectedProduct(p);setScreen("product")}
//  const addQuantity=(p:Product,q:number)=>{setCart(old=>old.some(x=>x.id===p.id)?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+q}:x):[...old,{...p,quantity:q}]);setScreen("cart")}
//  const count=useMemo(()=>cart.reduce((n,x)=>n+x.quantity,0),[cart])
//  if(!dm||!fira)return <View style={[s.fill,s.loading]}><ActivityIndicator color={C.gold}/></View>
//  if(screen==="splash")return <SplashScreen next={()=>setScreen("onboarding")}/>
//  if(screen==="onboarding")return <OnboardingScreen signin={()=>setScreen("signin")} signup={()=>setScreen("signup")}/>
//  if(screen==="signin")return <SignInScreen back={()=>setScreen("onboarding")} createAccount={()=>setScreen("signup")} done={()=>setScreen("home")}/>
//  if(screen==="signup")return <SignUpScreen back={()=>setScreen("onboarding")} done={name=>{if(name.trim())setUserName(name.trim());setBeans(490);setScreen("home")}}/>
//  const content=screen==="home"?<HomeScreen go={setScreen} add={add} openProduct={openProduct} beans={beans} userName={userName}/>:screen==="menu"?<MenuScreen add={add} openProduct={openProduct}/>:screen==="product"?<ProductScreen product={selectedProduct} back={()=>setScreen("menu")} add={addQuantity}/>:screen==="cart"?<CartScreen items={cart} change={change} go={setScreen} beans={beans}/>:screen==="checkout"?<CheckoutScreen items={cart} beans={beans} userName={userName} back={()=>setScreen("cart")}/>:screen==="rewards"?<RewardsScreen beans={beans}/>:<AccountScreen beans={beans} userName={userName} signout={()=>setScreen("onboarding")}/>
//  return <SafeAreaView style={s.shell}>{content}{screen!=="checkout"&&screen!=="product"&&<BottomNavigation current={screen} go={setScreen} count={count}/>}</SafeAreaView>
// }

