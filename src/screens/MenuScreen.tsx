import { useEffect, useRef, useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { products } from "../data/products"
import { colors as C } from "../theme"
import { ms } from "../theme/screenStyles"
import type { MenuCategory, Product } from "../types"

const tabs: MenuCategory[] = [
  "Featured",
  "Hot Coffee",
  "Iced Coffee",
  "Signature Lattes",
  "Espresso",
  "Authentic Teas",
  "Bakery",
  "Desserts",
  "Refreshers",
  "Gelato",
]

const seasonalProduct =
  products.find((product) => product.id === "saffron-rose-latte") ?? products[0]

export default function MenuScreen({
  add,
  openProduct,
  initialCategory,
}: {
  add: (product: Product) => void
  openProduct: (product: Product) => void
  initialCategory: MenuCategory
}) {
  const [category, setCategory] = useState<MenuCategory>(initialCategory)
  const [query, setQuery] = useState("")
  const tabsRef = useRef<ScrollView>(null)

  useEffect(() => {
    const index = tabs.indexOf(initialCategory)
    const frame = requestAnimationFrame(() => {
      setCategory(initialCategory)
      tabsRef.current?.scrollTo({ x: Math.max(0, index * 108 - 18), animated: false })
    })
    return () => cancelAnimationFrame(frame)
  }, [initialCategory])

  const normalizedQuery = query.trim().toLowerCase()
  const visible = products.filter(
    (product) =>
      (category === "Featured" || product.category === category) &&
      (!normalizedQuery ||
        `${product.name} ${product.description}`.toLowerCase().includes(normalizedQuery)),
  )

  return (
    <View style={ms.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ms.content}
      >
        <View style={ms.top}>
          <Text style={ms.title}>Our Menu</Text>
          <View style={ms.location}>
            <Ionicons name="location-outline" size={17} color={C.gold} />
            <Text style={ms.locationText}>Hoffman Estates, Illinois</Text>
            <Text style={ms.open}>Open 24 Hours</Text>
          </View>
          <View style={ms.search}>
            <Ionicons name="search-outline" size={21} color={C.goldSoft} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search drinks, food, and more"
              placeholderTextColor="#9C8C82"
              style={ms.searchInput}
            />
          </View>
        </View>

        <ScrollView
          ref={tabsRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={ms.tabs}
          contentContainerStyle={ms.tabsContent}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setCategory(tab)}
              style={[ms.tab, category === tab && ms.tabActive]}
            >
              <Text style={[ms.tabText, category === tab && ms.tabTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={ms.body}>
          {category === "Featured" && (
            <LinearGradient colors={["#3A170C", "#241008"]} style={ms.seasonal}>
              <View style={{ flex: 1 }}>
                <Text style={ms.seasonalLabel}>SEASONAL COLLECTION</Text>
                <Text style={ms.seasonalTitle}>{seasonalProduct.name}</Text>
                <Text style={ms.seasonalDesc}>
                  Golden saffron · Delicate rose · Velvety espresso
                </Text>
              </View>
              <Image
                source={seasonalProduct.image}
                contentFit="cover"
                style={ms.seasonalImage}
              />
            </LinearGradient>
          )}

          {visible.length ? (
            <View style={ms.grid}>
              {visible.map((product) => (
                <Pressable
                  onPress={() => openProduct(product)}
                  key={product.id}
                  style={ms.card}
                >
                  <View>
                    <Image source={product.image} contentFit="cover" style={ms.image} />
                    <Text style={ms.badge}>{product.badge}</Text>
                    <View style={ms.favorite}>
                      <Ionicons name="heart-outline" size={18} color="#C5AA7F" />
                    </View>
                  </View>
                  <View style={ms.cardBody}>
                    <Text numberOfLines={2} style={ms.name}>{product.name}</Text>
                    <Text numberOfLines={2} style={ms.desc}>{product.description}</Text>
                    <View style={ms.bottom}>
                      <View style={ms.priceLine}>
                        <Text style={ms.price}>${product.price.toFixed(2)}</Text>
                        <Text style={ms.beans}> +{product.beans}B</Text>
                      </View>
                      <Pressable
                        onPress={(event) => {
                          event.stopPropagation()
                          add(product)
                        }}
                        accessibilityRole="button"
                        accessibilityLabel={`Add ${product.name} to order`}
                        style={ms.add}
                      >
                        <Text style={ms.addText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={ms.empty}>
              <Ionicons name="search-outline" size={38} color={C.latte} />
              <Text style={ms.emptyText}>No items match your search in {category}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
