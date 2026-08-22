import { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Image } from "expo-image"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { colors as C } from "../theme"
import { cs } from "../theme/screenStyles"
import type { CartItem, Screen } from "../types"

export default function CartScreen({items,change,go,beans}:{items:CartItem[];change:(id:string,d:number)=>void;go:(screen:Screen)=>void;beans:number}) {
 const [tip,setTip]=useState(15); const [promo,setPromo]=useState("")
 const subtotal=items.reduce((n,x)=>n+x.price*x.quantity,0), tax=subtotal*.1, tipAmount=subtotal*tip/100, total=subtotal+tax+tipAmount, count=items.reduce((n,x)=>n+x.quantity,0)
 if(!items.length)return <View style={cs.screen}><View style={cs.emptyTop}><Text style={cs.emptyTopTitle}>Your Cart</Text></View><View style={cs.emptyBody}><MaterialCommunityIcons name="shopping-outline" size={53} color="#DFCEB3"/><Text style={cs.emptyTitle}>Your cart is empty</Text><Text style={cs.emptyDesc}>Explore the menu and begin your journey.</Text><Pressable onPress={()=>go("menu")} style={cs.explore}><Text style={cs.exploreText}>Explore the Menu</Text></Pressable></View></View>
 return <View style={cs.screen}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={cs.content}>
  <View style={cs.top}><View style={cs.titleRow}><Text style={cs.title}>Your Cart</Text><Text style={cs.itemCount}>{count} {count===1?"item":"items"}</Text></View><View style={cs.pickup}><Ionicons name="location-outline" size={14} color={C.gold}/><View style={{flex:1}}><Text style={cs.pickupTitle}>Hoffman Estates, Illinois · In-Store Pickup</Text><Text style={cs.pickupMeta}>Ready in approximately 8–12 minutes</Text></View><Text style={cs.change}>Change</Text></View></View>
  <View style={cs.body}>{items.map(x=><View key={x.id} style={cs.itemCard}><View style={cs.itemMain}><Image source={x.image} contentFit="cover" style={cs.itemImage}/><View style={{flex:1}}><Text style={cs.itemName}>{x.name}</Text><Text style={cs.customization}>Hot · Medium · Whole Milk</Text><View style={cs.quantity}><Pressable onPress={()=>change(x.id,-1)}><Text style={cs.quantityText}>−</Text></Pressable><Text style={cs.quantityText}>{x.quantity}</Text><Pressable onPress={()=>change(x.id,1)}><Text style={cs.quantityText}>+</Text></Pressable></View></View><Text style={cs.itemPrice}>{"$"+(x.price*x.quantity).toFixed(2)}</Text></View><View style={cs.itemActions}><Text style={cs.itemAction}>Edit</Text><Pressable onPress={()=>change(x.id,-x.quantity)}><Text style={cs.itemAction}>Remove</Text></Pressable></View></View>)}
  <View style={cs.beansCard}><Ionicons name="sparkles-outline" size={19} color={C.gold}/><View style={{flex:1}}><Text style={cs.beansTitle}>Apply Beans Reward</Text><Text style={cs.beansMeta}>{beans.toLocaleString()} Beans available · {"$"+(beans/200).toFixed(2)} value</Text></View><Pressable style={cs.apply}><Text style={cs.applyText}>Apply</Text></Pressable></View>
  <View style={cs.promoRow}><TextInput value={promo} onChangeText={setPromo} placeholder="Promo code" style={cs.promo}/><Pressable style={cs.promoButton}><Text style={cs.promoButtonText}>Apply</Text></Pressable></View>
  <Text style={cs.tipLabel}>TIP</Text><View style={cs.tips}>{[0,10,15,20].map(x=><Pressable key={x} onPress={()=>setTip(x)} style={[cs.tip,x===tip&&cs.tipActive]}><Text style={[cs.tipText,x===tip&&cs.tipTextActive]}>{x===0?"None":x+"%"}</Text></Pressable>)}</View>
  <View style={cs.summary}>{[["Subtotal",subtotal],["Tax (10%)",tax],["Tip ("+tip+"%)",tipAmount]].map(([label,value])=><View key={String(label)} style={cs.summaryRow}><Text style={cs.summaryText}>{label}</Text><Text style={cs.summaryText}>{"$"+Number(value).toFixed(2)}</Text></View>)}<View style={cs.summaryLine}/><View style={cs.summaryRow}><Text style={cs.totalLabel}>Total</Text><Text style={cs.totalAmount}>{"$"+total.toFixed(2)}</Text></View><Text style={cs.earn}>You’ll earn {Math.round(subtotal*10)} Beans</Text></View>
  </View></ScrollView><View style={cs.checkout}><View style={cs.checkoutTotal}><Text style={cs.checkoutLabel}>Total</Text><Text style={cs.checkoutAmount}>{"$"+total.toFixed(2)}</Text></View><Pressable onPress={()=>go("checkout")} style={cs.checkoutButton}><Text style={cs.checkoutButtonText}>Continue to Checkout</Text></Pressable></View>
 </View>
}

