import { useMemo, useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { assets as A } from "../data/assets"
import { colors as C } from "../theme"
import { ls } from "../theme/screenStyles"

const branches = [
  {name:"Hoffman Estates",address:"2350 Hassell Road, Hoffman Estates, IL 60169",distance:"0.4 mi",time:"~3 min",status:"Open",hours:"Open 24H",image:A.exterior,tags:["Open 24 Hours","Wi-Fi","Study Friendly","+4"]},
  {name:"Schaumburg",address:"1850 E Golf Rd, Schaumburg, IL 60173",distance:"3.1 mi",time:"~9 min",status:"Open",hours:null,image:A.seating,tags:["Wi-Fi","Study Friendly","Pickup","+1"]},
  {name:"Oakbrook",address:"400 Oakbrook Center, Oak Brook, IL 60523",distance:"12.4 mi",time:"~18 min",status:"Closed",hours:null,image:A.counter,tags:["Wi-Fi","Group Seating","Pickup","+1"]},
] as const

export default function LocationsScreen({back}:{back:()=>void}) {
  const [query,setQuery]=useState("")
  const visible=useMemo(()=>branches.filter(branch=>`${branch.name} ${branch.address}`.toLowerCase().includes(query.trim().toLowerCase())),[query])
  return <View style={ls.screen}>
    <View style={ls.header}>
      <Pressable onPress={back} style={ls.back}><Ionicons name="arrow-back" size={15} color={C.goldSoft}/><Text style={ls.backText}>Back</Text></Pressable>
      <Text style={ls.title}>Find a Coffee House</Text>
      <View style={ls.search}><Ionicons name="search-outline" size={19} color={C.goldSoft}/><TextInput value={query} onChangeText={setQuery} placeholder="Search by location..." placeholderTextColor="#B59B87" style={ls.searchInput}/></View>
    </View>
    <ScrollView contentContainerStyle={ls.list} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
      {visible.map(branch=><Pressable key={branch.name} style={ls.card}>
        <View><Image source={branch.image} contentFit="cover" style={ls.image}/>{branch.hours&&<Text style={ls.hours}>{branch.hours}</Text>}<View style={[ls.status,branch.status==="Closed"&&ls.closed]}><View style={ls.statusDot}/><Text style={ls.statusText}>{branch.status}</Text></View></View>
        <View style={ls.cardBody}><View style={ls.cardTop}><View style={ls.branchCopy}><Text style={ls.name}>{branch.name}</Text><Text numberOfLines={1} style={ls.address}>{branch.address}</Text></View><View><Text style={ls.distance}>{branch.distance}</Text><Text style={ls.time}>{branch.time}</Text></View></View><View style={ls.tags}>{branch.tags.map(tag=><Text key={tag} style={[ls.tag,tag.startsWith("+")&&ls.more]}>{tag}</Text>)}</View></View>
      </Pressable>)}
      {!visible.length&&<View style={ls.empty}><Ionicons name="location-outline" size={32} color={C.goldSoft}/><Text style={ls.emptyText}>No coffee houses found.</Text></View>}
    </ScrollView>
  </View>
}
