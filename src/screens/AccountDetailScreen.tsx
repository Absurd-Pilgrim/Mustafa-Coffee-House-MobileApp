import { useMemo, useState, type ReactNode } from "react"
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native"
import { Image } from "expo-image"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { assets } from "../data/assets"
import { colors as C } from "../theme"
import type { AccountPage, Screen } from "../types"
import { ads } from "./accountDetailStyles"

type DetailProps = {
  back: () => void
  go: (screen: Screen) => void
  userName: string
}

function DetailPage({
  title,
  back,
  children,
  footer,
  contentStyle,
}: {
  title: string
  back: () => void
  children: ReactNode
  footer?: ReactNode
  contentStyle?: StyleProp<ViewStyle>
}) {
  return (
    <View style={ads.page}>
      <SafeAreaView edges={["top"]} style={ads.headerSafe}>
        <View style={ads.header}>
          <Pressable
            onPress={back}
            accessibilityRole="button"
            accessibilityLabel="Back to Account"
            hitSlop={12}
            style={ads.back}
          >
            <Ionicons name="arrow-back" size={17} color={C.goldSoft} />
          </Pressable>
          <Text style={ads.headerTitle}>{title}</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={ads.page}
        contentContainerStyle={[
          ads.scrollContent,
          footer ? ads.roomyContent : null,
          contentStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer ? <View style={ads.footer}>{footer}</View> : null}
    </View>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={ads.section}>
      <Text style={ads.sectionLabel}>{title}</Text>
      {children}
    </View>
  )
}

function PrimaryButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string
  onPress: () => void
  disabled?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        ads.primaryButton,
        disabled && ads.primaryDisabled,
        pressed && { opacity: 0.75 },
      ]}
    >
      <Text style={ads.primaryText}>{label}</Text>
    </Pressable>
  )
}

