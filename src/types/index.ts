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
