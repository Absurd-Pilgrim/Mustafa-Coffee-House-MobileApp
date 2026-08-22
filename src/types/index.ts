import type { ImageSourcePropType } from "react-native"

export type Screen =
  | "splash"
  | "onboarding"
  | "signin"
  | "signup"
  | "home"
  | "locations"
  | "menu"
  | "product"
  | "cart"
  | "checkout"
  | "rewards"
  | "account"
  | AccountPage

export type AccountPage =
  | "profile-information"
  | "payment-methods"
  | "gift-cards"
  | "favorite-store"
  | "dietary-preferences"
  | "notification-settings"
  | "order-history"
  | "app-language"
  | "help-support"
  | "accessibility"
  | "privacy-policy"
  | "terms-of-service"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  beans: number
  image: ImageSourcePropType
  category: string
  badge: string
}

export type CartItem = Product & { quantity: number }

export type MenuCategory =
  | "Featured"
  | "Hot Coffee"
  | "Iced Coffee"
  | "Signature Lattes"
  | "Authentic Teas"
  | "Bakery"
  | "Desserts"
  | "Gelato"
  | "Nitro Brew"