function ActionRow({
  title,
  subtitle,
  onPress,
  last = false,
}: {
  title: string
  subtitle?: string
  onPress?: () => void
  last?: boolean
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        ads.row,
        ads.tallRow,
        !last && ads.rowBorder,
        pressed && { opacity: 0.6 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={ads.rowTitle}>{title}</Text>
        {subtitle ? <Text style={ads.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={14} color="#D6AD7B" />
    </Pressable>
  )
}

function Toggle({ value, onPress }: { value: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      style={[ads.switchTrack, value && ads.switchOn]}
    >
      <View style={[ads.switchKnob, value && ads.switchKnobOn]} />
    </Pressable>
  )
}

function ToggleGroup({
  title,
  labels,
  values,
  toggle,
}: {
  title: string
  labels: string[]
  values: Record<string, boolean>
  toggle: (label: string) => void
}) {
  return (
    <Section title={title}>
      <View style={ads.card}>
        {labels.map((label, index) => (
          <View
            key={label}
            style={[ads.row, index < labels.length - 1 && ads.rowBorder]}
          >
            <Text style={ads.rowText}>{label}</Text>
            <Toggle value={values[label]} onPress={() => toggle(label)} />
          </View>
        ))}
      </View>
    </Section>
  )
}

function ProfileInformation({ back, userName }: DetailProps) {
  const nameParts = userName.trim().split(/\s+/)
  const [firstName, setFirstName] = useState(nameParts[0] || "User")
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") || "Name")
  const [email, setEmail] = useState("user@example.com")
  const [phone, setPhone] = useState("+1 (312) 555-0100")
  const [birthday, setBirthday] = useState("")
  const [preferredName, setPreferredName] = useState("")
  const changed =
    firstName !== (nameParts[0] || "User") ||
    lastName !== (nameParts.slice(1).join(" ") || "Name") ||
    email !== "user@example.com" ||
    phone !== "+1 (312) 555-0100" ||
    birthday.length > 0 ||
    preferredName.length > 0

  const save = () => Alert.alert("Profile updated", "Your changes have been saved.")

  return (
    <DetailPage
      title="Profile Information"
      back={back}
      footer={<PrimaryButton label="Save Changes" onPress={save} disabled={!changed} />}
    >
      <View style={ads.avatarWrap}>
        <Pressable
          onPress={() => Alert.alert("Change photo", "Choose a new profile photo from your device.")}
          accessibilityRole="button"
        >
          <View style={ads.avatar}>
            <Ionicons name="person-outline" size={29} color={C.warm} />
          </View>
          <Text style={ads.photoText}>Change Photo</Text>
        </Pressable>
      </View>
      <Text style={ads.fieldLabel}>FIRST NAME</Text>
      <TextInput style={ads.field} value={firstName} onChangeText={setFirstName} />
      <Text style={ads.fieldLabel}>LAST NAME</Text>
      <TextInput style={ads.field} value={lastName} onChangeText={setLastName} />
      <View>
        <Text style={ads.fieldLabel}>EMAIL</Text>
        <TextInput
          style={[ads.field, ads.fieldWithStatus]}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View style={ads.verified}>
          <Ionicons name="checkmark-circle" size={14} color="#18B95A" />
          <Text style={ads.verifiedText}>Verified</Text>
        </View>
      </View>
      <Text style={ads.fieldLabel}>PHONE</Text>
      <TextInput style={ads.field} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Text style={ads.fieldLabel}>BIRTHDAY (OPTIONAL)</Text>
      <TextInput
        style={ads.field}
        value={birthday}
        onChangeText={setBirthday}
        placeholder="MM/DD"
        placeholderTextColor="#B9A79B"
        keyboardType="numbers-and-punctuation"
      />
      <Text style={ads.fieldLabel}>PREFERRED NAME (OPTIONAL)</Text>
      <TextInput
        style={ads.field}
        value={preferredName}
        onChangeText={setPreferredName}
        placeholder="What should we call you?"
        placeholderTextColor="#B9A79B"
      />
      <Section title="ACCOUNT SECURITY">
        <View style={ads.card}>
          <ActionRow title="Change Password" onPress={() => Alert.alert("Change Password", "A secure reset link will be sent to your email.")} />
          <ActionRow title="Connected Accounts" last onPress={() => Alert.alert("Connected Accounts", "No external accounts are connected.")} />
        </View>
      </Section>
    </DetailPage>
  )
}

function PaymentMethods({ back }: DetailProps) {
  const [cards, setCards] = useState(["4242", "1881"])
  return (
    <DetailPage title="Payment Methods" back={back}>
      <Section title="SAVED CARDS">
        <View style={ads.card}>
          {cards.map((card, index) => (
            <View key={card} style={[ads.row, ads.tallRow, index < cards.length - 1 && ads.rowBorder]}>
              <View style={[ads.cardBrand, { backgroundColor: index ? "#E71935" : "#263A96" }]}>
                <Text style={ads.cardBrandText}>{index ? "MC" : "Visa"}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={ads.rowTitle}>•••• {card}</Text>
                  {index === 0 ? <View style={ads.badge}><Text style={ads.badgeText}>Default</Text></View> : null}
                </View>
                <Text style={ads.rowSubtitle}>Exp {index ? "03/26" : "09/27"}</Text>
              </View>
              <Pressable onPress={() => Alert.alert("Edit card", `Update the card ending in ${card}.`)} style={ads.smallIconButton}>
                <Ionicons name="create-outline" size={15} color={C.espresso} />
              </Pressable>
              <Pressable onPress={() => setCards((current) => current.filter((item) => item !== card))} style={ads.smallIconButton}>
                <Ionicons name="close" size={16} color="#A84F42" />
              </Pressable>
            </View>
          ))}
          {cards.length === 0 ? <View style={ads.row}><Text style={ads.muted}>No saved cards</Text></View> : null}
        </View>
      </Section>
      <Section title="DIGITAL WALLETS">
        <View style={ads.card}>
          {['Apple Pay', 'Google Pay'].map((wallet, index) => (
            <View key={wallet} style={[ads.row, index === 0 && ads.rowBorder]}>
              <Text style={ads.rowText}>{wallet}</Text>
              <Text style={ads.available}>Available</Text>
            </View>
          ))}
        </View>
      </Section>
      <Pressable onPress={() => Alert.alert("Add Payment Method", "Secure payment setup is ready to begin.")} style={ads.outlineButton}>
        <Text style={ads.outlineText}>+ Add Payment Method</Text>
      </Pressable>
    </DetailPage>
  )
}

function GiftCards({ back }: DetailProps) {
  const actions = [
    ["Add Existing Gift Card", "Enter a card number and PIN"],
    ["Buy a Gift Card", "Purchase a digital gift card"],
    ["Send a Gift Card", "Gift someone a Mustafa experience"],
    ["Reload Gift Card", "Add funds to an existing card"],
  ]
  return (
    <DetailPage title="Gift Cards" back={back}>
      <View style={ads.giftBalance}>
        <Text style={ads.giftLabel}>GIFT CARD BALANCE</Text>
        <Text style={ads.giftAmount}>$25.00</Text>
        <Text style={ads.giftNote}>Combined across 1 saved card</Text>
      </View>
      <Section title="SAVED GIFT CARDS">
        <View style={ads.card}>
          <View style={[ads.row, ads.tallRow]}>
            <View style={{ flex: 1 }}>
              <Text style={ads.rowTitle}>MCH •••• 7891</Text>
              <Text style={ads.rowSubtitle}>Mustafa Coffee House</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ fontFamily: "DMSerifDisplay_400Regular", fontSize: 18, color: C.gold }}>$25.00</Text>
              <Text style={ads.rowSubtitle}>Balance</Text>
            </View>
          </View>
        </View>
      </Section>
      <Section title="ACTIONS">
        <View style={ads.card}>
          {actions.map(([title, subtitle], index) => (
            <ActionRow
              key={title}
              title={title}
              subtitle={subtitle}
              last={index === actions.length - 1}
              onPress={() => Alert.alert(title, subtitle)}
            />
          ))}
        </View>
      </Section>
    </DetailPage>
  )
}

function FavoriteStore({ back, go }: DetailProps) {
  const features = ["Wi-Fi", "Study Friendly", "Group Seating", "Accessible", "Parking", "Pickup", "Open 24 Hours"]
  return (
    <DetailPage title="Favorite Store" back={back} contentStyle={{ padding: 0 }}>
      <Image source={assets.exterior} style={ads.storeImage} contentFit="cover" />
      <View style={ads.storeBody}>
        <Text style={ads.storeName}>Mustafa Coffee House</Text>
        <Text style={ads.storeAddress}>2350 Hassell Road, Hoffman Estates, IL</Text>
        <View style={ads.storeMeta}>
          <Text style={ads.openText}>● Open 24 Hours</Text>
          <Text style={ads.muted}>0.4 mi</Text>
          <Text style={ads.muted}>+1 (847) 555-0182</Text>
        </View>
        <View style={ads.chips}>
          {features.map((feature) => <View key={feature} style={ads.chip}><Text style={ads.chipText}>{feature}</Text></View>)}
        </View>
        <Pressable onPress={() => Alert.alert("Store Details", "Hoffman Estates is open 24 hours for dine-in and pickup.")} style={[ads.primaryButton, { marginBottom: 9 }]}>
          <View style={{ width: "100%", paddingHorizontal: 13, flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={ads.primaryText}>View Store Details</Text>
            <Ionicons name="chevron-forward" size={14} color={C.warm} />
          </View>
        </Pressable>
        <Pressable onPress={() => Alert.alert("Get Directions", "Opening directions to Mustafa Coffee House.")} style={[ads.outlineButton, { borderColor: "#D7CCC0", marginBottom: 9 }]}>
          <Text style={[ads.outlineText, { color: C.espresso }]}>Get Directions</Text>
        </Pressable>
        <Pressable onPress={() => go("menu")} style={[ads.primaryButton, { backgroundColor: "#C37940", marginBottom: 9 }]}>
          <Text style={ads.primaryText}>Start an Order</Text>
        </Pressable>
        <Pressable onPress={back} style={[ads.outlineButton, { borderColor: "#D7CCC0" }]}>
          <Text style={[ads.outlineText, { color: C.espresso }]}>Change Favorite Store</Text>
        </Pressable>
      </View>
    </DetailPage>
  )
}

function DietaryPreferences({ back }: DetailProps) {
  const preferences = ["Vegetarian", "Vegan", "Dairy-Free", "Gluten-Conscious", "Caffeine-Free", "Lower Sugar"]
  const allergens = ["Milk", "Eggs", "Peanuts", "Tree Nuts", "Wheat", "Soy", "Sesame"]
  const [selected, setSelected] = useState<string[]>([])
  const [notes, setNotes] = useState("")
  const toggle = (item: string) => setSelected((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])
  return (
    <DetailPage title="Dietary Preferences" back={back} footer={<PrimaryButton label="Save Preferences" onPress={() => Alert.alert("Preferences saved")} />}>
      <Text style={ads.intro}>Personalize menu recommendations and make dietary information easier to find.</Text>
      <Section title="DIETARY PREFERENCES">
        <View style={ads.chips}>
          {preferences.map((item) => <Pressable key={item} onPress={() => toggle(item)} style={[ads.chip, selected.includes(item) && ads.chipActive]}><Text style={[ads.chipText, selected.includes(item) && ads.chipTextActive]}>{item}</Text></Pressable>)}
        </View>
      </Section>
      <Section title="ALLERGENS">
        <View style={ads.card}>
          {allergens.map((item, index) => <Pressable key={item} onPress={() => toggle(item)} style={[ads.row, index < allergens.length - 1 && ads.rowBorder]}><View style={[ads.checkbox, selected.includes(item) && ads.checkboxActive]}>{selected.includes(item) ? <Ionicons name="checkmark" size={12} color={C.espresso} /> : null}</View><Text style={ads.rowText}>{item}</Text></Pressable>)}
        </View>
      </Section>
      <Text style={ads.fieldLabel}>ADDITIONAL NOTES</Text>
      <TextInput style={[ads.field, ads.textArea]} value={notes} onChangeText={setNotes} placeholder="Any additional dietary notes..." placeholderTextColor="#B9A79B" multiline />
      <View style={ads.notice}><Text style={ads.noticeText}>Menu filters are provided for convenience. Products may be prepared in shared areas. Please confirm allergen information with our team before ordering.</Text></View>
      <Pressable onPress={() => { setSelected([]); setNotes("") }} style={{ alignItems: "center", padding: 14 }}><Text style={ads.outlineText}>Reset Preferences</Text></Pressable>
    </DetailPage>
  )
}

function NotificationSettings({ back }: DetailProps) {
  const groups = [
    ["ORDER NOTIFICATIONS", ["Order Received", "Preparing Order", "Order Ready", "Pickup Reminder", "Order Issue"]],
    ["REWARDS", ["Beans Earned", "Reward Available", "Beans Activity", "Beans Expiration"]],
    ["OFFERS & MENU", ["Special Offers", "Bonus Beans Promotions", "New Menu Items", "Seasonal Products", "Store Announcements"]],
  ] as const
  const allLabels = groups.flatMap(([, labels]) => [...labels])
  const [values, setValues] = useState<Record<string, boolean>>(() => Object.fromEntries(allLabels.map((label) => [label, true])))
  const toggle = (label: string) => setValues((current) => ({ ...current, [label]: !current[label] }))
  return (
    <DetailPage title="Notification Settings" back={back} footer={<PrimaryButton label="Save Notification Settings" onPress={() => Alert.alert("Notification settings saved")} />}>
      {groups.map(([title, labels]) => <ToggleGroup key={title} title={title} labels={[...labels]} values={values} toggle={toggle} />)}
    </DetailPage>
  )
}

const orderData = [
  { id: 1, name: "Heritage Pistachio Latte + Pistachio Croissant", date: "Jul 24, 2026", price: "$11.50", beans: "+116 Beans", image: assets.latte, status: "Completed" },
  { id: 2, name: "Strawberry Milkshake", date: "Jul 20, 2026", price: "$5.95", beans: "+60 Beans", image: assets.frappe, status: "Completed" },
  { id: 3, name: "Signature Chocolate Cake", date: "Jul 15, 2026", price: "$8.95", beans: "+90 Beans", image: assets.cake, status: "Completed" },
  { id: 4, name: "Date Cream Frappe", date: "Jul 10, 2026", price: "$5.75", beans: "+58 Beans", image: assets.cup, status: "Completed" },
]

function OrderHistory({ back, go }: DetailProps) {
  const [filter, setFilter] = useState("All Orders")
  const filters = ["All Orders", "Completed", "Canceled"]
  const visible = filter === "Canceled" ? [] : orderData
  return (
    <DetailPage title="Order History" back={back}>
      <View style={ads.filterRow}>
        {filters.map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[ads.chip, filter === item && ads.chipActive]}><Text style={[ads.chipText, filter === item && ads.chipTextActive]}>{item}</Text></Pressable>)}
      </View>
      {visible.map((order) => <View key={order.id} style={[ads.card, { marginBottom: 12 }]}><View style={{ flexDirection: "row", paddingHorizontal: 10 }}><Image source={order.image} style={ads.orderImage} contentFit="cover" /><View style={ads.orderInfo}><Text style={ads.orderName}>{order.name}</Text><Text style={ads.orderMeta}>{order.date} · Hoffman Estates</Text><View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}><Text style={ads.orderPrice}>{order.price}</Text><View style={ads.badge}><Text style={ads.badgeText}>{order.beans}</Text></View><Text style={ads.orderStatus}>{order.status}</Text></View></View></View><View style={ads.orderActions}><Pressable onPress={() => go("menu")} style={[ads.orderAction, ads.orderActionBorder]}><Text style={ads.orderActionText}>Reorder</Text></Pressable><Pressable onPress={() => Alert.alert("Receipt", `Receipt for ${order.name}`)} style={ads.orderAction}><Text style={[ads.orderActionText, { color: C.caramel }]}>View Receipt</Text></Pressable></View></View>)}
      {visible.length === 0 ? <View style={[ads.card, { padding: 25, alignItems: "center" }]}><Text style={ads.muted}>No canceled orders</Text></View> : null}
    </DetailPage>
  )
}

