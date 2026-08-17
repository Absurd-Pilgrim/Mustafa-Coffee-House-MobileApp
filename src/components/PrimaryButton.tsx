import { Pressable, Text } from "react-native"
import { s } from "../theme/screenStyles"

export default function PrimaryButton({title,onPress}:{title:string;onPress:()=>void}) {
 return <Pressable onPress={onPress} style={({pressed})=>[s.button,pressed&&{transform:[{scale:.98}]}]}><Text style={s.buttonText}>{title}</Text></Pressable>
}
