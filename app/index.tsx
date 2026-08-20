// import MustafaCoffeeApp from "@/src/application/MustafaCoffeeApp"

// export default MustafaCoffeeApp


import { useMemo, useState } from "react"
import { ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useFonts as useDMFonts, DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display"
import { useFonts as useFiraFonts, FiraSans_400Regular, FiraSans_500Medium, FiraSans_600SemiBold, FiraSans_700Bold } from "@expo-google-fonts/fira-sans"
import SplashScreen from "../src/screens/SplashScreen"
import OnboardingScreen from "../src/screens/OnboardingScreen"
import SignInScreen from "../src/screens/SignInScreen"
import SignUpScreen from "../src/screens/SignUpScreen"
import HomeScreen from "../src/screens/HomeScreen"
import LocationsScreen from "../src/screens/LocationsScreen"
import MenuScreen from "../src/screens/MenuScreen"
import ProductScreen from "../src/screens/ProductScreen"
import CartScreen from "../src/screens/CartScreen"
import CheckoutScreen from "../src/screens/CheckoutScreen"
import RewardsScreen from "../src/screens/RewardsScreen"
import AccountScreen from "../src/screens/AccountScreen"
import BottomNavigation from "../src/components/BottomNavigation"
import { products } from "../src/data/products"
import { colors as C } from "../src/theme"
import { s } from "../src/theme/screenStyles"
import type { CartItem, MenuCategory, Product, Screen } from "../src/types"

export default function MustafaCoffeeApp() {
 const [dm]=useDMFonts({DMSerifDisplay_400Regular}); const [fira]=useFiraFonts({FiraSans_400Regular,FiraSans_500Medium,FiraSans_600SemiBold,FiraSans_700Bold})
 const [screen,setScreen]=useState<Screen>("splash"); const [menuCategory,setMenuCategory]=useState<MenuCategory>("Featured"); const [cart,setCart]=useState<CartItem[]>([]); const [beans,setBeans]=useState(240); const [userName,setUserName]=useState("User Name"); const [selectedProduct,setSelectedProduct]=useState<Product>(products[0])
 const go=(next:Screen)=>{if(next==="menu")setMenuCategory("Featured");setScreen(next)}
 const openMenu=(category:MenuCategory)=>{setMenuCategory(category);setScreen("menu")}
 const add=(p:Product)=>setCart(old=>old.some(x=>x.id===p.id)?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+1}:x):[...old,{...p,quantity:1}])
 const change=(id:string,d:number)=>setCart(old=>old.map(x=>x.id===id?{...x,quantity:x.quantity+d}:x).filter(x=>x.quantity>0))
 const openProduct=(p:Product)=>{setSelectedProduct(p);setScreen("product")}
 const addQuantity=(p:Product,q:number)=>{setCart(old=>old.some(x=>x.id===p.id)?old.map(x=>x.id===p.id?{...x,quantity:x.quantity+q}:x):[...old,{...p,quantity:q}]);setScreen("cart")}
 const count=useMemo(()=>cart.reduce((n,x)=>n+x.quantity,0),[cart])
 if(!dm||!fira)return <SafeAreaView edges={["bottom"]} style={[s.fill,s.loading]}><ActivityIndicator color={C.gold}/></SafeAreaView>
 const content=screen==="splash"?<SplashScreen next={()=>setScreen("onboarding")}/>:screen==="onboarding"?<OnboardingScreen signin={()=>setScreen("signin")} signup={()=>setScreen("signup")}/>:screen==="signin"?<SignInScreen back={()=>setScreen("onboarding")} createAccount={()=>setScreen("signup")} done={()=>setScreen("home")}/>:screen==="signup"?<SignUpScreen back={()=>setScreen("onboarding")} done={name=>{if(name.trim())setUserName(name.trim());setBeans(490);setScreen("home")}}/>:screen==="home"?<HomeScreen go={go} openMenu={openMenu} add={add} change={change} cart={cart} openProduct={openProduct} beans={beans} userName={userName}/>:screen==="locations"?<LocationsScreen back={()=>setScreen("home")}/>:screen==="menu"?<MenuScreen initialCategory={menuCategory} add={add} openProduct={openProduct}/>:screen==="product"?<ProductScreen product={selectedProduct} back={()=>setScreen("menu")} add={addQuantity}/>:screen==="cart"?<CartScreen items={cart} change={change} go={go} beans={beans}/>:screen==="checkout"?<CheckoutScreen items={cart} beans={beans} userName={userName} back={()=>setScreen("cart")}/>:screen==="rewards"?<RewardsScreen beans={beans}/>:<AccountScreen beans={beans} userName={userName} signout={()=>setScreen("onboarding")}/>
 const showBottomNavigation=!(["splash","onboarding","signin","signup","locations","checkout","product"] as Screen[]).includes(screen)
 return <SafeAreaView edges={showBottomNavigation?[]:["bottom"]} style={s.shell}>{content}{showBottomNavigation&&<BottomNavigation current={screen} go={go} count={count}/>}</SafeAreaView>
}