function AppLanguage({ back }: DetailProps) {
  const languages = [["English", "", "English"], ["العربية", "Arabic", "Arabic"], ["Español", "Spanish", "Spanish"], ["اردو", "Urdu", "Urdu"]]
  const [selected, setSelected] = useState("English")
  return (
    <DetailPage title="App Language" back={back} footer={<PrimaryButton label="Apply Language" onPress={() => Alert.alert("Language applied", selected)} />}>
      <View style={ads.card}>
        {languages.map(([label, subtitle, value], index) => <Pressable key={value} onPress={() => setSelected(value)} style={[ads.row, ads.tallRow, index < languages.length - 1 && ads.rowBorder]}><View style={[ads.radio, selected === value && ads.radioActive]}>{selected === value ? <View style={ads.radioDot} /> : null}</View><View style={{ flex: 1 }}><Text style={ads.rowTitle}>{label}</Text>{subtitle ? <Text style={ads.rowSubtitle}>{subtitle}</Text> : null}</View>{selected === value ? <Text style={ads.rowSubtitle}>Current</Text> : null}</Pressable>)}
      </View>
    </DetailPage>
  )
}

const helpTopics = ["Order Issue", "Missing Item", "Incorrect Item", "Payment Issue", "Beans and Rewards", "Gift Card Issue", "Store Feedback", "Account and Sign-In", "General Question"]
const faqs = [
  ["How do I earn Beans?", "Earn Beans automatically with every eligible purchase made through your account."],
  ["When can I start redeeming Beans?", "You can redeem Beans once your balance reaches the minimum shown on the Rewards page."],
  ["How do I change my pickup store?", "Open Favorite Store from Account, then choose Change Favorite Store."],
  ["Can I edit an order after placing it?", "Contact the store as soon as possible. Changes depend on preparation status."],
  ["How do I add a gift card?", "Open Gift Cards and choose Add Existing Gift Card."],
  ["How do I reset my password?", "Open Profile Information, choose Change Password, and follow the secure reset steps."],
  ["Where can I find allergen information?", "Use Dietary Preferences for filtering and confirm details with the store before ordering."],
]

