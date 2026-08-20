import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { assets as A } from "../data/assets"
import { products } from "../data/products"
import { colors as C } from "../theme"
import { ms } from "../theme/screenStyles"
import type { MenuCategory, Product } from "../types"

const tabs:MenuCategory[]=['Featured','Hot Coffee','Iced Coffee','Signature Lattes','Authentic Teas','Bakery','Desserts','Gelato','Nitro Brew']

export default function MenuScreen({add,openProduct,initialCategory}:{add:(p:Product)=>void;openProduct:(p:Product)=>void;initialCategory:MenuCategory}) {
  const [category,setCategory]=useState<MenuCategory>(initialCategory)
  const [query,setQuery]=useState('')
  const tabsRef=useRef<ScrollView>(null)
  useEffect(()=>{
    setCategory(initialCategory)
    const index=tabs.indexOf(initialCategory)
    requestAnimationFrame(()=>tabsRef.current?.scrollTo({x:Math.max(0,index*108-18),animated:false}))
  },[initialCategory])
  const saffron:Product={id:'saffron',name:'Saffron Rose Latte',description:'Golden saffron and delicate rose water meet velvety espresso.',price:6.75,beans:68,image:A.latte,category:'Signature Lattes',badge:'Seasonal'}
  const all=[products[0],saffron,products[1],products[2],products[3],products[4]]
  const visible=all.filter(p=>(category==='Featured'||p.category===category)&&(!query.trim()||`${p.name} ${p.description}`.toLowerCase().includes(query.trim().toLowerCase())))
  return <View style={ms.screen}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={ms.content}>
    <View style={ms.top}><Text style={ms.title}>Our Menu</Text><View style={ms.location}><Ionicons name="location-outline" size={17} color={C.gold}/><Text style={ms.locationText}>Hoffman Estates, Illinois</Text><Text style={ms.open}>Open 24 Hours</Text></View><View style={ms.search}><Ionicons name="search-outline" size={21} color={C.goldSoft}/><TextInput value={query} onChangeText={setQuery} placeholder="Search drinks, food, and more" placeholderTextColor="#9C8C82" style={ms.searchInput}/></View></View>
    <ScrollView ref={tabsRef} horizontal showsHorizontalScrollIndicator={false} style={ms.tabs} contentContainerStyle={ms.tabsContent}>{tabs.map(tab=><Pressable key={tab} onPress={()=>setCategory(tab)} style={[ms.tab,category===tab&&ms.tabActive]}><Text style={[ms.tabText,category===tab&&ms.tabTextActive]}>{tab}</Text></Pressable>)}</ScrollView>
    <View style={ms.body}>{category==='Featured'&&<LinearGradient colors={['#3A170C','#241008']} style={ms.seasonal}><View style={{flex:1}}><Text style={ms.seasonalLabel}>SEASONAL COLLECTION</Text><Text style={ms.seasonalTitle}>Saffron Rose Latte</Text><Text style={ms.seasonalDesc}>Golden saffron · Delicate rose · Velvety espresso</Text></View><Image source={A.latte} contentFit="cover" style={ms.seasonalImage}/></LinearGradient>}
    {visible.length?<View style={ms.grid}>{visible.map(p=><Pressable onPress={()=>openProduct(p)} key={p.id} style={ms.card}><View><Image source={p.image} contentFit="cover" style={ms.image}/><Text style={ms.badge}>{p.badge}</Text><View style={ms.favorite}><Ionicons name="heart-outline" size={18} color="#C5AA7F"/></View></View><View style={ms.cardBody}><Text numberOfLines={2} style={ms.name}>{p.name}</Text><Text numberOfLines={2} style={ms.desc}>{p.description}</Text><View style={ms.bottom}><View style={ms.priceLine}><Text style={ms.price}>${p.price.toFixed(2)}</Text><Text style={ms.beans}> +{p.beans}B</Text></View><Pressable onPress={()=>add(p)} style={ms.add}><Text style={ms.addText}>+</Text></Pressable></View></View></Pressable>)}</View>:<View style={ms.empty}><Ionicons name="search-outline" size={38} color={C.latte}/><Text style={ms.emptyText}>No items available in {category}</Text></View>}
    </View></ScrollView></View>
}
