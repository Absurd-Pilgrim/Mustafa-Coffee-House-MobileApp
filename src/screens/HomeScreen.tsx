import { useEffect, useRef, useState } from "react"
import { ImageBackground, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { assets as A } from "../data/assets"
import { products } from "../data/products"
import { colors as C } from "../theme"
import { hs } from "../theme/screenStyles"
import type { CartItem, MenuCategory, Product, Screen } from "../types"

const specialOffers = [
  { product: products[0], label: "TODAY ONLY", title: "Pistachio Latte Treat", detail: "A creamy house favorite, made for your special evening.", price: "$4.95" },
  { product: products[3], label: "FRESHLY BAKED", title: "Pistachio Croissant", detail: "Flaky, filled, and finished with a rich pistachio drizzle.", price: "$3.95" },
  { product: products[4], label: "CHEF'S SPECIAL", title: "Chocolate Cake Slice", detail: "Dark chocolate glaze with a velvety cocoa crumb.", price: "$6.95" },
]

export default function HomeScreen({go,openMenu,add,change,cart,openProduct,beans,userName}:{go:(x:Screen)=>void;openMenu:(category:MenuCategory)=>void;add:(p:Product)=>void;change:(id:string,d:number)=>void;cart:CartItem[];openProduct:(p:Product)=>void;beans:number;userName:string}) {

  const { width } = useWindowDimensions();
  const specialWidth = width - 44;
  const specialSlider = useRef<ScrollView>(null);
  const [specialIndex, setSpecialIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setSpecialIndex(current => {
        const next = (current + 1) % specialOffers.length;
        specialSlider.current?.scrollTo({ x: next * specialWidth, animated: true });
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [specialWidth]);

  const hour=new Date().getHours(); const greeting=hour>=6&&hour<12?'Good Morning':hour>=12&&hour<17?'Good Afternoon':hour>=17&&hour<21?'Good Evening':'Good Night';
  const quick:[string,keyof typeof Ionicons.glyphMap][]=[['Reorder','reorder-three-outline'],['Scan','qr-code-outline'],['Offers','pricetag-outline'],['Find Store','storefront-outline']];
  const cats:[string,MenuCategory,keyof typeof MaterialCommunityIcons.glyphMap][]=[['Hot Coffee','Hot Coffee','coffee-outline'],['Iced Coffee','Iced Coffee','cup-outline'],['Signature\nLattes','Signature Lattes','coffee'],['Espresso','Espresso','coffee-maker'],['Authentic\nTeas','Authentic Teas','tea-outline'],['Bakery','Bakery','circle-outline'],['Desserts','Desserts','star-outline'],['Refreshers','Refreshers','cup-water'],['Gelato','Gelato','ice-cream']];
  const offers=[['Double Beans After Midnight','Earn 2× Beans on all orders from 12–5 a.m.','Limited Hours','#432418'],['Latte & Croissant Pairing','Any signature latte with a fresh-baked croissant.','Today Only','#C1783D'],['Members-only Reserve Tasting','Exclusive single-origin pour-over experience.','Exclusive','#9D791E']];
  return <ScrollView style={hs.page} contentContainerStyle={hs.content} showsVerticalScrollIndicator={false}>
    <View style={hs.top}><View style={hs.topRow}><View><Text style={hs.greeting}>{greeting},</Text><Text style={hs.userName}>{userName}</Text></View><View style={hs.topIcons}><Ionicons name="notifications-outline" size={23} color={C.goldSoft}/><View style={hs.profileCircle}><Ionicons name="person-outline" size={21} color={C.cream}/></View></View></View><Pressable onPress={()=>go('locations')} style={hs.location}><Ionicons name="location-outline" size={18} color={C.gold}/><View style={{flex:1}}><Text style={hs.locationName}>Hoffman Estates, Illinois</Text><Text style={hs.locationMeta}>Open 24 Hours · 0.4 mi · ~3 min</Text></View><Ionicons name="chevron-forward" size={17} color={C.goldSoft}/></Pressable></View>
    <View style={hs.body}><ImageBackground source={A.seating} style={hs.hero} imageStyle={hs.rounded}><LinearGradient colors={['rgba(20,8,3,.3)','rgba(20,8,3,.8)']} style={hs.heroShade}><Text style={hs.heroLabel}>{hour<12?'MORNING':hour<17?'AFTERNOON':'EVENING'} COLLECTION</Text><Text style={hs.heroTitle}>Hospitality, Any Hour.</Text><View style={hs.heroButtons}><Pressable onPress={()=>go('menu')} style={hs.orderButton}><Text style={hs.orderButtonText}>Order Now</Text></Pressable><Pressable onPress={()=>go('menu')} style={hs.exploreButton}><Text style={hs.exploreButtonText}>Explore Menu</Text></Pressable></View></LinearGradient></ImageBackground>
    <View style={hs.specialHeader}><View><Text style={hs.specialEyebrow}>JUST FOR TODAY</Text><Text style={hs.specialHeading}>{"Today's Special Offer"}</Text></View><View style={hs.specialCount}><Text style={hs.specialCountText}>{specialIndex + 1}/{specialOffers.length}</Text></View></View>
    <ScrollView ref={specialSlider} horizontal pagingEnabled showsHorizontalScrollIndicator={false} bounces={false} style={hs.specialSlider} onMomentumScrollEnd={({nativeEvent})=>setSpecialIndex(Math.round(nativeEvent.contentOffset.x/specialWidth))}>
      {specialOffers.map(offer=><ImageBackground key={offer.product.id} source={offer.product.image} style={[hs.specialCard,{width:specialWidth}]} imageStyle={hs.specialImage}><LinearGradient colors={['rgba(30,12,5,.08)','rgba(30,12,5,.92)']} style={hs.specialShade}><View style={hs.specialBadge}><Text style={hs.specialBadgeText}>{offer.label}</Text></View><Text style={hs.specialTitle}>{offer.title}</Text><Text style={hs.specialDetail}>{offer.detail}</Text><View style={hs.specialBottom}><View><Text style={hs.specialPrice}>{offer.price}</Text><Text style={hs.specialPriceNote}>special price</Text></View><Pressable onPress={()=>openProduct({...offer.product,id:`${offer.product.id}-special`,name:offer.title,price:Number(offer.price.slice(1)),badge:offer.label})} style={hs.specialButton}><Text style={hs.specialButtonText}>Order special</Text><Ionicons name="arrow-forward" size={15} color={C.espresso}/></Pressable></View></LinearGradient></ImageBackground>)}
    </ScrollView>
    <View style={hs.specialDots}>{specialOffers.map((offer,index)=><Pressable key={offer.product.id} accessibilityRole="button" accessibilityLabel={`Show special offer ${index + 1}`} onPress={()=>{setSpecialIndex(index);specialSlider.current?.scrollTo({x:index*specialWidth,animated:true})}} style={[hs.specialDot,index===specialIndex&&hs.specialDotActive]}/>)}</View>
    <LinearGradient colors={['#4A260F','#241008']} style={hs.balance}><View style={hs.balanceTop}><Text style={hs.balanceLabel}>BEANS BALANCE</Text><Text style={hs.rewardValue}>${(beans/100).toFixed(2)} available in reward value</Text></View><View style={hs.beansLine}><Text style={hs.beans}>{beans}</Text><Text style={hs.beansWord}>Beans</Text></View><View style={hs.progressLabels}><Text style={hs.balanceHint}>{Math.max(0,500-beans)} Beans to start redeeming</Text><Text style={hs.percent}>{Math.round(beans/5)}%</Text></View><View style={hs.progress}><LinearGradient colors={[C.caramel,C.gold]} style={[hs.progressFill,{width:`${Math.min(100,beans/5)}%`}]}/></View><Pressable onPress={()=>go('rewards')} style={hs.rewardButton}><Text style={hs.rewardButtonText}>View Rewards  →</Text></Pressable></LinearGradient>
    <View style={hs.quickGrid}>{quick.map(([label,icon])=><Pressable key={label} onPress={()=>label==='Scan'?go('rewards'):label==='Reorder'?go('cart'):label==='Find Store'?go('locations'):undefined} style={hs.quickCard}><Ionicons name={icon} size={25} color={C.espresso}/><Text style={hs.quickText}>{label}</Text></Pressable>)}</View>
    <View style={hs.sectionRow}><Text style={hs.sectionTitle}>Your Favorites</Text><Pressable onPress={()=>go('menu')}><Text style={hs.seeAll}>See all</Text></Pressable></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={hs.favoriteList}>{[products[0],products[2],products[3]].map(p=>{const quantity=cart.find(item=>item.id===p.id)?.quantity??0;return <Pressable onPress={()=>openProduct(p)} key={p.id} style={hs.favoriteCard}><View><Image source={p.image} contentFit="cover" style={hs.favoriteImage}/><View style={hs.heart}><Ionicons name="heart" size={15} color={C.caramel}/></View></View><Text numberOfLines={2} style={hs.favoriteName}>{p.name}</Text><View style={hs.favoriteBottom}><Text style={hs.favoritePrice}>${p.price.toFixed(2)}</Text>{quantity===0?<Pressable onPress={event=>{event.stopPropagation();add(p)}} style={hs.favoriteAdd}><Text style={hs.favoriteAddText}>+</Text></Pressable>:<View style={hs.favoriteStepper}><Pressable hitSlop={8} onPress={event=>{event.stopPropagation();change(p.id,-1)}} style={hs.favoriteStepButton}><Text style={hs.favoriteStepText}>−</Text></Pressable><Text style={hs.favoriteQuantity}>{quantity}</Text><Pressable hitSlop={8} onPress={event=>{event.stopPropagation();change(p.id,1)}} style={hs.favoriteStepButton}><Text style={hs.favoriteStepText}>+</Text></Pressable></View>}</View></Pressable>})}</ScrollView>
    <Text style={hs.sectionTitle}>Recent Order</Text><View style={hs.recent}><View style={hs.recentTop}><Text style={hs.recentMeta}>Hoffman Estates · Jul 24</Text><Text style={hs.recentPrice}>$9.50</Text></View><Text style={hs.recentItems}>Heritage Pistachio Latte, Butter Croissant</Text><Pressable onPress={()=>{add(products[0]);add(products[3])}} style={hs.orderAgain}><Text style={hs.orderAgainText}>Order Again</Text></Pressable></View>
    <Text style={hs.sectionTitle}>Browse the Menu</Text><View style={hs.categoryGrid}>{cats.map(([label,category,icon])=><Pressable key={category} onPress={()=>openMenu(category)} style={hs.categoryCard}><MaterialCommunityIcons name={icon} size={27} color={C.espresso}/><Text style={hs.categoryText}>{label}</Text></Pressable>)}</View>
    <View style={hs.sectionRow}><Text style={hs.sectionTitle}>Current Offers</Text><Text style={hs.seeAll}>See all</Text></View>{offers.map(([title,desc,badge,color])=><View key={title} style={hs.offerCard}><View style={[hs.offerIcon,{backgroundColor:color}]}><Ionicons name="sparkles" size={22} color="white"/></View><View style={{flex:1}}><View style={hs.offerTitleRow}><Text style={hs.offerTitle}>{title}</Text><Text style={hs.offerBadge}>{badge}</Text></View><Text style={hs.offerDesc}>{desc}</Text></View></View>)}
    <ImageBackground source={A.seating} style={hs.quoteCard} imageStyle={hs.rounded}><LinearGradient colors={['rgba(30,12,5,.62)','rgba(30,12,5,.78)']} style={hs.imageShade}><View style={hs.quoteRow}><View style={hs.quoteLine}/><Text style={hs.quote}>“Coffee, conversation, study, and warm hospitality whenever you need it.”</Text></View></LinearGradient></ImageBackground>
    <ImageBackground source={A.exterior} style={hs.locationImage} imageStyle={hs.rounded}><LinearGradient colors={['transparent','rgba(30,12,5,.8)']} style={[hs.imageShade,{justifyContent:'flex-end'}]}><Text style={hs.locationEyebrow}>OUR LOCATION</Text><Text style={hs.locationTitle}>Hoffman Estates, Illinois</Text><Text style={hs.locationAddress}>2350 Hassell Road · Open 24 Hours</Text></LinearGradient></ImageBackground></View>
  </ScrollView>
}