function HelpSupport({ back }: DetailProps) {
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)
  const matches = (text: string) => text.toLowerCase().includes(query.trim().toLowerCase())
  const visibleTopics = helpTopics.filter(matches)
  const visibleFaqs = faqs.filter(([question, answer]) => matches(`${question} ${answer}`))
  return (
    <DetailPage title="Help & Support" back={back}>
      <View style={ads.search}><Ionicons name="search-outline" size={15} color="#D1B086" /><TextInput value={query} onChangeText={setQuery} style={ads.searchInput} placeholder="Search help topics..." placeholderTextColor="#B9A79B" /></View>
      <Section title="GET IN TOUCH"><View style={ads.card}><ActionRow title="Chat with Support" subtitle="Usually responds in minutes" onPress={() => Alert.alert("Support chat", "A support specialist will join shortly.")} /><ActionRow title="Call the Store" subtitle="+1 847 555-0182" onPress={() => Alert.alert("Call the Store", "+1 847 555-0182")} /><ActionRow title="Email Support" subtitle="support@mustafacoffeehouse.com" last onPress={() => Alert.alert("Email Support", "support@mustafacoffeehouse.com")} /></View></Section>
      {visibleTopics.length ? <Section title="COMMON TOPICS"><View style={ads.card}>{visibleTopics.map((topic, index) => <ActionRow key={topic} title={topic} last={index === visibleTopics.length - 1} onPress={() => setQuery(topic)} />)}</View></Section> : null}
      {visibleFaqs.length ? <Section title="FREQUENTLY ASKED QUESTIONS"><View style={ads.card}>{visibleFaqs.map(([question, answer], index) => <View key={question} style={index < visibleFaqs.length - 1 ? ads.rowBorder : undefined}><Pressable onPress={() => setExpanded(expanded === question ? null : question)} style={ads.row}><Text style={ads.rowText}>{question}</Text><Ionicons name={expanded === question ? "chevron-up" : "chevron-forward"} size={14} color="#D6AD7B" /></Pressable>{expanded === question ? <Text style={ads.faqAnswer}>{answer}</Text> : null}</View>)}</View></Section> : null}
      {!visibleTopics.length && !visibleFaqs.length ? <View style={[ads.card, { padding: 25, alignItems: "center" }]}><Text style={ads.muted}>No help topics match “{query}”</Text></View> : null}
    </DetailPage>
  )
}

