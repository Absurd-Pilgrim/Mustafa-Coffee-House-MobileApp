import { Pressable, ScrollView, Text, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { colors as C } from "../theme"
import { as } from "../theme/screenStyles"
import type { AccountPage } from "../types"

type AccountRow = [
  AccountPage,
  string,
  string,
  keyof typeof Ionicons.glyphMap,
]

export default function AccountScreen({
  beans,
  userName,
  signout,
  open,
}: {
  beans: number
  userName: string
  signout: () => void
  open: (page: AccountPage) => void
}) {
  const sections: { title: string; rows: AccountRow[] }[] = [
    {
      title: "ACCOUNT",
      rows: [
        ["profile-information", "Profile Information", "Name, email, phone", "person-outline"],
        ["payment-methods", "Payment Methods", "Cards, Apple Pay, gift cards", "card-outline"],
        ["gift-cards", "Gift Cards", "View balance and send gifts", "gift-outline"],
        ["favorite-store", "Favorite Store", "Hoffman Estates, IL", "storefront-outline"],
      ],
    },
    {
      title: "PREFERENCES",
      rows: [
        ["dietary-preferences", "Dietary Preferences", "Allergies and dietary needs", "leaf-outline"],
        ["notification-settings", "Notification Settings", "Orders, rewards, offers", "notifications-outline"],
        ["order-history", "Order History", "12 past orders", "receipt-outline"],
        ["app-language", "App Language", "English", "globe-outline"],
      ],
    },
    {
      title: "SUPPORT",
      rows: [
        ["help-support", "Help & Support", "Contact, FAQ, order issues", "chatbox-outline"],
        ["accessibility", "Accessibility", "Display and interaction settings", "accessibility-outline"],
        ["privacy-policy", "Privacy Policy", "", "lock-closed-outline"],
        ["terms-of-service", "Terms of Service", "", "document-text-outline"],
      ],
    },
  ]

  return (
    <ScrollView
      style={as.page}
      contentContainerStyle={as.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={as.top}>
        <View style={as.identity}>
          <View style={as.avatar}>
            <Ionicons name="person-outline" size={22} color={C.warm} />
          </View>
          <View>
            <Text style={as.name}>{userName}</Text>
            <Text style={as.email}>user@example.com</Text>
          </View>
        </View>
        <View style={as.beansCard}>
          <View>
            <Text style={as.beansLabel}>Beans Balance</Text>
            <View style={as.beansLine}>
              <Text style={as.beans}>{beans}</Text>
              <Text style={as.beansWord}> Beans</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={as.beansLabel}>Reward value</Text>
            <Text style={as.rewardValue}>${(beans / 100).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={as.body}>
        {sections.map((section) => (
          <View key={section.title} style={as.section}>
            <Text style={as.sectionTitle}>{section.title}</Text>
            <View style={as.group}>
              {section.rows.map(([page, title, subtitle, icon], index) => (
                <Pressable
                  key={page}
                  onPress={() => open(page)}
                  accessibilityRole="button"
                  style={({ pressed }) => [
                    as.row,
                    index < section.rows.length - 1 && as.rowBorder,
                    pressed && { opacity: 0.6 },
                  ]}
                >
                  <Ionicons name={icon} size={18} color={C.espresso} />
                  <View style={{ flex: 1 }}>
                    <Text style={as.rowTitle}>{title}</Text>
                    {subtitle ? <Text style={as.rowSubtitle}>{subtitle}</Text> : null}
                  </View>
                  <Ionicons name="chevron-forward" size={15} color="#D6AD7B" />
                </Pressable>
              ))}
            </View>
          </View>
        ))}
        <Pressable onPress={signout} style={as.signout}>
          <Text style={as.signoutText}>Sign Out</Text>
        </Pressable>
        <Pressable style={as.delete}>
          <Text style={as.deleteText}>Delete Account</Text>
        </Pressable>
        <View style={as.footer}>
          <Text style={as.footerText}>Mustafa Coffee House App v1.0</Text>
          <Text style={as.footerText}>“Every Guest. Every Visit. Every Time.”</Text>
        </View>
      </View>
    </ScrollView>
  )
}