function AccessibilitySettings({ back }: DetailProps) {
  const groups = [
    ["DISPLAY", ["Larger Text", "Increased Contrast", "Reduce Transparency", "Bold Text"]],
    ["INTERACTION", ["Reduce Motion", "Larger Touch Targets", "Confirm Before Removing Items", "Haptic Feedback"]],
    ["NAVIGATION", ["Screen Reader Optimization", "Simplified Navigation Labels", "Keep Action Buttons Visible"]],
    ["MEDIA", ["Image Descriptions", "Reduce Decorative Animation"]],
  ] as const
  const [values, setValues] = useState<Record<string, boolean>>(() => Object.fromEntries(groups.flatMap(([, labels]) => labels.map((label) => [label, false]))))
  const toggle = (label: string) => setValues((current) => ({ ...current, [label]: !current[label] }))
  return <DetailPage title="Accessibility" back={back} footer={<PrimaryButton label="Save Accessibility Settings" onPress={() => Alert.alert("Accessibility settings saved")} />}>{groups.map(([title, labels]) => <ToggleGroup key={title} title={title} labels={[...labels]} values={values} toggle={toggle} />)}</DetailPage>
}

const privacySections = [
  ["Information We Collect", "We collect account details you provide, order and payment records, rewards activity, favorite-store selections, dietary preferences, and device information needed to operate and secure the app."],
  ["How We Use Information", "We use information to fulfill orders, maintain your account, calculate rewards, personalize menu recommendations, deliver requested notifications, prevent fraud, and improve the Mustafa Coffee House experience."],
  ["Sharing and Service Providers", "We share only what is necessary with payment processors, ordering and delivery partners, analytics providers, and support vendors. We do not sell personal information."],
  ["Data Retention and Security", "Information is retained only as long as needed for the purposes described here and applicable legal obligations. We use reasonable administrative, technical, and physical safeguards."],
  ["Your Choices", "You may update profile information, notification preferences, dietary settings, and accessibility options in the app. You may also request access, correction, or deletion of your account data."],
  ["Children’s Privacy", "The app is not directed to children under 13, and we do not knowingly collect personal information from children under 13."],
  ["Contact Us", "Questions or privacy requests may be sent to privacy@mustafacoffeehouse.com."],
]

const termsSections = [
  ["Using the App", "By creating an account or using the app, you agree to these Terms. You must provide accurate information, protect your sign-in credentials, and use the service only for lawful purposes."],
  ["Orders and Payments", "Prices, availability, preparation times, and store hours may change. An order is accepted when confirmed by the selected store. Taxes, fees, discounts, and refunds are shown during checkout and handled under the applicable store policy."],
  ["Rewards and Offers", "Beans, rewards, promotional offers, and eligibility rules may have separate conditions and expiration dates. They have no cash value unless required by law and may not be transferred except through an authorized feature."],
  ["Gift Cards", "Gift cards are subject to the balance, redemption, and replacement terms shown when purchased or added. Treat card numbers and PINs like cash."],
  ["Acceptable Use", "You may not interfere with the app, access another person’s account, submit fraudulent orders, reverse engineer protected services, or use app content without permission."],
  ["Intellectual Property", "Mustafa Coffee House names, logos, photographs, menu content, and app materials are owned by Mustafa Coffee House or its licensors and are protected by applicable laws."],
  ["Service Availability", "The app is provided on an as-available basis. We may update, suspend, or discontinue features, and we do not guarantee uninterrupted access."],
  ["Changes and Contact", "We may update these Terms and will post the revised date here. Questions may be sent to support@mustafacoffeehouse.com."],
]

function LegalPage({ title, sections, back }: { title: string; sections: string[][]; back: () => void }) {
  return (
    <DetailPage title={title} back={back}>
      <Text style={ads.legalUpdated}>Last updated: August 22, 2026</Text>
      <Text style={ads.intro}>This {title.toLowerCase()} explains the terms that apply when you use the Mustafa Coffee House mobile app and related services.</Text>
      {sections.map(([heading, body]) => <View key={heading}><Text style={ads.legalTitle}>{heading}</Text><Text style={ads.legalBody}>{body}</Text></View>)}
    </DetailPage>
  )
}

export default function AccountDetailScreen({
  page,
  back,
  go,
  userName,
}: {
  page: AccountPage
  back: () => void
  go: (screen: Screen) => void
  userName: string
}) {
  const props = useMemo(() => ({ back, go, userName }), [back, go, userName])
  switch (page) {
    case "profile-information": return <ProfileInformation {...props} />
    case "payment-methods": return <PaymentMethods {...props} />
    case "gift-cards": return <GiftCards {...props} />
    case "favorite-store": return <FavoriteStore {...props} />
    case "dietary-preferences": return <DietaryPreferences {...props} />
    case "notification-settings": return <NotificationSettings {...props} />
    case "order-history": return <OrderHistory {...props} />
    case "app-language": return <AppLanguage {...props} />
    case "help-support": return <HelpSupport {...props} />
    case "accessibility": return <AccessibilitySettings {...props} />
    case "privacy-policy": return <LegalPage title="Privacy Policy" sections={privacySections} back={back} />
    case "terms-of-service": return <LegalPage title="Terms of Service" sections={termsSections} back={back} />
  }
}
